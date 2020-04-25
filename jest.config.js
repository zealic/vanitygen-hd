module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: {
        // ts-jest[config] (WARN) message TS151001: If you have issues related to imports,
        // you should consider setting `esModuleInterop` to `true` in your TypeScript configuration file (usually `tsconfig.json`)
        ignoreCodes: [151001]
      }
    }
  }
};
