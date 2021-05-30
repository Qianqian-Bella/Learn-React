import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//ReactDOM.render 功能就是把组件渲染并且构造 DOM 树，然后插入到页面上某个特定的元素上（在这里是 id 为 root 的 div 元素）。
ReactDOM.render( 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

