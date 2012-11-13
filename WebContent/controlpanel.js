// 控制面板
ControlPanel = Ext.extend(Ext.Panel, {
	constructor : function(config) {
		config = config || {};

		config = Ext.apply({
			layout : "accordion",
			items : [ {
				itemId : "firsttab",
				xtype : "restreepl",
				title : "资源管理",
				rescfg : {
					restypeItems : [ 1, 2, 3, 4, 5, 6 ]
				}
			}, {
				itemId : "secondtab",
				title : "灾害预案",
				xtype : "disastertree"
			}, {
				itemId: "thirdtab",
				title: "历史记录",
				xtype: "disasterhistoryrecord"
			}]
		}, config);
		ControlPanel.superclass.constructor.call(this, config);
	}
});

// 用户自定义的treepanel，必须通过传入restypeItems数组，动态初始化第一层次的子结点
ResourceTreePanel = Ext.extend(Ext.tree.TreePanel, {
	constructor : function(config) {
		config = config || {};

		config = Ext.apply({
			root : {},
			rootVisible : false
		}, config);

		// 动态生成nodes
		var nodes = [];
		this.idmgr = new Hashtable();
		// 管理图片id与restype的映射
		for ( var i = 0; i < config.rescfg.restypeItems.length; i++) {
			var id = uuid.v4();
			this.idmgr.put(id, config.rescfg.restypeItems[i]);
			var text = "<span id='{}'><img src='{}' width='20' />{}</span>".format(id, restypemgr.get(config.rescfg.restypeItems[i]).icon.src,
							restypemgr.get(config.rescfg.restypeItems[i]).text);
			// node设置了infotype属性
			nodes[i] = {
				text : text,
				checked : false,
				// 用来下面处理ext的bug
				children : [ {
					text : "<未命名>",
					leaf : true
				} ]
			};
		}
		config.root.children = nodes;
		ResourceTreePanel.superclass.constructor.call(this, config);
		this.init();
	},

	// 初始化放在这里
	init : function() {
		this.on("afterrender", function() {
			// 设置拖拽
			var idmgr = this.idmgr;
			Ext.each(idmgr.keys(), function(id) {
				var source = new Ext.dd.DragSource(Ext.get(id));
				source.data = {
					restype : idmgr.get(id)
				}
			});

			// 管理结点与类型的映射
			this.nodemgr = new Hashtable();
			var nodes = this.root.childNodes;
			var restypeItems = this.initialConfig.rescfg.restypeItems;
			for ( var i = 0; i < nodes.length; i++) {
				this.nodemgr.put(restypeItems[i], nodes[i]);
			}

			// 处理treenode动态添加结点的bug
			Ext.each(this.root.childNodes, function(node) {
				node.expand();
				node.removeAll();
				node.collapse();
			});

		});

	},

	// 添加结点
	addNode : function(restype, resid, text, checked) {

		text = text || "<未命名>";

		this.nodemgr.get(restype).appendChild(new Ext.tree.TreeNode({
			text : text,
			checked : checked,
			leaf : true
		}));
	},

});

// 注册
Ext.reg("restreepl", ResourceTreePanel);
Ext.reg("ctrlpl", ControlPanel);
