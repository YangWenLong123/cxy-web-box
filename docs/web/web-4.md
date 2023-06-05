# Geolocation API

Geolocation API 是一个用来获取设备地理位置的可编程的对象，它可以让 Web 内容访问到设备的地理位置，这将允许网站或应用基于用户的地理位置提供定制的信息。

## 概念和用法

-   Geolocation API 允许用户向 web 应用程序提供他们的位置。出于隐私考虑，报告地理位置前会先请求用户许可。
-   通常，要在地图上标出用户的位置或显示与用户地理位置相关的个性化信息时，我们需要在 web 应用程序中检索用户的位置信息。
-   Geolocation.getCurrentPosition()：检索设备的当前位置。
-   Geolocation.watchPosition()：注册一个处理函数，在设备位置发生改变时都会自动调用，并返回改变后的位置信息。

## 实现

-   首先需要在代码中请求用户的许可，才可获取到用户的地理位置信息。
-   Geolocation.getCurrentPosition() 方法可以获取设备的当前位置。
-   Geolocation.watchPosition() 方法可以注册一个处理函数，每当设备位置改变时，都会自动调用，并返回改变后的位置信息。
-   Geolocation.clearWatch() 方法用于取消由 watchPosition() 注册的位置监听器。

以下是一个简单的示例代码，其中 getCurrentPosition() 方法获取设备的当前位置，如果检索成功，则在超链接中填充一个可以显示用户位置的 openstreetmap.org 的 URL：

```js
<body>
  <button onclick="getLocation()">获取位置</button>
  <p id="demo"></p>
  <a href="#" id="mapLink" target="_blank">查看地图</a>

  <script>
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        document.getElementById("demo").innerHTML = "该浏览器不支持获取地理位置。";
      }
    }

    function showPosition(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var mapLink = document.getElementById("mapLink");
      mapLink.href = `https://www.openstreetmap.org/#map=18/${lat}/${lon}`;
      mapLink.textContent = `Latitude: ${lat} °, Longitude: ${lon} °`;
    }

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          document.getElementById("demo").innerHTML = "用户拒绝了位置请求。";
          break;
        case error.POSITION_UNAVAILABLE:
          document.getElementById("demo").innerHTML = "位置信息不可用。";
          break;
        case error.TIMEOUT:
          document.getElementById("demo").innerHTML = "请求位置信息超时。";
          break;
        case error.UNKNOWN_ERROR:
          document.getElementById("demo").innerHTML = "发生了未知错误。";
          break;
      }
    }
  </script>
</body>


```