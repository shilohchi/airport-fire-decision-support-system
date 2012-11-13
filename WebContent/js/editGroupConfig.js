EditGroupConfig = Ext.extend(Ext.FormPanel, {
			initComponent : function(arg) {
				
				var config = {
					bodyStyle : 'padding:5px',
					width : 350,
					minSize : 500,
					collapsed : false,
					collapseFirst : true,
					frame : true,
					margins : '5 5 5 0',
					cmargins : '0 0 0 0',
					labelAlign : 'left',
					defaults : {
						labelWidth : 80
					},
					border : false,
					items : {
						xtype : "fieldset",
						title : "详细信息",
						bodyStyle : 'padding:5px',
						defaults : {
							width : 200
						},
						buttonAlign : 'center',
						checkboxToggle : true,
						autoHeight : true,
						items : [{
									id : "myRewardStudentId",
									xtype : "label",
									fieldLabel : "名称",
									name : "studentId",
									listWidth : 220,
									text:"空港美食城"
									
								}, {

									xtype : "label",
									fieldLabel : "密集度",
									blankText : '人数不能为空', // ******
									msgTarget : 'under',
									name : "Rwtime",
									allowBlank : false,
									text:"密集度信息"
								},	
								 {
									xtype : "label",
									fieldLabel : "位置",
									msgTarget : 'under',
									name : "Rwtime",
									text:"位置信息"
								},
								 {
									xtype : "label",
									fieldLabel : "联系方式",
									msgTarget : 'under',
									name : "Rwtime",
									text:"888-888-888"
								},
								{
									xtype : "htmleditor",
									fieldLabel : "编辑配置预案"
								}
								
								],
						buttons : [{
							text : '确定',
							scope : this,
							handler : function() {
								
							}
						}]

					}
				};

				Ext.apply(this,config);

				EditGroupConfig.superclass.initComponent.apply(this,
						arguments);
			}
		});
Ext.reg("editgroupconfig", EditGroupConfig);