var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: "./index.js",
   output:{
       path: path.resolve(__dirname, 'dist'),
       filename: 'build.js'
   },
   resolve: {
    extensions: ['.ts', '.js']
  },
   module:{
       rules:[  
           {
               test: /\.ts$/, 
               use: [
                {
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                  } ,
               ]
            }, 
            {
              test: /\.html$/,
              loader: 'html-loader'
            },
            {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'file-loader?name=assets/[name].[hash].[ext]'
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1, minimize: true } }
            ]
          },
       ]
   },
   plugins: [
    new webpack.ContextReplacementPlugin(
        path.resolve(__dirname, 'src'),
      {}
    ),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false
      }
    })
  ]
}