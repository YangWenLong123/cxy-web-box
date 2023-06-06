## 官网地址

<https://uniapp.dcloud.io/component/map>

<https://uniapp.dcloud.io/api/location/location>

## 地图插件配置

<https://ask.dcloud.net.cn/article/29>

## plus内置地图

<https://www.html5plus.org/doc/zh_cn/maps.html>

##  腾讯地图

-   <https://lbs.qq.com/>
-   登录腾讯位置服务平台注册账号，新建应用创建密钥

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5d3c99eac204c95808f40d69d88931e~tplv-k3u1fbpfcp-zoom-1.image)

勾选配置项后点击保存生成对应的密钥。

##   腾讯地图sdk导入项目

```js
var ERROR_CONF = {
	KEY_ERR: 311,
	KEY_ERR_MSG: 'key格式错误',
	PARAM_ERR: 310,
	PARAM_ERR_MSG: '请求参数信息有误',
	SYSTEM_ERR: 600,
	SYSTEM_ERR_MSG: '系统错误',
	WX_ERR_CODE: 1000,
	WX_OK_CODE: 200
};
var BASE_URL = 'https://apis.map.qq.com/ws/';
var URL_SEARCH = BASE_URL + 'place/v1/search';
var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';
var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';
var URL_CITY_LIST = BASE_URL + 'district/v1/list';
var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';
var URL_DISTANCE = BASE_URL + 'distance/v1/';
var EARTH_RADIUS = 6378136.49;
var Utils = {
	location2query(data) {
		if (typeof data == 'string') {
			return data
		}
		var query = '';
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			if (!!query) {
				query += ';'
			}
			if (d.location) {
				query = query + d.location.lat + ',' + d.location.lng
			}
			if (d.latitude && d.longitude) {
				query = query + d.latitude + ',' + d.longitude
			}
		}
		return query
	},
	rad(d) {
		return d * Math.PI / 180.0
	},
	getEndLocation(location) {
		var to = location.split(';');
		var endLocation = [];
		for (var i = 0; i < to.length; i++) {
			endLocation.push({
				lat: parseFloat(to[i].split(',')[0]),
				lng: parseFloat(to[i].split(',')[1])
			})
		}
		return endLocation
	},
	getDistance(latFrom, lngFrom, latTo, lngTo) {
		var radLatFrom = this.rad(latFrom);
		var radLatTo = this.rad(latTo);
		var a = radLatFrom - radLatTo;
		var b = this.rad(lngFrom) - this.rad(lngTo);
		var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) *
			Math.pow(Math.sin(b / 2), 2)));
		distance = distance * EARTH_RADIUS;
		distance = Math.round(distance * 10000) / 10000;
		return parseFloat(distance.toFixed(0))
	},
	getWXLocation(success, fail, complete) {
		wx.getLocation({
			type: 'gcj02',
			success: success,
			fail: fail,
			complete: complete
		})
	},
	getLocationParam(location) {
		if (typeof location == 'string') {
			var locationArr = location.split(',');
			if (locationArr.length === 2) {
				location = {
					latitude: location.split(',')[0],
					longitude: location.split(',')[1]
				}
			} else {
				location = {}
			}
		}
		return location
	},
	polyfillParam(param) {
		param.success = param.success || function() {};
		param.fail = param.fail || function() {};
		param.complete = param.complete || function() {}
	},
	checkParamKeyEmpty(param, key) {
		if (!param[key]) {
			var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');
			param.fail(errconf);
			param.complete(errconf);
			return true
		}
		return false
	},
	checkKeyword(param) {
		return !this.checkParamKeyEmpty(param, 'keyword')
	},
	checkLocation(param) {
		var location = this.getLocationParam(param.location);
		if (!location || !location.latitude || !location.longitude) {
			var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');
			param.fail(errconf);
			param.complete(errconf);
			return false
		}
		return true
	},
	buildErrorConfig(errCode, errMsg) {
		return {
			status: errCode,
			message: errMsg
		}
	},
	handleData(param, data, feature) {
		if (feature === 'search') {
			var searchResult = data.data;
			var searchSimplify = [];
			for (var i = 0; i < searchResult.length; i++) {
				searchSimplify.push({
					id: searchResult[i].id || null,
					title: searchResult[i].title || null,
					latitude: searchResult[i].location && searchResult[i].location.lat || null,
					longitude: searchResult[i].location && searchResult[i].location.lng || null,
					address: searchResult[i].address || null,
					category: searchResult[i].category || null,
					tel: searchResult[i].tel || null,
					adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null,
					city: searchResult[i].ad_info && searchResult[i].ad_info.city || null,
					district: searchResult[i].ad_info && searchResult[i].ad_info.district || null,
					province: searchResult[i].ad_info && searchResult[i].ad_info.province || null
				})
			}
			param.success(data, {
				searchResult: searchResult,
				searchSimplify: searchSimplify
			})
		} else if (feature === 'suggest') {
			var suggestResult = data.data;
			var suggestSimplify = [];
			for (var i = 0; i < suggestResult.length; i++) {
				suggestSimplify.push({
					adcode: suggestResult[i].adcode || null,
					address: suggestResult[i].address || null,
					category: suggestResult[i].category || null,
					city: suggestResult[i].city || null,
					district: suggestResult[i].district || null,
					id: suggestResult[i].id || null,
					latitude: suggestResult[i].location && suggestResult[i].location.lat || null,
					longitude: suggestResult[i].location && suggestResult[i].location.lng || null,
					province: suggestResult[i].province || null,
					title: suggestResult[i].title || null,
					type: suggestResult[i].type || null
				})
			}
			param.success(data, {
				suggestResult: suggestResult,
				suggestSimplify: suggestSimplify
			})
		} else if (feature === 'reverseGeocoder') {
			var reverseGeocoderResult = data.result;
			var reverseGeocoderSimplify = {
				address: reverseGeocoderResult.address || null,
				latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null,
				longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null,
				adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null,
				city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null,
				district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null,
				nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null,
				province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null,
				street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null,
				street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number ||
					null,
				recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend ||
					null,
				rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null
			};
			if (reverseGeocoderResult.pois) {
				var pois = reverseGeocoderResult.pois;
				var poisSimplify = [];
				for (var i = 0; i < pois.length; i++) {
					poisSimplify.push({
						id: pois[i].id || null,
						title: pois[i].title || null,
						latitude: pois[i].location && pois[i].location.lat || null,
						longitude: pois[i].location && pois[i].location.lng || null,
						address: pois[i].address || null,
						category: pois[i].category || null,
						adcode: pois[i].ad_info && pois[i].ad_info.adcode || null,
						city: pois[i].ad_info && pois[i].ad_info.city || null,
						district: pois[i].ad_info && pois[i].ad_info.district || null,
						province: pois[i].ad_info && pois[i].ad_info.province || null
					})
				}
				param.success(data, {
					reverseGeocoderResult: reverseGeocoderResult,
					reverseGeocoderSimplify: reverseGeocoderSimplify,
					pois: pois,
					poisSimplify: poisSimplify
				})
			} else {
				param.success(data, {
					reverseGeocoderResult: reverseGeocoderResult,
					reverseGeocoderSimplify: reverseGeocoderSimplify
				})
			}
		} else if (feature === 'geocoder') {
			var geocoderResult = data.result;
			var geocoderSimplify = {
				title: geocoderResult.title || null,
				latitude: geocoderResult.location && geocoderResult.location.lat || null,
				longitude: geocoderResult.location && geocoderResult.location.lng || null,
				adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null,
				province: geocoderResult.address_components && geocoderResult.address_components.province || null,
				city: geocoderResult.address_components && geocoderResult.address_components.city || null,
				district: geocoderResult.address_components && geocoderResult.address_components.district || null,
				street: geocoderResult.address_components && geocoderResult.address_components.street || null,
				street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null,
				level: geocoderResult.level || null
			}
			param.success(data, {
				geocoderResult: geocoderResult,
				geocoderSimplify: geocoderSimplify
			})
		} else if (feature === 'getCityList') {
			var provinceResult = data.result[0];
			var cityResult = data.result[1];
			var districtResult = data.result[2];
			param.success(data, {
				provinceResult: provinceResult,
				cityResult: cityResult,
				districtResult: districtResult
			})
		} else if (feature === 'getDistrictByCityId') {
			var districtByCity = data.result[0];
			param.success(data, districtByCity)
		} else if (feature === 'calculateDistance') {
			var calculateDistanceResult = data.result.elements;
			var distance = [];
			for (var i = 0; i < calculateDistanceResult.length; i++) {
				distance.push(calculateDistanceResult[i].distance)
			}
			param.success(data, {
				calculateDistanceResult: calculateDistanceResult,
				distance: distance
			})
		} else {
			param.success(data)
		}
	},
	buildWxRequestConfig(param, options, feature) {
		var that = this;
		options.header = {
			"content-type": "application/json"
		};
		options.method = 'GET';
		options.success = function(res) {
			var data = res.data;
			if (data.status === 0) {
				that.handleData(param, data, feature)
			} else {
				param.fail(data)
			}
		};
		options.fail = function(res) {
			res.statusCode = ERROR_CONF.WX_ERR_CODE;
			param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg))
		};
		options.complete = function(res) {
			var statusCode = +res.statusCode;
			switch (statusCode) {
				case ERROR_CONF.WX_ERR_CODE:
					{
						param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
						break
					}
				case ERROR_CONF.WX_OK_CODE:
					{
						var data = res.data;
						if (data.status === 0) {
							param.complete(data)
						} else {
							param.complete(that.buildErrorConfig(data.status, data.message))
						}
						break
					}
				default:
					{
						param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG))
					}
			}
		}
		return options
	},
	locationProcess(param, locationsuccess, locationfail, locationcomplete) {
		var that = this;
		locationfail = locationfail || function(res) {
			res.statusCode = ERROR_CONF.WX_ERR_CODE;
			param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg))
		};
		locationcomplete = locationcomplete || function(res) {
			if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {
				param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg))
			}
		};
		if (!param.location) {
			that.getWXLocation(locationsuccess, locationfail, locationcomplete)
		} else if (that.checkLocation(param)) {
			var location = Utils.getLocationParam(param.location);
			locationsuccess(location)
		}
	}
};
class QQMapWX {
	constructor(options) {
		if (!options.key) {
			throw Error('key值不能为空')
		}
		this.key = options.key
	};
	search(options) {
		var that = this;
		options = options || {};
		Utils.polyfillParam(options);
		if (!Utils.checkKeyword(options)) {
			return
		}
		var requestParam = {
			keyword: options.keyword,
			orderby: options.orderby || '_distance',
			page_size: options.page_size || 10,
			page_index: options.page_index || 1,
			output: 'json',
			key: that.key
		};
		if (options.address_format) {
			requestParam.address_format = options.address_format
		}
		if (options.filter) {
			requestParam.filter = options.filter
		}
		var distance = options.distance || "1000";
		var auto_extend = options.auto_extend || 1;
		var region = null;
		var rectangle = null;
		if (options.region) {
			region = options.region
		}
		if (options.rectangle) {
			rectangle = options.rectangle
		}
		var locationsuccess = function(result) {
			if (region && !rectangle) {
				requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude +
					")"
			} else if (rectangle && !region) {
				requestParam.boundary = "rectangle(" + rectangle + ")"
			} else {
				requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend +
					")"
			}
			wx.request(Utils.buildWxRequestConfig(options, {
				url: URL_SEARCH,
				data: requestParam
			}, 'search'))
		};
		Utils.locationProcess(options, locationsuccess)
	};
	getSuggestion(options) {
		var that = this;
		options = options || {};
		Utils.polyfillParam(options);
		if (!Utils.checkKeyword(options)) {
			return
		}
		var requestParam = {
			keyword: options.keyword,
			region: options.region || '全国',
			region_fix: options.region_fix || 0,
			policy: options.policy || 0,
			page_size: options.page_size || 10,
			page_index: options.page_index || 1,
			get_subpois: options.get_subpois || 0,
			output: 'json',
			key: that.key
		};
		if (options.address_format) {
			requestParam.address_format = options.address_format
		}
		if (options.filter) {
			requestParam.filter = options.filter
		}
		if (options.location) {
			var locationsuccess = function(result) {
				requestParam.location = result.latitude + ',' + result.longitude;
				wx.request(Utils.buildWxRequestConfig(options, {
					url: URL_SUGGESTION,
					data: requestParam
				}, "suggest"))
			};
			Utils.locationProcess(options, locationsuccess)
		} else {
			wx.request(Utils.buildWxRequestConfig(options, {
				url: URL_SUGGESTION,
				data: requestParam
			}, "suggest"))
		}
	};
	reverseGeocoder(options) {
		var that = this;
		options = options || {};
		Utils.polyfillParam(options);
		var requestParam = {
			coord_type: options.coord_type || 5,
			get_poi: options.get_poi || 0,
			output: 'json',
			key: that.key
		};
		if (options.poi_options) {
			requestParam.poi_options = options.poi_options
		}
		var locationsuccess = function(result) {
			requestParam.location = result.latitude + ',' + result.longitude;
			wx.request(Utils.buildWxRequestConfig(options, {
				url: URL_GET_GEOCODER,
				data: requestParam
			}, 'reverseGeocoder'))
		};
		Utils.locationProcess(options, locationsuccess)
	};
	geocoder(options) {
		var that = this;
		options = options || {};
		Utils.polyfillParam(options);
		if (Utils.checkParamKeyEmpty(options, 'address')) {
			return
		}
		var requestParam = {
			address: options.address,
			output: 'json',
			key: that.key
		};
		if (options.region) {
			requestParam.region = options.region
		}
		wx.request(Utils.buildWxRequestConfig(options, {
			url: URL_GET_GEOCODER,
			data: requestParam
		}, 'geocoder'))
	};
	getCityList(options) {
		var that = this;
		options = options || {};
		Utils.polyfillParam(options);
		var requestParam = {
			output: 'json',
			key: that.key
		};
		wx.request(Utils.buildWxRequestConfig(options, {
			url: URL_CITY_LIST,
			data: requestParam
		}, 'getCityList'))
	};
	getDistrictByCityId(options) {
		var that = this;
		options = options || {};
		Utils.polyfillParam(options);
		if (Utils.checkParamKeyEmpty(options, 'id')) {
			return
		}
		var requestParam = {
			id: options.id || '',
			output: 'json',
			key: that.key
		};
		wx.request(Utils.buildWxRequestConfig(options, {
			url: URL_AREA_LIST,
			data: requestParam
		}, 'getDistrictByCityId'))
	};
	calculateDistance(options) {
		var that = this;
		options = options || {};
		Utils.polyfillParam(options);
		if (Utils.checkParamKeyEmpty(options, 'to')) {
			return
		}
		var requestParam = {
			mode: options.mode || 'walking',
			to: Utils.location2query(options.to),
			output: 'json',
			key: that.key
		};
		if (options.from) {
			options.location = options.from
		}
		if (requestParam.mode == 'straight') {
			var locationsuccess = function(result) {
				var locationTo = Utils.getEndLocation(requestParam.to);
				var data = {
					message: "query ok",
					result: {
						elements: []
					},
					status: 0
				};
				for (var i = 0; i < locationTo.length; i++) {
					data.result.elements.push({
						distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng),
						duration: 0,
						from: {
							lat: result.latitude,
							lng: result.longitude
						},
						to: {
							lat: locationTo[i].lat,
							lng: locationTo[i].lng
						}
					})
				}
				var calculateResult = data.result.elements;
				var distanceResult = [];
				for (var i = 0; i < calculateResult.length; i++) {
					distanceResult.push(calculateResult[i].distance)
				}
				return options.success(data, {
					calculateResult: calculateResult,
					distanceResult: distanceResult
				})
			};
			Utils.locationProcess(options, locationsuccess)
		} else {
			var locationsuccess = function(result) {
				requestParam.from = result.latitude + ',' + result.longitude;
				wx.request(Utils.buildWxRequestConfig(options, {
					url: URL_DISTANCE,
					data: requestParam
				}, 'calculateDistance'))
			};
			Utils.locationProcess(options, locationsuccess)
		}
	}
};
module.exports = QQMapWX;
```

