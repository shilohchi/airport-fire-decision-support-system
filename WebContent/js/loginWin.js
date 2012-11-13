/// <reference path="../common/vswd-ext_2.1.js" />
/// <reference path="../common/vswd-mohen.util_1.0.js" />
Ext.BLANK_IMAGE_URL = '../Ext2.0/resources/images/default/s.gif';
Ext.QuickTips.init();
var formPanel;

Login = function() {
    var dialog, form, submitUrl = '../test.htm';

    return {
        Init: function() {
            Ext.QuickTips.init();
            var role = get_cookie('role');
            var userId = get_cookie('userId');
            var userName = get_cookie('userName');
            /**
            if (role != null) {
                if (role == 'admin')
                    window.location = '../test.htm'; //path;
                else
                    window.location = '../test.htm'; //path;
            } else { **/
                var logoPanel = new Ext.Panel({
                    baseCls: 'x-plain',
                    id: 'login-logo',
                    region: 'center'
                });
                var spot = new Ext.Spotlight({
                    easing: 'easeOut',
                    duration: .6
                });

                
                var fieldLable = new Ext.ux.Label({ id: 'aa', columnWidth: .28, text: '保存登录状态(<font color=red>0</font> 天) ' }); //label,message
                var tip = new Ext.ux.SliderTip({
                    getText: function(slider) {
                        var value = String.format('<b> {0} 天</b>', slider.getValue());
                        fieldLable.setValue("保存登录状态(<font color=red>" + slider.getValue() + "</font> 天)");
                        return value;
                    }
                }); //Tip message for the slider.
                var slider = new Ext.Slider({
                    value: 0,
                    id: 'cookie',
                    columnWidth: .44,
                    increment: 1,
                    minValue: 0,
                    maxValue: 35,
                    plugins: tip
                }); //Slider,choose the days for the cookie.  get value method: slider.getValue(). up lines

                slider.addListener('change', function() {   //实现鼠标点击时，值改变 *****
                    fieldLable.setValue("保存登录状态(<font color=red>" + slider.getValue() + "</font> 天)");
                });

                var panel = new Ext.Panel({
                    layout: 'column'
                    , anchor: "115%"
                    , border: false
                    , items: [fieldLable, slider]
                }); //cookie slider panel contant.
                formPanel = new Ext.form.FormPanel({
                    baseCls: 'x-plain',
                    baseParams: {
                        event: 'UserLogin'  //传递参数。UserLogin
                    },

                    defaultType: 'textfield',
                    frame: false,
                    height: 150,
                    id: 'login-form',
                    defaults: { allowBlank: false, width: 200 },
                    items: [{
                        fieldLabel: '用户名',
                        name: 'userName',
                        id: 'nameField',
                        blankText: '请输入用户名',  //******
                        msgTarget: 'under',
                        listeners: { "focus": { fn: function() { spot.show("login-win"); }, scope: this }, "blur": { fn: function() { spot.hide("login-win"); } } }
                    }, {
                        fieldLabel: '密  码',
                        inputType: 'password',
                        name: 'userPwd',
                        blankText: '请输入密码',   //******
                        msgTarget: 'under',
                        listeners: { "focus": { fn: function() { spot.show("login-win"); }, scope: this }, "blur": { fn: function() { spot.hide("login-win"); } } }
                    }, panel],
                    labelWidth: 120,
                    region: 'south',
                    url: submitUrl
                }); // login panel   items:tips  for text check,   listerners : founction for show

                function Submit() {
                    window.open("index.html");
                }   // submit function

                dialog = new Ext.Window({
                    buttons: [{
                        handler: Submit,
                        scope: Login,
                        iconCls: 'login',
                        id: 'loginbtn',
                        text: '登陆'
                    }, {
                        text: '重置',
                        iconCls: 'reset',
                        handler: function() {
                            formPanel.getForm().reset();
                        }
                        /*showStatu*/}],
                        buttonAlign: 'center',
                        closable: false,
                        draggable: true,
                        height: 315,
                        iconCls: 'login',
                        id: 'login-win',
                        layout: 'border',
                        minHeight: 350,
                        minWidth: 530,
                        animEl: 'dialog',
                        plain: true,
                        resizable: true,
                        items: [
		        	logoPanel,
		        	formPanel
		        ],
                        title: '',
                        width: 480
                    }); // main windows ,contant for the panels

                    form = formPanel.getForm();

                    dialog.show(Ext.getBody());
                    var map = new Ext.KeyMap(document, {
                        key: Ext.EventObject.ENTER,
                        fn: Submit,
                        scope: Login
                    });
               
            },



            Success: function(form, action) { // login success event functions , destroy the window and redirct to the url by different cases of the user names.

                dialog.destroy(true);
                var path = window.location.pathname;
                path = path.substring(0, path.lastIndexOf('/') + 1);
                //var responseArray = Ext.util.JSON.decode(action.response.responseText); 
                //alert(path);
                //set_cookie('memberName', responseArray.msg, 30, '/', '', '' );
                var userId = action.result.UserId;
                var role = action.result.Role;
                var userName = action.result.UserName;
                var num = get_cookie('numCookie');

                set_cookie('LoginId', userId, num, '/', '', '');
                set_cookie('role', role, num, '/', '', '');
                set_cookie('LoginName', userName, num, '/', '', '');
                if (role == 'admin')
                    window.location = 'admin.html'; //path;
                else
                    window.location = 'student.html'; //path;
            }
        };
    } ();

Ext.BasicForm.prototype.afterAction=function(action, success){
	this.activeAction = null;
	var o = action.options;
	if(o.waitMsg){
		Ext.MessageBox.updateProgress(1);
		Ext.MessageBox.hide();
	}
	if(success){
		if(o.reset){
			this.reset();
		}
		Ext.callback(o.success, o.scope, [this, action]);
		this.fireEvent('actioncompleted', this, action);
	}else{
	    formPanel.getForm().reset();        //*****当用户名或密码登陆出错是，将输入框清空。
		Ext.callback(o.failure, o.scope, [this, action]);
		this.fireEvent('actionfailed', this, action);
	}
}//events and event binds



Ext.onReady(Login.Init, Login, true);// function for the page ready

