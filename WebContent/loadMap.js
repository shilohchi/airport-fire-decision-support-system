	var map = new BMap.Map("container");          // 创建地图实例
	var point = new BMap.Point(116.404287, 39.916384);  // 创建点坐标;   
	map.centerAndZoom(point, 13);  // 初始化地图，设置中心点坐标和地图级别  
	
	map.addControl(new BMap.ScaleControl());//比例尺寸
	map.addControl(new BMap.NavigationControl());//添加默认缩放平移控件
	map.addControl(new BMap.OverviewMapControl());//添加默认缩略地图控件
	map.addControl(new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_TOP_RIGHT}));
	
	
	/*******通过ip定位到当前位置*************/
	function locateCurPosition(result)
	{
		var cityName = result.name;
		//map.setCenter(cityName);
		//point = new BMap.Point(result.center.lng,result.center.lat);
		
		point.lng = result.center.lng;
		point.lat = result.center.lat;
		
		map.centerAndZoom(point, 13);  // 初始化地图，设置中心点坐标和地图级别  
		//alert(result.center.point);
	}
	//var myCity = new BMap.LocalCity();
	//myCity.get(locateCurPosition);
	/************end********************/
	
	
	var i = 0;
	var circles = [];
	
	/*扩散动态效果*/
	function circleSpread()
	{
		circles[i] = new BMap.Circle(point,i * 100,
			{fillColor:"#33FFFF", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
			
		circles[i].setFillOpacity(0.3);//透明度
		//circles[i].setStrokeWeight(3);//边线得宽度
		map.addOverlay(circles[i]);
		if(i == 50)
		{
			clearInterval(a);
			fireMarker.setAnimation(null);//可跳动
		}
		
		if(i >= 1)
		{
			map.removeOverlay(circles[i-1]);
		}
		
		i++;
	}
	
	function startScan()
	{
		a = setInterval(circleSpread,100);//雷达系统
	}
	
	/*marker生成*/
	function getMarker(png,iconSize,isSetAnimation)
	{
		var myIcon = new BMap.Icon(png,new BMap.Size(iconSize.width,iconSize.height),
			{
				// 指定定位位置。  
				// 当标注显示在地图上时，其所指向的地理位置距离图标左上  
				// 角各偏移10像素和25像素。您可以看到在本例中该位置即是  
				// 图标中央下端的尖角位置。  
				 offset: new BMap.Size(0, 0),  
				// 设置图片偏移。  
				// 当您需要从一幅较大的图片中截取某部分作为标注图标时，您  
				// 需要指定大图的偏移位置，此做法与css sprites技术类似。  
				imageOffset: new BMap.Size(0,0)   // 设置图片偏移  
			});
			
		var marker = new BMap.Marker(point,{icon:myIcon});
		
		//firMarker.enableDragging();//可拖动
		if(isSetAnimation.valueOf())
		{
			marker.setAnimation(BMAP_ANIMATION_BOUNCE);//火图标可以跳动
		}
		return marker;
	}
	var polyineMarker;
	var transit;

	/*获取两点间距离*/
	function calcDistance(lastMarker)
	{
		if(twoPointsDistance.length == 2)
		{
			var pointA = new BMap.Point(twoPointsDistance[0].lng,twoPointsDistance[0].lat);
			var pointB = new BMap.Point(twoPointsDistance[1].lng,twoPointsDistance[1].lat);
				
			/*********************直接距离***********************************/
			/*距离折线*/
//		    polyineMarker = new BMap.Polyline([pointA,pointB],
//				{strokeColor:"red",strokeWeight:6,strokeOpacity:0.5});
//			
////			lastMarker.setLabel(label);
//				
//			map.addOverlay(polyineMarker);
//			
//			alert("你选的两点得距离是： " + 
//				map.getDistance(pointA,pointB) + " 米。");
			/*********************end********************************/
				
			/*******************自驾车计算*******************************/
			var output = "选取得两点驾车需要:\n";
			var searchComplete = function(results){
			if(transit.getStatus() != BMAP_STATUS_SUCCESS)
			{
				return;
			}
				var plan = results.getPlan(0);
				output += "总时间: ";
				output += plan.getDuration(true) + "\n";//获取时间
				output += "总路程: ";
				output += plan.getDistance(true) +"\n";//获取距离
			}
				
			/*驾车导航*/
//			var transit = new BMap.DrivingRoute(map,
//				{
//					renderOptions:{map:map,autoViewport:true},
//					onSearchComplete:searchComplete,
//					onPolylineSet:function(){
//						setTimeOut(function(){alert(output)},"1000");
//					}
//				});
		
				transit = new BMap.DrivingRoute(map, {renderOptions: {map: map},
			    onSearchComplete: searchComplete,
			    onPolylinesSet: function(){        
			        setTimeout(function(){alert(output)},"1000");
			    }});
				
			transit.search(pointA,pointB);
			/*******************end****************************************/
			
			twoPointsDistance = [];
		}
	}
	function clearPoine(curMarker)
	{
		if(twoPointsDistance.length < 2)
		{
			map.removeOverlay(polyineMarker);
			transit.clearResults();//清除最近一次查询结果
			curMarker.setLabel(null);
			
		}
	}
	
	var twoPointsDistance=[];
	var fireMarker = getMarker('resources/fire64.gif',
		{width:64,height:64},new Boolean(false));
	fireMarker.setTitle("火灾发生地");
		
	fireMarker.addEventListener("click",function(e){
		console.debug("该点:" + e.point.lng + ", " + e.point.lat);
		var point = {lng:e.point.lng,lat:e.point.lat};
		//twoPointsDistance[0] = point;
		if(twoPointsDistance.length <= 1)
		{
			twoPointsDistance.push({lng:e.point.lng,lat:e.point.lat});
		}
		
		clearPoine(this);
		calcDistance(this);//计算距离
		
	});
	
	
	var fireManMarker = getMarker('resources/fireMan.png',
		{width:48,height:48},new Boolean(false));
		
	fireManMarker.setTitle("消防力量");
	fireManMarker.addEventListener("click",function(e){
		console.debug("该点：" + e.point.lng + ", " + e.point.lat);
		if(twoPointsDistance.length <= 1)
		{
			twoPointsDistance.push({lng:e.point.lng,lat:e.point.lat});
		}
		clearPoine(this);
		calcDistance(this);//计算距离
		
	});
	fireManMarker.enableDragging();
	
	map.addOverlay(fireMarker);
	map.addOverlay(fireManMarker);
	
	startScan(); // 雷达开始扫描
	
	//116.387183, 39.940065
	//116.448412, 39.915941
	//116.42144, 39.884733 
