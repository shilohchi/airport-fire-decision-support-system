ScanDisasterInfo = Ext.extend(Ext.FormPanel, {
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
						title : "灾难详细信息",
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
									text : "测试灾难1"

								}, {
									xtype : "label",
									fieldLabel : "灾害等级",
									msgTarget : 'under',
									name : "Rwtime",
									text : "一级"
								}, {

									xtype : "label",
									fieldLabel : "报警人",
									msgTarget : 'under',
									name : "Rwtime",
									allowBlank : false,
									text : "张三"
								}, {

									xtype : "label",
									fieldLabel : "报警时间",
									msgTarget : 'under',
									name : "Rwtime",
									allowBlank : false,
									text : "1900-01-01"
								}, {

									xtype : "label",
									fieldLabel : "报警方式",
									msgTarget : 'under',
									name : "Rwtime",
									allowBlank : false,
									text : "电话报警"
								}, {
									xtype : "label",
									fieldLabel : "灾害地点",
									msgTarget : 'under',
									name : "Rwtime",
									allowBlank : false,
									text : "渝北空港XXX"
								}, {
									xtype : "label",
									fieldLabel : "总指挥",
									msgTarget : 'under',
									name : "Rwtime",
									allowBlank : false,
									text : "李四"
								}, {
									xtype : "label",
									fieldLabel : "现场指挥",
									msgTarget : 'under',
									name : "Rwtime",
									text : "王五"
								}],
						buttons : [{
									text : '现场录音',
									scope : this,
									handler : function() {

									}
								}, {
									text : '现场视屏',
									scope : this,
									handler : function() {

									}
								}, {
									text : '预案详细信息',
									scope : this,
									handler : function() {
										var s = new SolutionDetails();
									}
								}]
					}
				};
				
				
				Ext.apply(this, config);

				ScanDisasterInfo.superclass.initComponent
						.apply(this, arguments);
			}
		});
Ext.reg("scandisasterinfo", ScanDisasterInfo);