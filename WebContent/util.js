/**
 * fxg 2012.9.10 common tools and property
 */

// 图片资源 常量
pngResources = {
	"danger" : "resources/colorimg/danger.png",// 危险物品
	"hospital" : "resources/colorimg/doctor.png",// 医院
	"group" : "resources/colorimg/group.png",// 人群
	"police" : "resources/colorimg/policeman.png", // 警察局
	"government" : "resources/colorimg/official.png",// 行政官员
	"firedev": "resources/colorimg/firedev.png", // 消防设施
	"alarm": "resources/alarm.gif",  // 警报

	"headerCenter" : "resources/headerCenter.gif",
	"headerLeftRight" : "resources/headerbg.png"
};

// 要录入的信息分为哪几类
ResourceType = {
	DANGER : 1, // 危险设施
	FIREFACILITY : 2, // 消防设施
	HOSPITAL : 3, // 医院
	GROUP : 4, // 人群密集区
	POLICE : 5, // 公安部门
	GOVERNMENT : 6, // 政府部门
	DISASTER : 100 // 灾难
}

// 每一种类型，对应一种图标，一个提示，一种信息录入窗口。
// 这种对应关系由restypemgr管理
restypemgr = new Hashtable();

// 危险设施
restypemgr.put(ResourceType.DANGER, {
			icon : {
				src : pngResources.danger,
				size : {
					width : 48,
					height : 48
				}
			},
			tip : "危险设施",
			text : "危险设施",
			propertyPanel : "dangerinfo"
		});

// 消防设施
restypemgr.put(ResourceType.FIREFACILITY, {
			icon : {
				src : pngResources.firedev,

				size : {
					width : 48,
					height : 48
				}
			},

			tip : "消防设施",
			text : "消防设施",
			propertyPanel : "firedepartmentinfo"

		});

// 医院
restypemgr.put(ResourceType.HOSPITAL, {
			icon : {
				src : pngResources.hospital,

				size : {
					width : 48,
					height : 48
				}
			},

			tip : "医院",
			text : "医院",
			propertyPanel : "hospitalinfo"
		});

// 人群密集区
restypemgr.put(ResourceType.GROUP, {
			icon : {
				src : pngResources.group,

				size : {
					width : 48,
					height : 48
				}
			},

			tip : "人群密集区",
			text : "人群密集区",
			propertyPanel : "personinfo"
		});

// 公安部门
restypemgr.put(ResourceType.POLICE, {
			icon : {
				src : pngResources.police,

				size : {
					width : 48,
					height : 48
				}
			},
			tip : "公安部门",
			text : "公安部门",
			propertyPanel : "policeinfo"
		});

// 政府部门
restypemgr.put(ResourceType.GOVERNMENT, {
			icon : {
				src : pngResources.government,

				size : {
					width : 48,
					height : 48
				}
			},

			tip : "行政部门",
			text : "行政部门",
			propertyPanel : "govermentinfo"
		});

// 火
restypemgr.put(ResourceType.DISASTER, {
			icon : {
				src : pngResources.alarm,

				size : {
					width : 64,
					height : 64
				}
			},

			propertyPanel : "fireinfo"
		});

// 全局数据结构
// 数据格式为[{typeID:[{UUID:name,icon:icon},{UUID:name,icon:icon,address:}]},{},{}]
MarkerDataSet = [];
