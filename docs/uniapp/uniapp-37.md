##  介绍

封装了Android、iOS的应用权限判断、打开应用权限设置界面、以及位置系统服务是否开启

##  代码解析

```js
var isIos
// #ifdef APP-PLUS
isIos = (plus.os.name == "iOS")
// #endif

// 判断推送权限是否开启
function judgeIosPermissionPush() {
	var result = false;
	var UIApplication = plus.ios.import("UIApplication");
	var app = UIApplication.sharedApplication();
	var enabledTypes = 0;
	if (app.currentUserNotificationSettings) {
		var settings = app.currentUserNotificationSettings();
		enabledTypes = settings.plusGetAttribute("types");
		console.log("enabledTypes1:" + enabledTypes);
		if (enabledTypes == 0) {
			console.log("推送权限没有开启");
		} else {
			result = true;
			console.log("已经开启推送功能!")
		}
		plus.ios.deleteObject(settings);
	} else {
		enabledTypes = app.enabledRemoteNotificationTypes();
		if (enabledTypes == 0) {
			console.log("推送权限没有开启!");
		} else {
			result = true;
			console.log("已经开启推送功能!")
		}
		console.log("enabledTypes2:" + enabledTypes);
	}
	plus.ios.deleteObject(app);
	plus.ios.deleteObject(UIApplication);
	return result;
}

// 判断定位权限是否开启
function judgeIosPermissionLocation() {
	var result = false;
	var cllocationManger = plus.ios.import("CLLocationManager");
	var status = cllocationManger.authorizationStatus();
	result = (status != 2)
	console.log("定位权限开启：" + result);
	// 以下代码判断了手机设备的定位是否关闭，推荐另行使用方法 checkSystemEnableLocation
	/* var enable = cllocationManger.locationServicesEnabled();
	var status = cllocationManger.authorizationStatus();
	console.log("enable:" + enable);
	console.log("status:" + status);
	if (enable && status != 2) {
		result = true;
		console.log("手机定位服务已开启且已授予定位权限");
	} else {
		console.log("手机系统的定位没有打开或未给予定位权限");
	} */
	plus.ios.deleteObject(cllocationManger);
	return result;
}

// 判断麦克风权限是否开启
function judgeIosPermissionRecord() {
	var result = false;
	var avaudiosession = plus.ios.import("AVAudioSession");
	var avaudio = avaudiosession.sharedInstance();
	var permissionStatus = avaudio.recordPermission();
	console.log("permissionStatus:" + permissionStatus);
	if (permissionStatus == 1684369017 || permissionStatus == 1970168948) {
		console.log("麦克风权限没有开启");
	} else {
		result = true;
		console.log("麦克风权限已经开启");
	}
	plus.ios.deleteObject(avaudiosession);
	return result;
}

// 判断相机权限是否开启
function judgeIosPermissionCamera() {
	var result = false;
	var AVCaptureDevice = plus.ios.import("AVCaptureDevice");
	var authStatus = AVCaptureDevice.authorizationStatusForMediaType('vide');
	console.log("authStatus:" + authStatus);
	if (authStatus == 3) {
		result = true;
		console.log("相机权限已经开启");
	} else {
		console.log("相机权限没有开启");
	}
	plus.ios.deleteObject(AVCaptureDevice);
	return result;
}

// 判断相册权限是否开启
function judgeIosPermissionPhotoLibrary() {
	var result = false;
	var PHPhotoLibrary = plus.ios.import("PHPhotoLibrary");
	var authStatus = PHPhotoLibrary.authorizationStatus();
	console.log("authStatus:" + authStatus);
	if (authStatus == 3) {
		result = true;
		console.log("相册权限已经开启");
	} else {
		console.log("相册权限没有开启");
	}
	plus.ios.deleteObject(PHPhotoLibrary);
	return result;
}

// 判断通讯录权限是否开启
function judgeIosPermissionContact() {
	var result = false;
	var CNContactStore = plus.ios.import("CNContactStore");
	var cnAuthStatus = CNContactStore.authorizationStatusForEntityType(0);
	if (cnAuthStatus == 3) {
		result = true;
		console.log("通讯录权限已经开启");
	} else {
		console.log("通讯录权限没有开启");
	}
	plus.ios.deleteObject(CNContactStore);
	return result;
}

// 判断日历权限是否开启
function judgeIosPermissionCalendar() {
	var result = false;
	var EKEventStore = plus.ios.import("EKEventStore");
	var ekAuthStatus = EKEventStore.authorizationStatusForEntityType(0);
	if (ekAuthStatus == 3) {
		result = true;
		console.log("日历权限已经开启");
	} else {
		console.log("日历权限没有开启");
	}
	plus.ios.deleteObject(EKEventStore);
	return result;
}

// 判断备忘录权限是否开启
function judgeIosPermissionMemo() {
	var result = false;
	var EKEventStore = plus.ios.import("EKEventStore");
	var ekAuthStatus = EKEventStore.authorizationStatusForEntityType(1);
	if (ekAuthStatus == 3) {
		result = true;
		console.log("备忘录权限已经开启");
	} else {
		console.log("备忘录权限没有开启");
	}
	plus.ios.deleteObject(EKEventStore);
	return result;
}

// Android权限查询
function requestAndroidPermission(permissionID) {
	return new Promise((resolve, reject) => {
		plus.android.requestPermissions(
			[permissionID], // 理论上支持多个权限同时查询，但实际上本函数封装只处理了一个权限的情况。有需要的可自行扩展封装
			function(resultObj) {
				var result = 0;
				for (var i = 0; i < resultObj.granted.length; i++) {
					var grantedPermission = resultObj.granted[i];
					console.log('已获取的权限：' + grantedPermission);
					result = 1
				}
				for (var i = 0; i < resultObj.deniedPresent.length; i++) {
					var deniedPresentPermission = resultObj.deniedPresent[i];
					console.log('拒绝本次申请的权限：' + deniedPresentPermission);
					result = 0
				}
				for (var i = 0; i < resultObj.deniedAlways.length; i++) {
					var deniedAlwaysPermission = resultObj.deniedAlways[i];
					console.log('永久拒绝申请的权限：' + deniedAlwaysPermission);
					result = -1
				}
				resolve(result);
				// 若所需权限被拒绝,则打开APP设置界面,可以在APP设置界面打开相应权限
				// if (result != 1) {
				// gotoAppPermissionSetting()
				// }
			},
			function(error) {
				console.log('申请权限错误：' + error.code + " = " + error.message);
				resolve({
					code: error.code,
					message: error.message
				});
			}
		);
	});
}

// 使用一个方法，根据参数判断权限
function judgeIosPermission(permissionID) {
	if (permissionID == "location") {//定位
		return judgeIosPermissionLocation()
	} else if (permissionID == "camera") {//摄像头
		return judgeIosPermissionCamera()
	} else if (permissionID == "photoLibrary") {//相册
		return judgeIosPermissionPhotoLibrary()
	} else if (permissionID == "record") {//麦克风
		return judgeIosPermissionRecord()
	} else if (permissionID == "push") {//推送
		return judgeIosPermissionPush()
	} else if (permissionID == "contact") {//通讯录
		return judgeIosPermissionContact()
	} else if (permissionID == "calendar") {//日历
		return judgeIosPermissionCalendar()
	} else if (permissionID == "memo") {//备忘录
		return judgeIosPermissionMemo()
	}
	return false;
}

// 跳转到**应用**的权限页面
function gotoAppPermissionSetting() {
	if (isIos) {
		var UIApplication = plus.ios.import("UIApplication");
		var application2 = UIApplication.sharedApplication();
		var NSURL2 = plus.ios.import("NSURL");
		// var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");
		var setting2 = NSURL2.URLWithString("app-settings:");
		application2.openURL(setting2);

		plus.ios.deleteObject(setting2);
		plus.ios.deleteObject(NSURL2);
		plus.ios.deleteObject(application2);
	} else {
		// console.log(plus.device.vendor);
		var Intent = plus.android.importClass("android.content.Intent");
		var Settings = plus.android.importClass("android.provider.Settings");
		var Uri = plus.android.importClass("android.net.Uri");
		var mainActivity = plus.android.runtimeMainActivity();
		var intent = new Intent();
		intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
		var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
		intent.setData(uri);
		mainActivity.startActivity(intent);
	}
}

// 检查系统的设备服务是否开启
// var checkSystemEnableLocation = async function () {
function checkSystemEnableLocation() {
	if (isIos) {
		var result = false;
		var cllocationManger = plus.ios.import("CLLocationManager");
		var result = cllocationManger.locationServicesEnabled();
		console.log("系统定位开启:" + result);
		plus.ios.deleteObject(cllocationManger);
		return result;
	} else {
		var context = plus.android.importClass("android.content.Context");
		var locationManager = plus.android.importClass("android.location.LocationManager");
		var main = plus.android.runtimeMainActivity();
		var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
		var result = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
		console.log("系统定位开启:" + result);
		return result
	}
}

module.exports = {
	judgeIosPermission: judgeIosPermission,
	requestAndroidPermission: requestAndroidPermission,
	checkSystemEnableLocation: checkSystemEnableLocation,
	gotoAppPermissionSetting: gotoAppPermissionSetting
}
```

