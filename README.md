# virtual-keyboard


https://rydvone.github.io/virtual-keyboard-js/


 https://delirious-krill-a7b.notion.site/gh-pages-69cd9bf411a34a59bd9757bdec12a929
Работа с webpack

 npm i webpack webpack-cli -D --save-dev
 Создать файл webpack.config.js со следующей конфигурацией:  
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  watch: true,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
  ],
  devServer: {
      port: 8000,
      historyApiFallback: true,
      hot: true,
  },
};
 ```
 
 npm i css-loader -D   
 npm i html-webpack-plugin -D
 
 npm i webpack-dev-server  и его настройки
 ``` module.exports = {
    //...
    devServer: {
        port: 8000,
        historyApiFallback: true,
        hot: true,
    },
};
```

При сборке для продакшна, мы хотим все оптимизировать, насколько это возможно. В случае с режимом разработки верно обратное.
Для переключения между режимами необходимо создать два скрипта в package.json.  
Добавить в package.json файле скрипт запуска проекта: `"start": "webpack-dev-server --mode development"`, и скрипт для сборки билда: `"build": "webpack --mode production"`
```"scripts": {
  "build": "NODE_ENV='production' webpack", // для Windows, то команда будет такой: "SET NODE_ENV='production' && webpack"
  "start": "webpack-dev-server"
}
```    
Теперь в настроках вебпака мы можем менять значение mode в зависимости от process.env.NODE_ENV.
`...  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'}`  
Для сборки готового бандла для нашего приложения мы просто запускаем npm run build в терминале. В директории dist создаются файлы index.html и index_bunlde.js.
