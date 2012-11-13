// 地图面板
MapPanel = Ext.extend(Ext.Panel, {
	constructor : function(config) {
		config = config || {};
		MapPanel.superclass.constructor.call(this, config);
		this.init();
	},

	// 初始化可以放在这里
	init : function() {
		this.on("afterrender", function() {
			var mapcfg = this.initialConfig.mapcfg || {};
			mapcfg = Ext.apply({
				center : {
					x : 106.649,
					y : 29.728
				},
				scale : 13
			}, mapcfg);

			// 初始化地图
			this.map = new BMap.Map(this.body.dom);
			var center = new BMap.Point(mapcfg.center.x, mapcfg.center.y);
			this.map.centerAndZoom(center, mapcfg.scale);
			this.map.enableScrollWheelZoom();

			this.map.addControl(new BMap.ScaleControl());
			// 比例尺寸
			this.map.addControl(new BMap.NavigationControl());
			// 添加默认缩放平移控件
			this.map.addControl(new BMap.OverviewMapControl({
				isOpen : true,
				anchor : BMAP_ANCHOR_TOP_RIGHT
			}));

		});

		this.addEvents("addMarker", "deleteMarker", "moveMarker");

		// markermgr用来管理marker，id->marker的字典
		this.markermgr = new Hashtable();
	},

	// 添加marker
	addMarker : function(id, icon, position) {
		var size = new BMap.Size(icon.size.width, icon.size.height)
		var marker = new BMap.Marker(position, {
			icon : new BMap.Icon(icon.src, size)
		});
		this.map.addOverlay(marker);
		this.markermgr.put(id, marker);

		marker.enableDragging(true);

		var panel = this;

		// 什么时候发送一哦电脑个marker事件
		marker.addEventListener("dragend", function() {
			panel.fireEvent("modifyResource", {
				id : id,
				position : marker.getPosition()
			})
		});
	},

	// 删除marker
	removeMarker : function(id) {
		var marker = markermgr.get(id);
		this.map.removeOverlay(marker);
		this.markermgr.remove(id);
	},

	startScan : function(point, distance)// 开始扫描
	{
		var i = 0;
		var circles = [];
		var map = this.map;
		distance *= 10;
		// 换算为公里数
		/* 扩散动态效果 */
		function circleSpread() {
			circles[i] = new BMap.Circle(point, i * 100, {
				fillColor : "#33FFFF",
				strokeWeight : 1,
				fillOpacity : 0.3,
				strokeOpacity : 0.3
			});

			circles[i].setFillOpacity(0.3);
			// 透明度
			// circles[i].setStrokeWeight(3);//边线得宽度
			map.addOverlay(circles[i]);
			if (i == distance) {
				clearInterval(a);
				// fireMarker.setAnimation(null);//可跳动
			}

			if (i >= 1) {
				map.removeOverlay(circles[i - 1]);
			}

			i++;
		}

		var a = setInterval(circleSpread, 100);
		// 雷达系统
	}// startScan.function();
});

Ext.reg("mappl", MapPanel);
