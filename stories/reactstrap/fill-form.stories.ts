import { StoryWithProps } from 'playwright-fluent';

export const openPage: StoryWithProps<string> = async (p, pageName) => {
  // prettier-ignore
  const button = p
    .selector('div.container')
    .find('a')
    .withText(pageName)
    .nth(-1);

  await p.click(button);
};

export const openComponent: StoryWithProps<string> = async (p, componentName) => {
  // prettier-ignore
  const formComponent = p
    .selector('div.docs-sidebar')
    .find('li')
    .withText(componentName);

  await p.click(formComponent);
};
