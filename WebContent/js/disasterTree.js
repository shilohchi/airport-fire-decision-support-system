DisasterTree = Ext.extend(Ext.tree.TreePanel, {
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
					text : "火灾信息管理",
					expanded : true

				});

		var solution = new Ext.tree.TreeNode({
					id : "solution",
					expanded : true,
					text : "配置预案管理",
					singleClickExpand : true,
					checked : false,
					icon : "",
					listeners : {
						"checkchange" : function(e) {
							resTree.prototype.checkAll(e);
						}
					}
				});

		var disaster = new Ext.tree.TreeNode({
			id : "disaster",
			text : "<img id='fire-disp' src='{}' width='20px'/>".format(pngResources.alarm),
			checked : false,
			expanded : true,
			icon : "",
			listeners : {
				"checkchange" : function(e) {
					resTree.prototype.checkAll(e);
				}
			}
		});
		root.appendChild(disaster);
		root.appendChild(solution);

		// /////////产生消防资源树Start////////////////////////

		var fireDepartment = new Ext.tree.TreeNode({
					id : "fireDepartment",
					text : "<img src='{}' width='20px'/>".format(pngResources.firedev),
					singleClickExpand : true,
					checked : false,
					expanded : true,
					icon : "",
					listeners : {
						"checkchange" : function(e) {
							resTree.prototype.checkAll(e);
						}
					}
				});

		function listener(node) {
			if (node.id == ResourceType.FIREFACILITY) {

				page.changeEast({
							xtype : "editfiredepartmentconfig"
						});
			}

			if (node.id == ResourceType.HOSPITAL) {
				page.changeEast({
							xtype : "edithospitalconfig"
						});
			}

			if (node.id == ResourceType.GOVERNMENT) {
				page.changeEast({
							xtype : "editgovernmentconfig"
						});
			}

			if (node.id == ResourceType.DANGER) {
				page.changeEast({
							xtype : "editdangerconfig"
						});
			}

			if (node.id == ResourceType.GROUP) {
				page.changeEast({
							xtype : "editgroupconfig"
						});
			}
		}

		var fireDeparment1 = new Ext.tree.TreeNode({
					id : ResourceType.FIREFACILITY,
					text : "渝北消防总队",
					qtip : "点击编辑配置预案",
					checked : true,
					type : ResourceType.FIREFACILITY,
					leaf : true,
					listeners : {
						"click" : function(node) {
							listener(node);
						}
					}

				});

		var fireDeparment2 = new Ext.tree.TreeNode({
					id : ResourceType.FIREFACILITY,
					icon : "",
					text : "江北消防总队",
					qtip : "点击编辑配置预案",
					checked : true,
					leaf : true,
					listeners : {
						"click" : function(node) {
							listener(node);
						}
					}

				});

		var fireDeparment3 = new Ext.tree.TreeNode({
					id : ResourceType.FIREFACILITY,
					text : "沙坪坝消防总队",
					checked : false,
					qtip : "点击编辑配置预案",
					leaf : true,
					listeners : {
						"click" : function(node) {
							listener(node);
						}
					}

				});

		fireDepartment.appendChild(fireDeparment1);
		fireDepartment.appendChild(fireDeparment2);
		fireDepartment.appendChild(fireDeparment3);

		// /////////产生消防资源树End////////////////////////

		// /////////产生医疗资源树Start////////////////////////

		var hospital = new Ext.tree.TreeNode({
					id : "hospital",
					expanded : true,
					text : "<img src='{}' width='20px'/>".format(pngResources.hospital),
					singleClickExpand : true,
					
					checked : false
				});

		var hospital1 = new Ext.tree.TreeNode({
					id : ResourceType.HOSPITAL,
					text : "肿瘤医院",
					checked : false,
					qtip : "点击编辑配置预案",
					leaf : true,
					
					listeners : {
						"click" : function(node) {
							listener(node);
						}
					}
				});

		var hospital2 = new Ext.tree.TreeNode({
					id : ResourceType.HOSPITAL,
					text : "新桥医院",
					qtip : "点击编辑配置预案",
					checked : false,
					leaf : true,
					
					listeners : {
						"click" : function(node) {
							listener(node);
						}
					}

				});
		var hospital2 = new Ext.tree.TreeNode({
					id : ResourceType.HOSPITAL,
					text : "西南医院",
					qtip : "点击编辑配置预案",
					checked : true,
					leaf : true,
					
					listeners : {
						"click" : function(node) {
							listener(node);
						}
					}

				});

		hospital.appendChild(hospital2);
		hospital.appendChild(hospital1);

		// /////////产生医疗资源树End////////////////////////

		var institution = new Ext.tree.TreeNode({
					id : "institution",
					text : "<img src='{}' width='20px'/>".format(pngResources.government),
					singleClickExpand : true,
					
					expanded : true,
					checked : false
				});

		var institution1 = new Ext.tree.TreeNode({
					id : ResourceType.GOVERNMENT,
					text : "渝北空港公安局",
					singleClickExpand : true,
					qtip : "点击编辑配置预案",
					
					expanded : true,
					checked : true,
					listeners : {
						"click" : function(node) {
							listener(node);
						}
					}
				});

		institution.appendChild(institution1);
		// /////////产生行政部门树End////////////////////////

		var person = new Ext.tree.TreeNode({
					id : "person",
					text : "<img src='{}' width='20px'/>".format(pngResources.group),
					singleClickExpand : true,
					
					expanded : true,
					checked : false
				});

		var person1 = new Ext.tree.TreeNode({
					id : ResourceType.GROUP,
					text : "空港美食城",
					singleClickExpand : true,
					qtip : "点击编辑配置预案",
					
					checked : true,
					listeners : {
						"click" : function(node) {
							listener(node);
						}
					}
				});

		person.appendChild(person1);

		// /////////产生人群部门树End////////////////////////
		var danger = new Ext.tree.TreeNode({
					id : "danger",
					text : "<img src='{}' width='20px'/>".format(pngResources.danger),
					singleClickExpand : true,
					
					expanded : true,
					checked : false
				});

		var danger1 = new Ext.tree.TreeNode({
					id : ResourceType.DANGER,
					text : "渝北机场加油站",
					singleClickExpand : true,
					qtip : "点击编辑配置预案",
					
					checked : true,
					listeners : {
						"click" : function(node) {
							listener(node);
						}
					}
				});

		var danger2 = new Ext.tree.TreeNode({
					id : ResourceType.DANGER,
					text : "渝北空港加油站",
					qtip : "点击编辑配置预案",
					singleClickExpand : true,
					
					checked : true,
					listeners : {
						"click" : function(node) {
							listener(node);
						}
					}
				});
		danger.appendChild(danger1);
		danger.appendChild(danger2);

		var details = new Ext.tree.TreeNode({
					id : "details",
					text : "浏览配置预案详细信息",
					singleClickExpand : true,
					
					checked : false,
					listeners : {
						"click" : function(node) {
							var sd = new SolutionDetails();

						}
					}
				});

		root.appendChild(details);

		solution.appendChild(fireDepartment);
		solution.appendChild(hospital);
		solution.appendChild(institution);
		solution.appendChild(person);
		solution.appendChild(danger);

		Ext.apply(this, {
					root : root
				});
		Ext.apply(this, config);
		DisasterTree.superclass.initComponent.apply(this, arguments);

		/** ********************start************ */
		this.on("afterrender", function() {
					var source = new Ext.dd.DragSource(Ext.get("fire-disp"));
					source.data = {
						restype : ResourceType.DISASTER
					}
				});
	},
	checkAll : function(node) {

		if (node.hasChildNodes) {
			node.eachChild(function(child) {
						child.attributes.checked = node.attributes.checked;
						child.getUI().toggleCheck(node.attributes.checked);
					});
		}
	},
	addNode : function(o) {
		var res = new Ext.tree.TreeNode({
					checked : true,
					leaf : true
				});
		res.id = o.id;
		res.text = "消防资源";
		var f = Ext.getCmp("tp");
		f.root.childNodes[0].appendChild(res);
		f.appendChild(res);
	}

});

Ext.reg("disastertree", DisasterTree);
