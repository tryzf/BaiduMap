;(function($){
   var QMap = function(ops){
      var self = this;
      self.address = ops.address || ops.default_address;   //默认详细地址地址
      self.addr = ops.addr || ops.default_city;        //默认市
      self.company_name = ops.company_name || ops.default_company_name; //默认单位
      self.point = null;                  //定义一个经纬度返回对象
      self.default_lng = ops.default_lng;       //默认经度
      self.default_lat = ops.default_lat;       //默认纬度
      self.map_box = ops.map_box;             //默认容器id
      this.bodyNode = $(document.body);
      
      self.getAdressId();      //  页面加载第一次的默认地图
      this.bodyNode.delegate(ops.obj,'click', function(e){          //点击事件：获取当前位置进行创建新地图
            e.stopPropagation();                                   //阻止事件冒泡
             var $this    = $(this),
                  address  = $this.attr('data-address'),
                  addr     = $this.attr('data-addr');
                  company_name = $this.text();
              self.address = address;
              self.addr = addr;
              self.company_name = company_name;
              self.getAdressId();
      });   
   };
   QMap.prototype = {
        getAdressId:function(){            //获取经纬度
            // 创建地址解析器实例
            var self = this;
            var myGeo = new BMap.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(this.address, function(point){
              if (point) {
                  self.point = point;
                  self.creatNewMap(self.point);
              }else{
                  self.point = null;
              }
            }, self.addr);
        },
        creatNewMap: function(result ,address ,title){           //创建新的地图
          var self = this;
              self.lng = result && result.lng || self.lng;     //设置默认经度
              self.lat = result && result.lat || self.lat;     //设置默认纬度
            var map;
            this.initMap();
        },
        initMap: function(){
            this.createMap();//创建地图
            this.setMapEvent();//设置地图事件
            this.addMapControl();//向地图添加控件
            this.addMapOverlay();//向地图添加覆盖物
        },
        createMap: function(){
            var self = this;
            map = new BMap.Map(self.map_box);
            map.centerAndZoom(new BMap.Point(self.lng,self.lat),19);
        },
        setMapEvent: function(){
            map.enableScrollWheelZoom();
            map.enableKeyboard();
            map.enableDragging();
            map.enableDoubleClickZoom()
        },
        addClickHandler: function(target,window){
            target.addEventListener("click",function(){
                target.openInfoWindow(window);
            });
        },
        addMapOverlay: function(){
            var self = this;
            var markers = [
              {content:self.address,title:self.company_name,imageOffset: {width:-46,height:-21},position:{lat:self.lat,lng:self.lng}}
            ];
            for(var index = 0; index < markers.length; index++ ){
                var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
                var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
                  imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
                })});
                var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
                var opts = {
                  width: 200,
                  title: markers[index].title,
                  enableMessage: false
                };
                var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
                marker.setLabel(label);
                self.addClickHandler(marker,infoWindow);
                map.addOverlay(marker);
            };
        },
        addMapControl: function(){
            var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
            scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
            map.addControl(scaleControl);
            var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:3});
            map.addControl(navControl);
            var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:false});
            map.addControl(overviewControl);
        }
  }
   window['QMap'] = QMap;
})(jQuery);
