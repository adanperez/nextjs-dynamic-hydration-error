// export { register } from '@web/next-instrumentation';

async function register() {
  /**
   * Turn on JSON formatted logging for production environments only.
   * This will make local development logs easier to read.
   */
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // @ts-expect-error -- There are no types for next-logger.
    // See: https://github.com/sainsburys-tech/next-logger
    // eslint-disable-next-line import/dynamic-import-chunkname -- This is loaded server side.
    await import('next-logger');
  }
}

export { register };
