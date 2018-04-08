module.exports = {
  test    : /\.(png|gif|jpg|svg)$/i,
  
  use     : [{
    loader: 'file-loader',
    options: {
      outputPath: 'assets',
    },
  }],
};
