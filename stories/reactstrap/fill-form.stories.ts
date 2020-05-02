import { StoryWithProps } from 'playwright-fluent';
// prettier-ignore

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

export interface InputTextInFieldProps {
  fieldLabel: string;
  text: string;
}
export const inputTextInField: StoryWithProps<InputTextInFieldProps> = async (p, props) => {
  // prettier-ignore
  const formContainer = p
    .selector('div.docs-example')
    .nth(1)
    .find('form');

  const fieldLabel = formContainer.find('label').withText(props.fieldLabel);

  // prettier-ignore
  await p
    .click(fieldLabel)
    .typeText(props.text);
};
