import { World } from 'cucumber';
import { StoryWithProps } from 'playwright-fluent';

function shouldKeepError(pageError: Error): boolean {
  if (pageError && pageError.message && pageError.message.includes('foobar')) {
    return false;
  }

  if (pageError && pageError.message && pageError.message.includes('carbon.js')) {
    return false;
  }

  return true;
}

export const reportPageErrors: StoryWithProps<World> = async (p, world) => {
  const pageErrors = p.getPageErrors();
  const filteredErrors = pageErrors.filter(shouldKeepError);

  if (filteredErrors.length === 0) {
    return;
  }

  await world.attach(`${filteredErrors.length} Page Errors`);
  filteredErrors.forEach((pageError) => {
    const error = `
      ${pageError.name ? pageError.name : ''}
      ${pageError.message ? pageError.message : ''}
      ${pageError.stack ? pageError.stack : ''}
      --------------------------------------------------
    `;
    world.attach(error);
  });

  throw new Error(`There are ${filteredErrors.length} errors(s) in the page`);
};
