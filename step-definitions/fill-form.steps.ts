// import { expect } from 'chai';
import {
  openPage,
  openComponent,
  inputTextInField,
  selectOptionsInField,
  selectRadioButtonOption,
} from '../stories';
import { Before, Given } from 'cucumber';
import { cast } from 'playwright-fluent';

Given('I navigate to {string}', async function (url: string) {
  await cast(this.p).navigateTo(url);
});

Given('I open the {string} page', async function (page: string) {
  await cast(this.p).runStory(openPage, page);
});

Given('I select the {string} component', async function (component: string) {
  await cast(this.p).runStory(openComponent, component);
});

Given('I input {string} in field {string}', async function (text: string, fieldLabel: string) {
  await cast(this.p).runStory(inputTextInField, { fieldLabel, text });
});

Given('I select {string} in field {string}', async function (options: string, fieldLabel: string) {
  await cast(this.p).runStory(selectOptionsInField, { fieldLabel, options });
});

Given('I select radio button {string}', async function (optionText: string) {
  await cast(this.p).runStory(selectRadioButtonOption, optionText);
});

/**
 * Before each scenario hook
 */
Before({ tags: '@foo' }, async function () {
  this.foo = true;
});