##  使用步骤

```js
//引入模块
import permission from '@/common/js/permission.js';

//ios调用
permision.judgeIosPermission("location");//判断定位权限是否开启
permision.judgeIosPermission("push");//判断推送权限是否开启
permision.judgeIosPermission("camera");//判断摄像头权限是否开启
permision.judgeIosPermission("photoLibrary");//判断相册权限是否开启
permision.judgeIosPermission("record");//判断麦克风权限是否开启
permision.judgeIosPermission("contact");//判断通讯录权限是否开启
permision.judgeIosPermission("calendar");//判断日历权限是否开启
permision.judgeIosPermission("memo");//判断备忘录权限是否开启


//获取Android权限 返回值：-1:被永久拒绝授权 0:未获取授权 1:已获取授权
permission.requestAndroidPermission('android.permission.RECORD_AUDIO');//麦克风权限
permission.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION');//位置权限
permission.requestAndroidPermission('android.permission.ACCESS_COARSE_LOCATION');//模糊位置权限(蓝牙\ble依赖)
permission.requestAndroidPermission('android.permission.CAMERA');//摄像头权限
permission.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE');//外部存储(含相册)读取权限
permission.requestAndroidPermission('android.permission.WRITE_EXTERNAL_STORAGE');//外部存储(含相册)写入权限
permission.requestAndroidPermission('android.permission.READ_CONTACTS	');//通讯录读取权限
permission.requestAndroidPermission('android.permission.WRITE_CONTACTS');//通讯录写入权限
permission.requestAndroidPermission('android.permission.READ_CALENDAR');//日历读取权限
permission.requestAndroidPermission('android.permission.WRITE_CALENDAR');//日历写入权限
permission.requestAndroidPermission('android.permission.READ_SMS');//短信读取权限
permission.requestAndroidPermission('android.permission.SEND_SMS');//短信发送权限
permission.requestAndroidPermission('android.permission.RECEIVE_SMS');//接收新短信权限
permission.requestAndroidPermission('android.permission.READ_PHONE_STATE');//获取手机识别码等信息的权限
permission.requestAndroidPermission('android.permission.CALL_PHONE');//拨打电话权限
permission.requestAndroidPermission('android.permission.READ_CALL_LOG	');//获取通话记录权限

//跳转app应用权限页面
permision.gotoAppPermissionSetting();
```

