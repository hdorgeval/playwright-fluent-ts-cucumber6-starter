import { currentLogLevel, LogLevel } from './command-line-logger-args';
import minimist, { ParsedArgs } from 'minimist';
import { BrowserName } from 'playwright-fluent';
const args: ParsedArgs = minimist(process.argv.slice(2));

export const cliArgs = {
  ...args,
  logLevel: currentLogLevel,
  rawCommandLine: process.argv.join(' '),
} as CliArgs;

export interface CliArgs extends ParsedArgs {
  browser?: BrowserName;
  logLevel: LogLevel;
  rawCommandLine: string;
}
