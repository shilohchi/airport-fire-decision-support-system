SolutionDetails = Ext.extend(Ext.Window, {
			initComponent : function() {
				config = {
					title : '配置预案详细信息',
					floating : true,
					frame : true,
					width : 600,
					height : 500,
					layout : "form",
					labelWidth : 120,
					defaults : {
						labelWidth : 300
					},
					items : [{
								xtype : "label",
								fieldLabel : "消防总队配置如下"
							}, {
								xtype : "label",
								fieldLabel : "(1)渝北区消防总队",
								text : "出动人数：10人    水车数：2辆   联系方式：888-888-888"
							}, {
								xtype : "label",
								fieldLabel : "(2)渝中区消防总队",
								text : "出动人数：5人    水车数：1辆   联系方式：888-888-888"
							}, {
								xtype : "label",
								fieldLabel : "医院配置如下"
							}, {
								xtype : "label",
								text : "(1)西南医院      联系方式：888-888-888"
							}, {
								xtype : "label",
								fieldLabel : "需要疏散人群如下"
							}, {
								xtype : "label",
								text : "(1)空港美食城       联系方式：888-888-888"
							}, {
								xtype : "label",
								fieldLabel : "需要注意的设施如下"
							},

							{
								xtype : "label",
								text : "(1)渝北机场加油站      888-888-888"
							}, {
								xtype : "label",
								text : "(2)渝北空港加油站      888-888-888"
							}],
					buttons : [{
								text : "生成文档"
							}]
				};

				Ext.apply(this, config);
				SolutionDetails.superclass.initComponent.apply(this, arguments);
				this.show();
			}

		});