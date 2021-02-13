# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [4.4.0] - 2021-02-13

### Added

- be able to set the browser from the CLI
  - to run the tests with `webkit` : `npm run test-webkit`
  - to run the tests with `firefox` : `npm run test-firefox`
  - to run the tests with `chrome` : `npm run test-chrome`

## [4.3.0] - 2021-01-22

### Added

- npm scripts `npm run cucumber-check` and `npm run steps-usage`

### Changed

- update dependencies

## [4.2.0] - 2020-12-05

### Changed

- update dependencies

## [4.1.0] - 2020-07-25

### Fixed

- fix missing await preventing tests to properly finish
- ignore @live and @debug tags when executing tests in CI

### Changed

- update all dependencies

## [4.0.0] - 2020-06-01

### Changed

- update all dependencies

### Breaking Change

- `chai` has been replace by `jest/expect`
  - to use the `expect` statement :
  ```js
  import expect from 'expect';
  ...
  expect(true).toBe(true);
  ```


## [3.4.0] - 2020-05-17

### Changed

- update all dependencies

## [3.3.0] - 2020-04-30

### Changed

- update all dependencies

## [3.2.0] - 2019-11-29

### Changed

- add script to automatically generate the steps code

## [3.1.1] - 2019-11-29

### Changed

- make test script works on Windows
- make debug works on Windows

## [3.1.0] - 2019-11-24

### Changed

- Update all dependencies
- Remove vulnerable dependencies

## [3.0.0] - 2019-11-09

### Changed

- Replace tslint by eslint
- Update all dependencies
- Remove vulnerable dependencies
- Update documentation
- Use custom World Object

## [2.0.0] - 2019-03-28

### Changed

- Update all dependencies
- Remove vulnerable dependencies
- Update documentation