##   引入项目

```js
const QQMapWX = require('@/common/js/qqmap-wx-jssdk.min.js');

//这里的key值就是你申请的密钥
this.qqmapsdk = new QQMapWX({
  key: this.key
});
```

##   测试demo

```js
<template>
	<view class="container">
		<view class="header-box">
			<view class="result-box">
				<view class="info list-item">
					<view class="badge"></view>
					<view class="ellipsis">{{address}}</view>
				</view>
				<view class="info">
					<view class="badge orange"></view>
					<view class="ellipsis"> {{current_long + "," + current_lat}}</view>
				</view>
			</view>
		</view>

		<map
			id="maps"
			:longitude="longitude"
			:latitude="latitude"
			:scale="16"
			show-location
			@regionchange="regionchange"
			@moveToLocation="fnMoveToLocation"
		>
			<cover-image class="cover-image" src="../../static/images//location.png" />
		</map>
	</view>
</template>

<script>
	const QQMapWX = require('@/common/js/qqmap-wx-jssdk.min.js');
	export default {
		data() {
			return {
				address: "正在获取地址...",
				longitude: 120.1887611219618,
				latitude: 30.19322157118055,
				current_long: 120.1887611219618,
				current_lat: 30.19322157118055,
				key: 'WL7BZ-TBAW3-7CB3K-YFHND-YTAJ3-5OF4F',
				mapCtx: null,
				location: false,
				qqmapsdk: null,
				mapObj: null
			}
		},
		onLoad() {
			this.qqmapsdk = new QQMapWX({
				key: this.key
			});
			this.currentLocation()
		},
		onReady() {
			// #ifdef APP-PLUS
			if (!this.mapCtx) {
				this.mapCtx = uni.createMapContext("maps");
			}
			this.mapObj = this.mapCtx.$getAppMap();
			this.mapObj.onstatuschanged = (e) => {
				// 地图发生变化的时候，获取中间点，也就是cover-image指定的位置
				if (this.longitude != 114.010857) {
					this.address = "正在获取地址...";
					this.mapCtx.getCenterLocation({
						type: 'gcj02',
						success: (res) => {
							this.current_long = res.latitude;
							this.current_lat = res.longitude;
							this.getAddress(res.longitude, res.latitude);
						}
					})
				}
			}
			//测试
			// #endif
		},
		methods: {
			// 地图发生变化的时候，获取中间点，也就是cover-image指定的位置
			regionchange(e) {
				console.log(e,'1');
				if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
					this.address = "正在获取地址...";
					if (!this.mapCtx) {
						this.mapCtx = uni.createMapContext("maps");
					}
					this.mapCtx.getCenterLocation({
						type: 'gcj02',
						success: (res) => {
							console.log(res)
							this.latitude = res.latitude;
							this.longitude = res.longitude;
							this.getAddress(res.longitude, res.latitude);
						}
					})
				}
			},
			//根据经纬度获取地址信息
			getAddress: function(lng, lat) {
				this.qqmapsdk.reverseGeocoder({
					location: {
						latitude: lat,
						longitude: lng
					},
					success: (res) => {
						console.log(res)
						this.address = res.result.formatted_addresses.recommend
					},
					fail: (res) => {
						this.address = "获取位置信息失败"
					}
				})
			},
			//当前位置
			currentLocation() {
				const that = this;
				uni.getLocation({
					type: 'gcj02',
					success(res) {
						console.log(res);
						that.latitude = res.latitude;
						that.longitude = res.longitude;
					}
				})
			},
			//将地图中心移动到当前定位点
			fnMoveToLocation (e) {

			}
		}
	}
</script>

<style>
	/* pages/location/location.wxss */

	page {
		height: 100%;
	}

	.container {
		width: 100%;
		height: 100%;
	}

	#maps {
		width: 100%;
		height: 100%;
	}

	.cover-image {
		height: 60upx;
		width: 60upx;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -30upx;
		margin-left: -30upx;
	}

	.header-box {
		width: 100%;
		padding-top: 8upx;
		box-sizing: border-box;
		border-radius: 24upx;
	}

	.result-box {
		width: 100%;
		padding: 12upx 30upx;
		box-sizing: border-box;
		color: #555;
		font-size: 28upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: #fff;
		border-radius: 24upx;
	}

	.list-item::after {
		left: 0;
	}

	.badge {
		height: 16upx;
		width: 16upx;
		border-radius: 8upx;
		background: #5677fc;
		margin-right: 20upx;
		flex-shrink: 0;
	}

	.orange {
		background: #ff7900 !important;
	}

	.info {
		display: flex;
		align-items: center;
		padding: 20upx 0;
	}

	.ellipsis {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.current-location {
		position: fixed;
		height: 76upx;
		width: 76upx;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 80upx;
		right: 60upx;
		background: rgba(255, 255, 255, 0.94);
		border-radius: 38upx;
	}

	.current-img {
		width: 42upx;
		height: 42upx;
	}
</style>
```

##   ios配置项

```js
"ios" : {
  "urlschemewhitelist": [
    "qqmap"
  ]
}
```

#  高德地图

##   高德地图开放平台

<https://lbs.amap.com/>

##   申请ios平台与android平台的appkey值

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18c78857c56d4a40b8cd45b631eb4c7e~tplv-k3u1fbpfcp-zoom-1.image)

##   在应用中进行配置

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e772c80d0f8a43af9895003b84acffde~tplv-k3u1fbpfcp-zoom-1.image)

##   应用权限配置

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b698f4df1324af48cc8977f86667b43~tplv-k3u1fbpfcp-zoom-1.image)

##   sdk申请

<https://lbs.amap.com/api/>
