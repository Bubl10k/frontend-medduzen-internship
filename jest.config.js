export default {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(some-esm-lib)/)'],
  testEnvironment: 'jsdom',
};
