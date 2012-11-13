DisasterHistoryRecord = Ext.extend(Ext.tree.TreePanel, {
			initComponent : function() {
				var config = {
					id : "tp",
					animate : true,
					collapsible : true,
					enableDD : true,
					enableDrag : true,
					rootVisible : true,
					autoScroll : true,
					lines : true
				};
				var root = new Ext.tree.TreeNode({
							id : "root",
							text : "历史灾害记录查询",
							expanded : true

						});

				function dListener() {
					page.changeEast({
								xtype : "scandisasterinfo"
							})
				}
				var d1 = new Ext.tree.TreeNode({
							expanded : true,
							icon:pngResources.alarm,
							text : "<img src='{}' width='20' />测试灾害1".format(pngResources.alarm),
							icon : "",
							listeners : {
								"click" : function(e) {
									dListener();
								}
							}
						});
				var d2 = new Ext.tree.TreeNode({
							expanded : true,
							icon:pngResources.alarm,
							text : "<img src='{}' width='20' />测试灾害2".format(pngResources.alarm),
							icon : "",
							listeners : {
								"click" : function(e) {
									dListener();
								}
							}
						});
				var d3 = new Ext.tree.TreeNode({
							expanded : true,
							text : "<img src='{}' width='20' />测试灾害3".format(pngResources.alarm),
							icon:pngResources.alarm,
							icon : "",
							listeners : {
								"click" : function(e) {
									dListener();
								}
							}
						});
				var d4 = new Ext.tree.TreeNode({
							expanded : true,
							text : "<img src='{}' width='20' />测试灾害4".format(pngResources.alarm),
							icon:pngResources.alarm,
							icon : "",
							listeners : {
								"click" : function(e) {
									dListener();
								}
							}
						});
				var d5 = new Ext.tree.TreeNode({
							expanded : true,
							text : "<img src='{}' width='20' />测试灾害5".format(pngResources.alarm),
							icon:pngResources.alarm,
							icon : "",
							listeners : {
								"click" : function(e) {
									dListener();
								}
							}
						});
				var d6 = new Ext.tree.TreeNode({
							expanded : true,
							text : "<img src='{}' width='20' />测试灾害6".format(pngResources.alarm),
							icon:pngResources.alarm,
							icon : "",
							listeners : {
								"click" : function(e) {
									dListener();
								}
							}
						});
				var d7 = new Ext.tree.TreeNode({
							expanded : true,
							text : "<img src='{}' width='20' />测试灾害7".format(pngResources.alarm),
							icon:pngResources.alarm,
							icon : "",
							listeners : {
								"click" : function(e) {
									dListener();
								}
							}
						});
				var d8 = new Ext.tree.TreeNode({
							expanded : true,
							text : "<img src='{}' width='20' />测试灾害8".format(pngResources.alarm),
							icon:pngResources.alarm,
							icon : "",
							listeners : {
								"click" : function(e) {
									dListener();
								}
							}
						});
				var d9 = new Ext.tree.TreeNode({
							expanded : true,
							text : "<img src='{}' width='20' />测试灾害9".format(pngResources.alarm),
							icon:pngResources.alarm,
							icon : "",
							listeners : {
								"click" : function(e) {
									dListener();
								}
							}
						});
				var d10 = new Ext.tree.TreeNode({
							expanded : true,
							text : "<img src='{}' width='20' />测试灾害10".format(pngResources.alarm),
							
							listeners : {
								"click" : function(e) {
									dListener();
								}
							}
						});
				root.appendChild(d1);
				root.appendChild(d2);
				root.appendChild(d3);
				root.appendChild(d4);
				root.appendChild(d5);
				root.appendChild(d6);
				root.appendChild(d7);
				root.appendChild(d8);
				root.appendChild(d9);
				root.appendChild(d10);

				Ext.apply(this, {
							root : root
						});
				Ext.apply(this, config);
				DisasterHistoryRecord.superclass.initComponent.apply(this,
						arguments);

			}
		});

Ext.reg("disasterhistoryrecord", DisasterHistoryRecord);
