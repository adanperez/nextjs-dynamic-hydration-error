// const { logger } = require('@web/next-instrumentation/next-logger.config');

// module.exports = {
//   logger,
// };

'use strict';

var pino = require('pino');
// var config = require('@web/logger/config');

// 'use strict';

const METHODS = new Map([
  [10, 'trace'],
  [20, 'debug'],
  [30, 'info'],
  [40, 'warn'],
  [50, 'error'],
  [60, 'fatal'],
]);
/**
 * Format an Error instance into ECS-compatible fields on the `ecs` object.
 * https://www.elastic.co/guide/en/ecs/current/ecs-error.html
 * Return true iff the given `err` was an Error object that could be processed.
 */
function formatError(ecsFields, err) {
  if (!(err instanceof Error)) {
    ecsFields.err = err;
    return false;
  }
  ecsFields.error = {
    type:
      Object.prototype.toString.call(err.constructor) === '[object Function]'
        ? err.constructor.name
        : err.name,
    message: err.message,
    stack_trace: err.stack,
  };
  return true;
}
function addStaticEcsBindings(obj) {
  obj['ecs.version'] = '8.10.0';
}
/**
 * Create options for `pino(...)` that configure it for ecs-logging output.
 */
function tcsFormat({ convertErr = true } = {}) {
  let wasBindingsCalled = false;
  const ecsPinoOptions = {
    messageKey: 'message',
    timestamp: () => `,"@timestamp":"${new Date().toISOString()}"`,
    formatters: {
      level(label, _number) {
        return { 'log.level': label };
      },
      bindings(bindings) {
        const {
          /**
           * `pid` and `hostname` are default bindings, unless overwritten by
           * a `base: {...}` passed to logger creation.
           */
          pid,
          hostname,
          name, // name is defined if `log = pino({name: 'my name', ...})`
          ...ecsBindings
        } = bindings;
        if (pid !== undefined) {
          // https://www.elastic.co/guide/en/ecs/current/ecs-process.html#field-process-pid
          ecsBindings['process.pid'] = pid;
        }
        if (hostname !== undefined) {
          // https://www.elastic.co/guide/en/ecs/current/ecs-host.html#field-host-hostname
          ecsBindings['host.hostname'] = hostname;
        }
        if (name !== undefined) {
          // https://www.elastic.co/guide/en/ecs/current/ecs-log.html#field-log-logger
          ecsBindings['log.logger'] = name;
        }
        /**
         * With `pino({base: null, ...})` the `formatters.bindings` is *not*
         * called. In this case we need to make sure to add our static bindings
         * in `log()` below.
         */
        wasBindingsCalled = true;
        addStaticEcsBindings(ecsBindings);
        return ecsBindings;
      },
      log(obj) {
        const { req, res, err, ...ecsObj } = obj;
        if (!wasBindingsCalled) {
          addStaticEcsBindings(ecsObj);
        }
        // https://www.elastic.co/guide/en/ecs/current/ecs-http.html
        if (err !== undefined) {
          if (convertErr) {
            formatError(ecsObj, err);
          } else {
            ecsObj.err = err;
          }
        }
        return ecsObj;
      },
    },
  };
  return ecsPinoOptions;
}
function determineLogLevel() {
  if (
    process.env.LOG_LEVEL &&
    ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'].includes(
      process.env.LOG_LEVEL,
    )
  )
    return process.env.LOG_LEVEL;
  if (typeof window !== 'undefined' || process.env.NODE_ENV === 'development')
    return 'debug';
  return 'info';
}
function getConsoleDecorators(level) {
  const method = METHODS.get(level) ?? 'info';
  if (['error', 'fatal'].includes(method))
    return {
      background: '#FF0000',
      color: '#fff',
      method: 'error',
    };
  if (method === 'warn')
    return {
      background: '#FFC300',
      color: '#000',
      method: 'warn',
    };
  return {
    background: '#fff',
    color: '#000',
    method,
  };
}
const browserConfig =
  typeof window === 'undefined'
    ? {}
    : {
        browser: {
          asObject: true,
          write: ({ build, environment, level, msg, time, ...rest }) => {
            const { method, background, color } = getConsoleDecorators(level);
            const message =
              rest?.length === 0 ? msg : { ...rest, ...(msg ? { msg } : null) };
            // @ts-expect-error -- console is allowed for the browser
            console[
              ['info', 'error', 'warn'].includes(method) ? 'info' : method
            ](
              `%c${method}`,
              `background-color: ${background}; color: ${color}; padding: 2px 4px; border-radius: 4px;`,
              message,
            );
          },
        },
      };
const pinoFormatConfig = (() => {
  switch (process.env.NODE_ENV) {
    case 'production': {
      return tcsFormat({
        convertErr: true,
      });
    }
    case 'development': {
      return {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      };
    }
    default: {
      return {};
    }
  }
})();
const config = {
  ...browserConfig,
  ...pinoFormatConfig,
  level: determineLogLevel(),
};

exports.config = config;
const logger = (defaultConfig) =>
  pino({
    ...defaultConfig,
    ...config.config,
  });
exports.logger = logger;

// const logger = (defaultConfig) =>
//   pino({
//     ...defaultConfig,
//     messageKey: 'message',
//     mixin: () => ({ name: 'custom-pino-instance' }),
//   });

// module.exports = {
//   logger,
// };
