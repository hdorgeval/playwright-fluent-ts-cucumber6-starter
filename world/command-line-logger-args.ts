import minimist, { ParsedArgs } from 'minimist';
const args: ParsedArgs = minimist(process.argv.slice(2));

export type LogLevel = 'verbose' | 'warn' | 'error' | 'silent';
export const defaultLogLevel: LogLevel = 'error';

// get the command-line option --logLevel
export const cliLogLevel: LogLevel = args.logLevel;

export const currentLogLevel: LogLevel = cliLogLevel || defaultLogLevel;
