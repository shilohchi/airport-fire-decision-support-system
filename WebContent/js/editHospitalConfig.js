EditHospitalConfig = Ext.extend(Ext.FormPanel, {
			initComponent : function() {
				this.config = {
					width : 350,
					minSize : 500,
					collapsed : false,
					collapseFirst : true,
					frame : true,
					margins : '5 5 5 0',
					cmargins : '0 0 0 0',
					bodyStyle : 'padding:5px',
					labelAlign : 'left',
					defaults : {
						labelWidth : 80
					},
					border : false,
					items : {
						xtype : "fieldset",
						title : "医院详细信息",
						bodyStyle : 'padding:5px',
						defaults : {
							width : 200
						},
						buttonAlign : 'center',
						checkboxToggle : true,
						autoHeight : true,
						items : [{
									xtype : "label",
									fieldLabel : "医院名称",
									name : "studentId",
									blankText : '医院名称不能为空', // ******
									msgTarget : 'under',
									listWidth : 220,
									allowBlank : false,
									text : "西南医院"
								}, {

									xtype : "label",
									fieldLabel : "规模",
									blankText : '规模不能为空', // ******
									msgTarget : 'under',
									name : "Rwtime",
									allowBlank : false,
									text : "规模信息"
								}, {

									xtype : "label",
									fieldLabel : "类型",
									blankText : '类型不能为空', // ******
									text : "一甲",
									msgTarget : 'under',
									name : "Rwtime",
									allowBlank : false
								}, {

									xtype : "label",
									fieldLabel : "位置",
									blankText : '位置不能为空',
									msgTarget : 'under',
									name : "Rwtime",
									allowBlank : false,
									text : "位置信息"
								},
								{
									xtype : "label",
									fieldLabel : "联系方式",
									msgTarget : 'under',
									name : "Rwtime"
								}, {
									xtype : "htmleditor",
									fieldLabel : "编辑配置预案"
								}],
						buttons : [{text:"确定"}]

					}
				};
				Ext.apply(this, this.config);
				EditHospitalConfig.superclass.initComponent.apply(this,
						arguments);
			}
		});

Ext.reg("edithospitalconfig", EditHospitalConfig);