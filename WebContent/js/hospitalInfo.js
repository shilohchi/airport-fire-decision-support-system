
HospitalInfo = Ext.extend(Ext.FormPanel, {
    initComponent: function() {
    	this.config ={
    		
            width: 350,
            minSize: 500,
            collapsed: false,
            collapseFirst: true,
            frame: true,
            margins: '5 5 5 0',
            cmargins: '0 0 0 0',
             bodyStyle: 'padding:5px',
            labelAlign: 'left',
            defaults: {
                labelWidth: 80
            },
            border: false,
            items: {
                xtype: "fieldset",
                title: "医院信息录入",
                bodyStyle: 'padding:5px',
                defaults: {
                    width: 200
                },
                buttonAlign: 'center',
                checkboxToggle: true,
                autoHeight: true,
                items: [{
                    id: "myRewardStudentId",
                    xtype: "textfield",
                    fieldLabel: "医院名称",
                    name: "studentId",
                    blankText: '医院名称不能为空',   //******
                    msgTarget: 'under',
                    listWidth: 220,
                    allowBlank: false
                }, {

                    xtype: "textfield",
                    fieldLabel: "规模",
                    blankText: '规模不能为空',   //******
                    msgTarget: 'under',
                    name: "Rwtime",
                    allowBlank: false
                },
                {

                    xtype: "combo",
                    fieldLabel: "类型",
                    blankText: '类型不能为空',   //******
                    store: ["一甲", "二甲", "三甲"],
                    msgTarget: 'under',
                    name: "Rwtime",
                    allowBlank: false
                },
                {

                    xtype: "textfield",
                    fieldLabel: "位置",
                    blankText: '位置不能为空',
                    msgTarget: 'under',
                    name: "Rwtime",
                    allowBlank: false
                },

                {
                    xtype: "textfield",
                    fieldLabel: "联系方式",
                    msgTarget: 'under',
                    name: "Rwtime"
                }, {
                    xtype: "textarea",
                    fieldLabel: "备注",
                    name: "Rwdesn",
                    height: 150
}],
                    buttons: [{ text: '添加', scope: this, handler: function() {
                        if (baseForm.getForm().isValid()) {
                            mohen.util.CreateAjaxFormSubmit(baseForm, this.url, "post", { event: 'saveReward' }, function(form, action) {
                                mohen.util.MessageBoxAlert('提示信息', '添加成功', 3, function() {
                                    grid.store.reload();
                                });
                            });
                        }
                    }
                    }, { text: '重置', scope: this, handler: function() {
                        var form = baseForm.getForm();
                        form.reset();
                    } }]

                    }
    	};
       
           	Ext.apply(this,this.config);
			HospitalInfo.superclass.initComponent.apply(this,arguments);
            }
        });
        
        Ext.reg("hospitalinfo",HospitalInfo);