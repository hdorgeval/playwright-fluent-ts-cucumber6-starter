import {
  reportBrowserInfo,
  reportFailedRequests,
  reportPageErrors,
  reportRecordedRequests,
} from '../stories';
import { CustomWorld } from '../world';
import {
  Before,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
  After,
  HookScenarioResult,
  Status,
} from 'cucumber';
import { PlaywrightFluent, cast } from 'playwright-fluent';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const isCI = require('is-ci');

setDefaultTimeout(120000);

/**
 * Before All hook
 */
BeforeAll(async function () {
  // eslint-disable-next-line no-console
  console.log('Before All');
  // eslint-disable-next-line no-console
  isCI ? console.log('running in CI ...') : console.log('running on local machine ...');
});

/**
 * Before each scenario hook
 */
Before(async function () {
  const browser = (this as CustomWorld).cliArgs.browser || 'chromium';

  // eslint-disable-next-line no-console
  console.log(`Will run with browser ${browser}`);
  this.attach(`Selected Browser: ${browser}`);

  this.p = new PlaywrightFluent()
    .withBrowser(browser)
    .recordPageErrors()
    .recordFailedRequests()
    .withCursor()
    .withOptions({ headless: true });
});

/**
 * Before each scenario hook
 */
Before({ tags: '@recordRequests' }, async function () {
  cast(this.p).recordRequestsTo('/');
});

/**
 * Before each scenario hook
 */
Before({ tags: '@ignore' }, async function () {
  return 'skipped';
});

/**
 * Before each scenario hook
 */
Before({ tags: '@debug' }, async function () {
  this.debug = true;
});

/**
 * Before each scenario hook
 */
Before({ tags: '@live' }, async function () {
  this.live = true;
});

/**
 * Before each scenario hook
 */
Before({ tags: '@headfull' }, async function () {
  // eslint-disable-next-line no-console
  console.log('running in headfull mode');
  cast(this.p).withOptions({ headless: false });
});

/**
 * Before each scenario hook
 */
Before({ tags: '@live or @debug' }, async function () {
  if (isCI) {
    // eslint-disable-next-line no-console
    console.log('tags @live and @debug are ignored on CI');
    return;
  }

  // eslint-disable-next-line no-console
  console.log('running in headfull mode when @live or @debug is set on the Scenario');
  cast(this.p).withOptions({ headless: false });
});

/**
 * After each scenario hook
 * Will be executed last => After methods execute in reverse order
 */
After(async function (testCase: HookScenarioResult) {
  if (testCase.result.status === Status.FAILED && this.p) {
    const screenshot: string = await cast(this.p).takeFullPageScreenshotAsBase64();
    this.attach(screenshot, 'image/png');
  }

  if (this.p && isCI) {
    await cast(this.p).close();
    return;
  }

  if (this.live) {
    // do not close the browser
    return;
  }

  if (this.p) {
    await cast(this.p).close();
  }
});

/**
 * After each scenario hook
 */
After(async function () {
  await cast(this.p).runStory(reportBrowserInfo, this);
});

/**
 * After each scenario hook
 */
After(async function () {
  await cast(this.p).runStory(reportRecordedRequests, this);
});

/**
 * After each scenario hook
 * Will be executed first => After methods execute in reverse order
 */
After(async function () {
  await cast(this.p).runStory(reportPageErrors, this);
  await cast(this.p).runStory(reportFailedRequests, this);
});

AfterAll(async function () {
  // eslint-disable-next-line no-console
  console.log('After All');
});
