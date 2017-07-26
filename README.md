# HTML5-reader
HTML5-reader

参考 https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5

## HTML5 Reader 使用到的技术

## 使用base64格式图片制作Icon

  url(data:image/png;base64,{img_data})
  
  提前把数据放到css里面，利于页面加载，减少请求。

  但是不像维护一般图片那么容易。

## 使用CSS3制作Icon

  体积更小，但不容易维护，存在兼容问题。

  用在WebAPP 不太需要考虑兼容性问题。

  常用属性：boeder-radius box-shadow transform

  常用在规则图形上 适合简单图形。

## HTML5-API
  
  DOM节点操作 QuerySelector 

  跨越通信 postMessage

  performance 性能测试 

  localStorage sessionStorage 

  ``` JavaScript
  localStorage.setItem('a','1');   
  localStorage.getItem('a');
  ```

## HTML5-ajax跨域 

  ``` JavaScript
  header('Access-Control-Allow-Origin:www.baidu.com,www.qq.com');
  ```

## HTML5+contentediton

  属性值设为ture 可编辑区域

## viewport

  统一交互

  ```
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  ```

## HTML5触屏事件
  
  touchstart touchmove  

  1. start move end 

  2. start click move end

  body.addEventListener('touchstart',function(){console(1)},false)

## 移动端性能陷阱

  1. 减少页面repaint reflow

  2. 尽量缓存所有可以缓存的数据

      HTML5 前存取
      * Cache-Control max-age

      * ETag md5标识
  
      * 用HTTP协议 Response-Header做缓存

      HTML5

      localStorage sessionStorage indexDB(存储更大数据，可以做索引)
  
   3. 使用CSS3 transform 代替dom 操作
    
      不要给非static定位元素增加css动画

      适当使用硬件加速 使用手机GPU渲染

      canvas、transform:tanslate3d(0,0,0)可以使用硬件加速

    

