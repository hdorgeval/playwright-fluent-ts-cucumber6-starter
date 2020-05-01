// import { expect } from 'chai';
import { Before, Given } from 'cucumber';
import { cast } from 'playwright-fluent';

Given('I navigate to {string}', async function (url: string) {
  await cast(this.p).navigateTo(url);
});

/**
 * Before each scenario hook
 */
Before({ tags: '@foo' }, async function () {
  this.foo = true;
});
