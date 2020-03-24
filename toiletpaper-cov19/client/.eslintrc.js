module.exports = {
  extends: ['airbnb'],
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '#static': './static',
          '#blocks': './src/blocks',
          '#components': './src/components',
          '#containers': './src/containers',
          '#config': './src/config',
          '#state': './src/state',
          '#styles': './src/styles',
          '#utils': './src/utils'
        },
        extensions: ['.js']
      }
    }
  },
  env: {
    browser: true
  }
};