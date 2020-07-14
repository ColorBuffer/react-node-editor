module.exports = {
  presets: [
      ['@babel/env', { loose: true }],
      ['@babel/preset-react'],
  ],
  plugins: [
      ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/proposal-class-properties', { loose: true }],
    'annotate-pure-calls',
  ],
};
