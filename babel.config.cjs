module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  overrides: [
    {
      test: /\.jsx?$/,
      presets: ['@babel/preset-react'],
    },
  ],
  plugins: ["babel-plugin-transform-import-meta"]
};
