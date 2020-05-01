import { StoryWithProps, Request, stringifyRequest } from 'playwright-fluent';
import { World } from 'cucumber';

const urlsToBeIgnored: string[] = ['/fonts/', '/foobar/'];

function shouldKeepFailedRequest(failedRequest: Request): boolean {
  const url = failedRequest && failedRequest.url();
  const mustBeIgnored = urlsToBeIgnored.some((urlToBeIgnored) => url.includes(urlToBeIgnored));
  return !mustBeIgnored;
}

export const reportFailedRequests: StoryWithProps<World> = async (p, world) => {
  const failedRequests = p.getFailedRequests();
  const fileteredRequests = failedRequests.filter(shouldKeepFailedRequest);

  if (fileteredRequests.length === 0) {
    return;
  }

  for (let index = 0; index < fileteredRequests.length; index++) {
    const failedRequest = fileteredRequests[index];
    const stringifiedRequest = await stringifyRequest(failedRequest);
    world.attach(stringifiedRequest, 'application/json');
  }

  throw new Error(`There are ${fileteredRequests.length} failed request(s)`);
};
