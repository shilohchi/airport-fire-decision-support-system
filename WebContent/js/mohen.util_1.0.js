///<reference path="vswd-ext_2.1.js" />
///<reference path="vswd-mohen.util_1.0.js" />

Ext.ns("mohen");
mohen.util=function(){
    var gridpagesize = 10;
   return{
        ////格式化日期
        formatDate:function(value){ return value ? value.dateFormat('Y-m-d') : '---'; },
        ///格式化空数据串
        filterData:function(value){ return value.toString().length>0 ? value : '---';},
        ///formLoad
        FormLoad:function(form,url,params,successmethod,failuremethod)
        {
            form.getForm().load({
                url:url,
                params:params,
                scope:this,
                method:'post',
                //waitTitle:'提示信息',
               // waitMsg:'正在数据...',
                success:function(form,action)
                {
                    if(successmethod)
                        Ext.callback(successmethod,this,[form,action]);
                },
                 failure:function(form,action)
                {
                    if(failuremethod)
                        Ext.callback(failuremethod,this,[form,action]);
                }                
                
            });
        },
        ///Ajax请求1
        CreateAjaxBasic:function(url, method, params, successmethod, failuremethod) {
                    
	                Ext.Ajax.request({
		                url : url,
		                method : method,
		                params : params,
		                scope:this,
		                waitTitle : '请稍候',
		                waitMsg : '正在操作...',
		                success : function(response, options) {
		                  try{
			                var responseArray = Ext.util.JSON.decode(response.responseText);
			                // alert(responseArray.success);
			                if (responseArray.success) {				            
					                Ext.callback(successmethod, this, [response, options]);
				                } else {
				                    if (failuremethod == 'undefined') {
					                    this.CreateErrorAlert('错误提示', responseArray.error);
					                }else
					                {
					                    Ext.callback(failuremethod);
					                }
				                }
				                }catch(o)
				                {
				                     this.CreateErrorAlert('错误提示', '不知名错误.！'+o.toString());
				                }
			               // }
			               
		                },
		                failure : function(response, options) {
                         try{ 
			                if (failuremethod == 'undefined')
				                this.CreateErrorAlert('错误提示', responseArray.error);
			                else
				                Ext.callback(failuremethod);
				             }catch(o)
				             {
				                this.CreateErrorAlert('错误提示', '不知名错误..！');
				             }
			                
		                }
	                });
          },
           ///Ajax请求1
            CreateAjaxCustom:function(url, method, params, successmethod) {
	                    Ext.Ajax.request({
		                    url : url,
		                    method : method,
		                    params : params,
		                    success : successmethod,
		                    failure : function(response, options) {
			                    var responseArray = Ext.util.JSON.decode(response.responseText);
			                    this.CreateErrorAlert('错误提示', responseArray.error);
		                    }
	                    });
            },

                      ///form提交  
           CreateAjaxFormSubmit:function(formpanel, url, method, params, successmethod,failuremethod) {
	            formpanel.form.submit({
		            waitTitle : '请稍候',
		            waitMsg : '数据加载中...',
		            url : url,
		            scope:this,
		            params : params,
		            method : method,
		            
		            failure : function(form, action) {			           
			              try{			                  
			                     if(failuremethod)
				                      Ext.callback(failuremethod,this,[form, action]);
			                     else
			                         this.CreateErrorAlert('错误提示', action.result.error);				                    
				            }
				            catch(o)
				            {           
				                  this.CreateErrorAlert('错误提示', "提交超时！" );
				            }
		            },
		            success : function(form, action) {
			            if (action.result.success) {           
				            Ext.callback(successmethod, this, [form, action]);
			            } else {
				            this.CreateErrorAlert('错误提示', "提交数据失败!");
			            } 
		            }
	            });
        },
        //错误提示
        CreateErrorAlert:function(title, msg, icon, fn) {
	        var ico = Ext.MessageBox.ERROR;
	        if (icon) {
		        ico = eval('Ext.MessageBox.' + icon);
	        }
	        Ext.MessageBox.show({
		        title : title,
		        width : 250,
		        msg : msg,
		        buttons : Ext.MessageBox.OK,
		        selectOnFocus:true,        //------
		        fn : fn,
		        icon : ico
	        });
},
        //提示信息
        MessageBoxAlert:function(title, msg, icon, fn) {
	        var ico;
	        if (icon == 1)
		        ico = Ext.MessageBox.ERROR;
	        if (icon == 2)
		        ico = Ext.MessageBox.WARNING;
            if(icon==3)
                ico=Ext.MessageBox.INFO;

	        Ext.MessageBox.show({
		        title : title,
		        msg : msg,
		        buttons : Ext.MessageBox.OK,
		        selectOnFocus:true,                ///---------------
		        fn : fn,
		        animEl: 'elId',
		        width:250,
		        icon : ico
	        });
	         
        },
        //警告信息
        OneMessageBoxAlert:function(msg) {
	        title = '警告';
	        if (!msg) {
		        msg = '请选择一条记录';
	        }
	        this.MessageBoxAlert(title, msg, 2, Ext.emptyFn);
        },
        
        //确定操作
        MessageBoxConfirm:function(len, fn, txt) {
	        var title = '提示';
	        var msg = '您选中了<font color=red>' + len + '</font>条数据,确定要删除吗?';
	        if (txt)
		        msg += txt;
	        Ext.MessageBox.confirm(title, msg, fn,this);
        },
        id:'config',
        //创建空图片
        CreateEmptyImage:function() {
	        var temp_empty_img = document.createElement("img");
	        temp_empty_img.style.margin = "5px";
	        temp_empty_img.id = 'imgtest';
	        temp_empty_img.src = emptyimg;
	        $("imgtest_div").appendChild(temp_empty_img);
        },
        ///选择图片按钮
        CreateChooseImageBtn:function() {
	        var temp_btn_div = document.createElement("div");
	        temp_btn_div.id = 'temp_btn_div';
	        document.getElementById("centertest").appendChild(temp_btn_div);
	        var changimgbtn = new Ext.Button({
		        text : ChinaSoft_App_AddPic,
		        renderTo : 'temp_btn_div'
	        });
	        changimgbtn.on('click', function() {
		        swfu.browse();
	        });
        },
        //字符串替换
        MyReplace:function(str, oldStr, newStr) {
	        var tmpStr = '';
	        var pos1, pos1;
	        pos1 = str.indexOf(oldStr);
	        pos2 = pos1 + oldStr.length;
	        if (pos1 < 0) {
		        tmpStr = str;
		        return tmpStr;
	        }
	        while (pos1 >= 0) {
		        tmpStr += str.substring(0, pos1);
		        tmpStr += newStr;
		        str = str.substring(pos2);

		        pos1 = str.indexOf(oldStr);
		        pos2 = pos1 + oldStr.length;
	        }

	        tmpStr += str;
	        // alert(tmpStr)
	        return tmpStr;
        },
        // 去除html格式
        DelHtml:function(Word) {
	        a = Word.indexOf("<");
	        b = Word.indexOf(">");
	        len = Word.length;
	        c = Word.substring(0, a);
	        if (b == -1)
		        b = a;
	        d = Word.substring((b + 1), len);
	        Word = c + d;
	        tagCheck = Word.indexOf("<");
	        if (tagCheck != -1)
		        Word = DelHtml(Word);
	        Word = MyReplace(Word, '&nbsp;', '')
	        Word = MyReplace(Word, '&NBSP;', '')
	        return Word;
        },
        //显示loading
        ShowLoding:function() {
	        Ext.getBody().mask('数据加载中...');
        },
        //显示loading
        ShowLodingText:function(text) {
	        Ext.getBody().mask(text, "x-mask-loading");
        },
        //取消loading
        UnShowLoding:function() {
	        Ext.getBody().unmask();
        },
        //过滤字符串
        formatremark:function(val) {
	        val = DelHtml(val);
	        var tem;
	        if (val.length > 20) {
		        tem = val.substring(0, 20);
	        } else {
		        tem = val;
	        }
	        // alert(tem);
	        return tem;
        },

// 定时函数
    CreateTaskMgrMsg:function(msg, second, fn, btnfn) {
	    var daoshu = second;
	    var task;
	    var box = Ext.MessageBox.alert('提示信息', msg + '<font color=red><b>' + daoshu
			    + '</b></font> 秒后,将退到登陆页面!', function() {
		    Ext.TaskMgr.stop(task);
		    Ext.callback(btnfn);
	    });
	    task = {
		    run : function() {
			    var tem = daoshu--;
			    box.updateText(msg + '<font color=red><b>' + tem
					    + '</b></font> 秒后,将退到登陆页面!');
			    if (daoshu == 0) {
				    box.hide();
				    Ext.TaskMgr.stop(task);
				    Ext.callback(fn);
			    }
		    },
		    interval : 1000
	    // 1 second
	    }

	    Ext.TaskMgr.start(task);
    },
    // 周期函数
    CreateTaskMgrFun:function(fn, interval, cishu) {
	    // Ext.TaskMgr.start({run: myFunction, interval: 1000});
	    // * run: 编排的函数
	    // * scope: 执行的作用域
	    // * interval: 运行的频率
	    // * duration: 运行多久
	    // * args: 要传入到编排函数内的参数，缺省下函数所接受到的参数为你任务已运行的次数
	    // * repeat: 任务运行的次数

	    var task = {
		    run : fn,
		    interval : interval,
		    repeat : cishu
	    };
	    Ext.TaskMgr.start(task);

    },
    //构造TabPanel
    CreateTabPanel:function(id, obj) {
	    var tp = new Ext.Panel({
		    id : id,
		    border : false,
		    layout : 'fit',
		    items : obj
	    });
	    return tp
    },
    //刷新操作
    refreshhandler:function(ds, sts) {
	    try {
		    if (ds) {
			    var starts, limits;
			    if (ds.lastOptions == null) {
				    starts = 0;
				    limits = gridpagesize;
			    } else {
				    starts = ds.lastOptions.params.start;
				    limits = ds.lastOptions.params.limit;
			    }
			    if (sts) {
				    starts = 0;
				    sts = 'undefined';
			    }
			    ds.load({
				    params : {
					    start : starts,
					    limit : limits
				    }
			    });

			    // store.load();

		    }
	    } catch (ex) {

	    }
    },
///grid编辑操作
    edithandlers:function(grid, fn, isyan) {
	if (!isyan) {
		var c = grid.getSelections();
		if (c.length == 0) {
			this.OneMessageBoxAlert();
			return;
		} else if (c.length != 1) {
			this.OneMessageBoxAlert('只能选择一条记录');
			return;
		} else {
			// var rec = grid.getSelectionModel().getSelected();
			Ext.callback(fn,this,c);
		}
	} else {
		Ext.callback(fn,this,c);
	}
},

///grid删除操作
    delhandlers:function(grid, action, url, ds, txt) {
	    var c = grid.getSelections();
	    var data = [];	    
	    if (c.length > 0) {
		    this.MessageBoxConfirm(c.length, function(btn) {
		        //alert(this.id+"1");
		        //var obj=this;
			    if (btn == 'yes') {
				    var records = grid.getSelectionModel().getSelections();
				    Ext.each(records, function(r, i) {
			                data.push(r.data.Id);
		                }, this);		            
				    this.CreateAjaxBasic(url, 'POST', {
					    event : action,
					    json : Ext.encode(data)
				    }, function() {
				        mohen.util.MessageBoxAlert("提示信息","删除成功！",3,mohen.util.refreshhandler(ds));
					    
				    },function(){
				        mohen.util.CreateErrorAlert("错误提示","删除失败!");				       
				    })

			    }
		    }, txt);
	    } else {
		    this.OneMessageBoxAlert();
	    }
    },
    ///gridselect
    selectJson:function(grid) {	    
	    var data = [];
	    var records = grid.getSelectionModel().getSelections();
				    Ext.each(records, function(r, i) {
			                data.push(r.data.Id);
		                }, this);
	    return data;  
	   
    },
    ///构造GroupingView
    GetGroupingView:function(){
        var GroupingView=new Ext.grid.GroupingView({
            autoFill:true,
            deferEmptyText:true,
            emptyText:'没有数据可以显示',
            enableNoGroups:true,
            forceFit :true,
            groupTextTpl : '{text} ({[values.rs.length]}  "项" )',
            showGroupsText:'分组显示',
            startCollapsed:false,
            groupByText:'按本列分组显示',

           getRowClass : function(record,rowIndex,rowParams,store){   
                    //禁用数据显示红色   
               if(record.data.pstate!=0){ 
                return 'x-grid-record-red';   
                                    }else{ 
                return '';   
                 }   
           }, 
            enableRowBody:true
        });
        return GroupingView;
    },
    ///构造GridView
    GetGridView:function(){
        var GridView=new Ext.grid.GridView({
            autoFill:true,
            deferEmptyText:true,
            emptyText:'没有数据可以显示',           
            forceFit :true,            
            enableRowBody:true
        });
        return GridView;
    },
     ///构造精简PagingToolbar
    GetSimplePagingToolbar:function(size, ds) {
	        var gridpagingtoolbar = new Ext.PagingToolbar({
	            plugins:new Ext.ux.Andrie.pPageSize(),
		        pageSize : size,
		        store : ds,
		        displayInfo : false,
		        displayMsg : "当前显示<font color=red>{0} - {1}</font>条 /总共有<font color=red>{2}</font>条数据",
		        emptyMsg : '没有数据可以显示',
		        beforePageText : '当前为第',
		        afterPageText : '页/ 总共有<font color=red>{0}</font>页',
		        firstText : '第一页',
		        lastText : '最后一页',
		        prevText : '上一页',
		        nextText : '下一页',
		        refreshText:'刷新数据'
	        });
	        return gridpagingtoolbar;
        },
        
            ///构造常用PagingToolbar
    GetPagingToolbar:function(size, ds) {
	      var gridpagingtoolbar = new Ext.PagingToolbar({
	            plugins:new Ext.ux.Andrie.pPageSize(),
		        pageSize : size,
		        store : ds,
		        displayInfo : true,
		        displayMsg : "当前显示<font color=red>{0} - {1}</font>条 /总共有<font color=red>{2}</font>条数据",
		        emptyMsg : '没有数据可以显示',
		        beforePageText : '当前为第',
                afterPageText : '页/ 总共有<font color=red>{0}</font>页',
		        firstText : '第一页',
		        lastText : '最后一页',
		        prevText : '上一页',
		        nextText : '下一页',
		        refreshText:'刷新数据'
	        });
	        return gridpagingtoolbar;
        },

    ///构造常用gridmenutoolbar
    Getgridmenutoolbar:function(scope,queryFn,addFn,editFn,delFn) {
           var qury=new Ext.Toolbar.Button ({
		            id : 'tnewbtn',
		            text : '查询记录',
		            tooltip : '查询该表信息',
		            iconCls : 'find',
		            listeners:{"focus":{fn:function(){alert("on T");}}, "blur":{fn:function(){ alert("lose");}}},  //********
		            scope:scope,
		            enableToggle:true,
		            pressed:false,
		            handler:queryFn
	            });
            var addBtn=new Ext.Toolbar.Button ({
		        id : 'tnewbtn',
		        text : '添加新纪录',
		        tooltip : '添加新纪录',
		        iconCls : 'add',
		        listeners:{"focus":{fn:function(){alert("on T");}}, "blur":{fn:function(){ alert("lose");}}},  //********
		        scope:scope,
		        enableToggle:true,
		        pressed:false,
		        handler:addFn
	        });
	        var editBtn=new Ext.Toolbar.Button ({
		        id : 'teditbtn',
		        text : '编辑选定项',
		        tooltip : '编辑选定项',
		        iconCls : 'modify',
		        scope:scope,
		        handler:editFn
		        
	        });
	        var delBtn=new Ext.Toolbar.Button ({
		        id : 'tdelbtn',
		        text : '删除选定项',
		        tooltip : '删除选定项',
		        iconCls :  'remove',
		        scope:scope,
		        handler:delFn		        
	        });	        
	        var gridmenutoolbar =new Ext.Toolbar({items:[qury,'-', addBtn ,'-', editBtn, '-', delBtn]});
//	        gridmenutoolbar.add('-',editBtn);
//	        if(add){
//	            gridmenutoolbar.addSeparator();
//	            gridmenutoolbar.add(add);
//	            }
//	        if(edit)
//	        {
//	         gridmenutoolbar.addSeparator();
//	         gridmenutoolbar.add(edit);   
//	        }
//	        if(del)
//	        {
//	         gridmenutoolbar.addSeparator();
//	         gridmenutoolbar.addButton(delBtn);   
//	        }
	        return gridmenutoolbar;
        },
        //构造搜索框
      GridrenderSearch:function(grid, ds, parm) {
	        var tb_Cust = grid.getTopToolbar();// 获取GridPanel顶部工具条
	        tb_Cust.addDom({
		        tag : 'div',
		        id : 'div_keyword',
		        html : "&nbsp;&nbsp;&nbsp;&nbsp;<input id='keyword', size='20'>"
	        });
	        var keyword = new Ext.form.TextField({
		        id : 'serchkeytxt'
	        });
	        keyword.on('change', function(Field, newValue, oldValue) {
		        ds.baseParams['search'] = newValue;
		        for (var p in parm) {
			        ds.baseParams[p] = eval('parm.' + p);
		        }
		        refreshhandler(ds, '0');
	        });
	        keyword.applyToMarkup("keyword");// 渲染
        },
//构造EditComboBox
        GetEditComboBox:function(dataurl, dataparams, datareader, label, dname, hname,vname, name) {
	        var cur = new Ext.form.ComboBox({
		        fieldLabel : label,
		        anchor : '90%',
		        hiddenName : hname,
		        store : new Ext.data.Store({
			        proxy : new Ext.data.HttpProxy({
				        url : dataurl
			        }),
			        baseParams : dataparams,
			        reader : new Ext.data.JsonReader({}, datareader),
			        autoLoad : true
		        }),
		        name : name,
		        valueField : vname,
		        displayField : dname,
		        typeAhead : true,
		        mode : 'local',
		        triggerAction : 'all',
		        allowBlank : true,
		        selectOnFocus : true
	        });
	        return cur;
        },
        //构造tree
        GetTreeFiled:function(label, name, roottxt, url, params, rootvisible,rendername, Hiddenvalueobj, isselect, istxt, isreload) {
	        var treefiled = new Ext.form.ComboBox({
		        store : new Ext.data.SimpleStore({
			        fields : [],
			        data : [[]]
		        }),
		        editable : false,
		        anchor : '90%',
		        name : name,
		        fieldLabel : label,
		        mode : 'local',
		        triggerAction : 'all',
		        maxHeight : 200,
		        tpl : "<tpl for='.'><div style='height:200px'><div id='" + rendername
				        + "'></div></div></tpl>",
		        selectedClass : '',
		        onSelect : Ext.emptyFn
	        });
	        var root = new Ext.tree.AsyncTreeNode({
		        text : roottxt,
		        id : '0'
	        });
	        var tree = new Ext.tree.TreePanel({
		        loader : new Ext.tree.TreeLoader({
			        dataUrl : url,
			        baseParams : params
		        }),
		        rootVisible : rootvisible,
		        border : false,
		        root : root
	        });
	        root.on('load', function(node) {

	        });
	        var tempid = "";
	        tree.on('click', function(node) {
		        var tid = node.attributes.id;
		        tempid = tid;
		        var ttxt = node.attributes.text;
		        treefiled.setValue(ttxt);
		        if (istxt)
			        tid = ttxt;
		        Hiddenvalueobj.setValue(tid);
		        treefiled.collapse();
	        });
	        var isload = false;
	        treefiled.on('expand', function() {
		        tree.render(rendername);
		        if (!isload) {
			        root.reload();
			        isload = true;
			        if (isreload)
				        isload = false;
		        }

		        if (isselect) {
			        root.expand(true);
			        // 如果分类文本有值，则下拉的时候选中
			        if (Hiddenvalueobj.getValue()) {
				        var task;
				        function fn(i) {
					        // alert(leixingroot.isExpanded()+"\n"+i);
					        if (root.isExpanded()) {
						        try {
							        // 当都读完的时候选中
							        // console.log('次数: ' + i );
							        tree.getNodeById(tempid).select();
							        Ext.TaskMgr.stop(task);
						        } catch (ex) {
						        }
					        }
				        }
				        var task = {
					        run : fn,
					        interval : 2000,
					        repeat : 10
				        };

				        Ext.TaskMgr.start(task);
			        }
		        } else {
			        root.expand();
		        }
	        });
	        return treefiled;
        },
    checkbirthday:function(date){
	    return true;
    }
 ,isIdCardNo:function(idcard) {
	        var Errors = new Array("验证通过!", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!",
			        "身份证号码校验错误!", "身份证地区非法!");
	        var area = {
		        11 : "北京",
		        12 : "天津",
		        13 : "河北",
		        14 : "山西",
		        15 : "内蒙古",
		        21 : "辽宁",
		        22 : "吉林",
		        23 : "黑龙江",
		        31 : "上海",
		        32 : "江苏",
		        33 : "浙江",
		        34 : "安徽",
		        35 : "福建",
		        36 : "江西",
		        37 : "山东",
		        41 : "河南",
		        42 : "湖北",
		        43 : "湖南",
		        44 : "广东",
		        45 : "广西",
		        46 : "海南",
		        50 : "重庆",
		        51 : "四川",
		        52 : "贵州",
		        53 : "云南",
		        54 : "西藏",
		        61 : "陕西",
		        62 : "甘肃",
		        63 : "青海",
		        64 : "宁夏",
		        65 : "新疆",
		        71 : "台湾",
		        81 : "香港",
		        82 : "澳门",
		        91 : "国外"
	        }
	        var idcard, Y, JYM;
	        var S, M;
	        var idcard_array = new Array();
	        idcard = idcard.replace(/x/g, "X");
	        idcard_array = idcard.split("");
	        if (area[parseInt(idcard.substr(0, 2))] == null) {
		        return Errors[4];
	        }
	        switch (idcard.length) {
		        case 15 :
			        if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0
					        || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard
							        .substr(6, 2)) + 1900)
							        % 4 == 0)) {
				        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
			        } else {
				        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
			        }
			        if (ereg.test(idcard)) {
				        return true;// Errors[0];
			        } else {
				        return Errors[2];
			        }
			        break;
		        case 18 :
			        if (parseInt(idcard.substr(6, 4)) % 4 == 0
					        || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard
							        .substr(6, 4))
							        % 4 == 0)) {
				        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
			        } else {
				        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
			        }
			        if (ereg.test(idcard)) {
				        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10]))
						        * 7
						        + (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
						        * 9
						        + (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
						        * 10
						        + (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
						        * 5
						        + (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
						        * 8
						        + (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
						        * 4
						        + (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
						        * 2 + parseInt(idcard_array[7]) * 1
						        + parseInt(idcard_array[8]) * 6
						        + parseInt(idcard_array[9]) * 3;
				        Y = S % 11;
				        M = "F";
				        JYM = "10X98765432";
				        M = JYM.substr(Y, 1);
				        if (M == idcard_array[17]) {
					        return true;// Errors[0];
				        } else {
					        return Errors[3];
				        }
			        } else {
				        return Errors[2];
			        }
			        break;
		        default :
			        return Errors[1];
			        break;
	        }
        }
};
}();

var relogin = function() {

	delete_Cookie('role', '/', '');
	delete_Cookie('LoginId', '/', '');
	delete_Cookie('LoginName', '/', '');
	window.location = 'index.html';

}
var showStatu= function() {

	var role=get_cookie('role');
	var LoginId=get_cookie('LoginId');
	var userName=get_cookie('LoginName');
	mohen.util.MessageBoxAlert('当前状态','role:'+role+'@LoginName:'+userName+'@LoginId:'+LoginId,2,Ext.emptyFn());
}
