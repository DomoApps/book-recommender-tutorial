import TestEnvironment from '@jest/environment-jsdom-abstract';

export default class JSDOMEnv extends TestEnvironment {
  constructor(config, context) {
    super(config, context, import('jsdom'));
  }
}
