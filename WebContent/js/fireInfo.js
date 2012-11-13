
FireInfo = Ext.extend(Ext.FormPanel, {
    initComponent: function() {

    	this.config ={
    		 bodyStyle: 'padding:5px',
            width: 350,
            minSize: 500,
            collapsed: false,
            collapseFirst: true,
            frame: true,
            margins: '5 5 5 0',
            cmargins: '0 0 0 0',
            labelAlign: 'left',
            defaults: {
                labelWidth: 80
            },
            border: false,
            items: {
                xtype: "fieldset",
                title: "火灾信息录入",
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
                    fieldLabel: "名称",
                    name: "studentId",
                    blankText: '名称不能为空',   //******
                    msgTarget: 'under',
                    listWidth: 220,
                    allowBlank: false
                }, {

                    xtype: "combo",
                    fieldLabel: "等级",
                    blankText: '等级不能为空',   //******
                    msgTarget: 'under',
                    store:["一级","二级","三级"],
                    name: "Rwtime",
                    allowBlank: false
                },
                {
                    xtype: "combo",
                    fieldLabel: "类型",
                    blankText: '类型不能为空',   //******     
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
                    fieldLabel: "总指挥",
                    blankText: '总指挥不能为空',
                    msgTarget: 'under',
                    name: "Rwtime",
                    allowBlank: false
                },
                {
                    xtype: "textfield",
                    fieldLabel: "现场指挥",
                    blankText: '现场指挥不能为空',
                    msgTarget: 'under',
                    name: "Rwtime",
                    allowBlank: false
                },
                 {
                    xtype: "textarea",
                    fieldLabel: "备注",
                    name: "Rwdesn",
                    height: 150
}],
                    buttons : [{
							text : '生成预案', scope: this, handler: function() {
						var mappanel = page.getComponent("centerrgn");
						mappanel.startScan(mappanel.markermgr.get(page.disasterId).getPosition(), 5);	
                    }
                    }, { text: '重置', scope: this, handler: function() {
                        var form = baseForm.getForm();
                        form.reset();
                    } }]

                    }
    	};
       
                Ext.apply(this,this.config);
                FireInfo.superclass.initComponent.apply(this, arguments);
            }

        });
        
        Ext.reg("fireinfo",FireInfo);
