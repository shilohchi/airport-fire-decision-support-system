// 使用边界布局，展示应用程序主界面
Page = Ext.extend(Ext.Viewport, {
	constructor : function(config) {
		config = config || {};
		config = Ext.apply({
			layout : "border",

			listeners : {
				afterrender : this.enableDrop
			},

			items : [{
				itemId : "northrgn",
				region : "north",
				height : 90,
				html : "<div style='background-image: url({}); backgound-repeat:repeat; text-align: center'><img src='{}' height='90'></img></div>".format(pngResources.headerLeftRight, pngResources.headerCenter)

			}, {
				itemId : "westrgn",
				region : "west",
				xtype : "ctrlpl",
				width : 200,
				split : true
			}, {
				itemId : "centerrgn",
				title : "资源分布信息",
				region : "center",
				xtype : "mappl"
			}, {
				itemId : "eastrgn",
				region : "east",
				split : true,
				layout: "fit",
				width : 350,
				collapsed : true,
				collapsible : true
			}]

		}, config);

		Page.superclass.constructor.call(this, config);
		this.init();

	},

	// 初始化放在这里
	init : function() {
		// uuid->{info, infotype}构成的字典
		this.resmgr = new Hashtable();
		
		this.addEvents("addResource");
		
		/** ************* 监听地图发送的addMarker事件 ********************** */
		// 事件暂时如此，以后再改
		this.getComponent("centerrgn").on("addMarker", function(data) {
			this.fireEvent("addResource", data);
		}, this);
		
		// 设置地图的响应
		this.on("addResource", function(data) {
			var resid = uuid.v4();
			// 单独处理警报
			if (data.restype == ResourceType.DISASTER) {
				this.disasterId = resid;
			}

			this.getComponent("centerrgn").addMarker(resid,
					restypemgr.get(data.restype).icon, data.position);
		}, this);

		// 改变属性面板
		this.on("addResource", function(data) {
			var eastCt = this.getComponent("eastrgn");
			this.changePropertyPanel({
				xtype: restypemgr.get(data.restype).propertyPanel
			});
			eastCt.expand();
		}, this);

		// 加节点，暂时这样做
		this.on("addResource", function(data) {
			if (data.restype != ResourceType.DISASTER) {
				var restree = this.getComponent("westrgn").getComponent("firsttab");
				restree.addNode(data.restype);
			}
		}, this);


	},
	
	// 地图响应托放
	enableDrop : function() {
		var panel = this.getComponent("centerrgn");
		new Ext.dd.DropTarget(panel.body, {
			// 什么时候发送添加marker事件
			notifyDrop : function(source, e) {
				var x = e.getPageX() - panel.body.getX();
				var y = e.getPageY() - panel.body.getY();
				var p = panel.map.pixelToPoint(new BMap.Pixel(x, y));

				panel.fireEvent("addMarker", {
					restype : source.data.restype,
					position : p
				});
			}
		});
	},

	// 改变东部面板中的内容，临时使用，演示后删除
	changePropertyPanel : function(config) {

		var ct = this.getComponent("eastrgn");
		ct.removeAll();
		ct.add(config);
		ct.doLayout();
	},

	changeEast: function(config) {
		this.getComponent("eastrgn").expand();
		this.changePropertyPanel(config);
	}
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	page = new Page();
});

	
