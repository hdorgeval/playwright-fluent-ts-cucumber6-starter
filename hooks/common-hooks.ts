import { reportFailedRequests, reportPageErrors, reportRecordedRequests } from '../stories';
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
  this.p = new PlaywrightFluent()
    .withBrowser('chromium')
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
Before({ tags: '@headfull or @live or @debug' }, async function () {
  // eslint-disable-next-line no-console
  console.log('headfull mode');
  cast(this.p).withOptions({ headless: false });
});

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
    cast(this.p).close();
  }
});

After(async function () {
  await cast(this.p).runStory(reportPageErrors, this);
  await cast(this.p).runStory(reportFailedRequests, this);
  await cast(this.p).runStory(reportRecordedRequests, this);
});

AfterAll(async function () {
  // eslint-disable-next-line no-console
  console.log('After All');
});
