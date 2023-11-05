/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';
import { loadEnvConfig } from '@next/env';
import ResizeObserver from 'resize-observer-polyfill';

import { server } from '@src/mocks/server';

import * as process from 'process';
// Establish API mocking before all tests.

/*----------- jest 실행 후 설정 --------------*/
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

global.ResizeObserver = ResizeObserver;

export default async () => {
  const env = process.cwd();
  loadEnvConfig(env);
};
/*-------------------------------------------*/