##  示例

```js
async requestAndroidPermission(permisionID) {
    var result = await permision.requestAndroidPermission(permisionID)
    var strStatus
    if (result == 1) {
        strStatus = "已获得授权"
    } else if (result == 0) {
        strStatus = "未获得授权"
    } else {
        strStatus = "被永久拒绝权限"
    }
    uni.showModal({
        content: permisionID + strStatus,
        showCancel: false
    });
}
```

```js
/* android通知权限查询 */
const main = plus.android.runtimeMainActivity();
const NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
const areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();
```

##  自定义添加Android权限

打开项目的manifest.json文件，点击App模块权限配置，勾选即可

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23b96f80e06f47bd976611b0076c9a3a~tplv-k3u1fbpfcp-zoom-1.image)

如果没有列出需要的权限,也可以自定义添加，打开manifest.json，点击源码视图

```js
"app-plus": {
"distribute": {
  "android": {
    "permissions": [   //这里添加需要的Android权限
        "<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES"/>"
    ]
  },
},
```

##  模块及第三方SDK默认添加权限列表

Bluetooth(低功耗蓝牙)

```js
  "<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />",
  "<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />",
  "<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />",
  "<uses-permission android:name="android.permission.BLUETOOTH" />"
```

Contact(通讯录)

