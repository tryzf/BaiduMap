##BaiduMap.js 
>是用百度地图API简单封装的一个简单快速创建百度地图的jquery小插件。
>在相应的地图列表上，写入详情地址和对于城市，点击即可生成地图。

```
    <div id="map"></div>    //放地图的div
    <ul id="map_list">        //地图列表
      <li data-address="杭州市西湖区西溪创业园" data-addr= "杭州市">杭州市西湖区西溪创业园</li>
      <li data-address="浙江经济职业技术学院" data-addr= "杭州市">浙江经济职业技术学院</li>
      <li data-address="温州火车南站" data-addr= "温州市">温州时代广场</li>
    </ul>
    
    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=D1c84e7ced620bb2e3651144955ccce3"></script>
    <script src="QMap.js"></script>
    <script>
      var ops = { obj: "#map_list li" }
      var QMap = new QMap(ops);
    </script>
```

>点击就可生产当前点击的地址地图。
