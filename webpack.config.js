var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var entries = getEntry('page/**/*.js', [__dirname+'/layout/layout']);
var config = {
  entry: entries,
  output: {
    'path':path.join(__dirname,'public'),
    'publicPath':'/',
    'filename':'script/[name].js'
  },
  module: {
    loaders: [
     {test: /\.less$/, loader: ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader!less-loader'})},
     {test: /\.ejs$/, loader: 'html-loader'}
    ]
  },
  plugins: [
    new ExtractTextPlugin("style/[name].css"),
    new webpack.ProvidePlugin({ //加载jq
      $: 'jquery',
    })
  ]
}

var htmlfile = glob.sync('page/**/*.ejs'),conf={};
htmlfile.forEach(function(item,index,arr){
  var extname = path.extname(item);
  var basename = path.basename(item,extname);
  var conf = {
    filename:'../views/'+item.replace(/^page\//,''),
    template:'./'+item,
    chunks:[basename]
  }
  config.plugins.push(new HtmlWebpackPlugin(conf))
})


module.exports = config;

function getEntry(globPath,common){
  var files = glob.sync(globPath),entries={};
  files.forEach(function(item,index,arr){
    var extname = path.extname(item);
    var basename = path.basename(item,extname);
    common.push('./'+item);
    entries[basename] = common;
  })
  return entries;
}