```js
  "<uses-permission android:name="android.permission.GET_ACCOUNTS"/>",
  "<uses-permission android:name="android.permission.WRITE_CONTACTS"/>",
  "<uses-permission android:name="android.permission.READ_CONTACTS"/>"
```

Fingerprint(指纹识别)

```js
  "<uses-permission android:name="android.permission.USE_FINGERPRINT"/>"
```

iBeacon

```js
  "<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />",
  "<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />",
  "<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />",
  "<uses-permission android:name="android.permission.BLUETOOTH" />"
```

Maps(高德地图)

```js
  "<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />",
  "<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />",
  "<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />",
  "<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />",
  "<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />",
  "<uses-permission android:name="android.permission.INTERNET" />",
  "<uses-permission android:name="android.permission.READ_PHONE_STATE" />",
  "<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />",
  "<uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS" />",
  "<uses-permission android:name="android.permission.BLUETOOTH" />",
  "<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />"
```

Maps(百度地图)

```js
  "<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />",
  "<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />",
  "<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />",
  "<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />",
  "<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />",
  "<uses-permission android:name="android.permission.READ_PHONE_STATE" />",
  "<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />",
  "<uses-permission android:name="android.permission.INTERNET"/>",
  "<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />",
  "<uses-permission android:name="android.permission.READ_LOGS" />",
  "<uses-permission android:name="android.permission.WRITE_SETTINGS"/>"
```

Messaging(短彩邮件消息)

```js
  "<uses-permission android:name="android.permission.RECEIVE_SMS"/>",
  "<uses-permission android:name="android.permission.SEND_SMS"/>",
  "<uses-permission android:name="android.permission.WRITE_SMS"/>",
  "<uses-permission android:name="android.permission.READ_SMS"/>"
```

Messaging(短彩邮件消息)

```js
  "<uses-permission android:name="android.permission.RECEIVE_SMS"/>",
  "<uses-permission android:name="android.permission.SEND_SMS"/>",
  "<uses-permission android:name="android.permission.WRITE_SMS"/>",
  "<uses-permission android:name="android.permission.READ_SMS"/>"
```

微信登录

```js
  "<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>"
```

QQ登录

```js
  "<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>"
```

微信支付

```js
  "<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>"
```

Push(消息推送)

```js
  "<uses-permission android:name="android.permission.INTERNET" />",
  "<uses-permission android:name="android.permission.READ_PHONE_STATE" />",
  "<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />",
  "<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />",
  "<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />",
  "<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />",
  "<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />",
  "<uses-permission android:name="android.permission.VIBRATE" />",
  "<uses-permission android:name="android.permission.GET_TASKS" />",
  "<uses-permission android:name="android.permission.BLUETOOTH" />",
  "<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />",
  "<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />",
  "<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />",
  "<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />"
```

微信分享

```js
  "<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>"
```

QQ分享

```js
  "<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>"
```

新浪微博分享

```js
  "<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />",
  "<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />",
  "<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />",
  "<uses-permission android:name="android.permission.INTERNET" />",
  "<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />"
```

百度语音识别

```js
  "<uses-permission android:name="android.permission.RECORD_AUDIO" />",
  "<uses-permission android:name="android.permission.INTERNET" />",
  "<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />",
  "<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />",
  "<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />",
  "<uses-permission android:name="android.permission.READ_PHONE_STATE" />",
  "<uses-permission  android:name="android.permission.WRITE_EXTERNAL_STORAGE" />"
```

讯飞语音识别

```js
  "<uses-permission android:name="android.permission.RECORD_AUDIO" />",
  "<uses-permission android:name="android.permission.INTERNET" />",
  "<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />",
  "<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />",
  "<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />",
  "<uses-permission android:name="android.permission.READ_PHONE_STATE" />",
  "<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />"
```

友盟统计

```js
  "<uses-permission android:name="android.permission.READ_LOGS" />",
  "<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />",
  "<uses-permission android:name="android.permission.RECEIVE_USER_PRESENT" />"
```

##  参考

<https://ext.dcloud.net.cn/plugin?id=594>