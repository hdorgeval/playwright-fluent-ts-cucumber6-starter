import { StoryWithProps } from 'playwright-fluent';
import { World } from 'cucumber';

export const reportBrowserInfo: StoryWithProps<World> = async (p, world) => {
  const browser = p.currentBrowser();
  const browserVersion = browser?.version();

  if (browserVersion) {
    await world.attach(`Browser version: ${browserVersion}`);
  }
};
