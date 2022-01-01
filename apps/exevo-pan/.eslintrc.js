import config from 'config/eslint-react.json'

module.exports = {
  ...config,
  parserOptions: {
    ...config.parserOptions,
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
