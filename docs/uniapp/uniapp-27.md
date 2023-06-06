## 官方文档

<https://uniapp.dcloud.io/api/plugins/login?id=login>

## 授权登录配置

<https://ask.dcloud.net.cn/article/192>

## 微信，QQ，苹果登录

获取服务商通道只与项目配置的登录有关，与手机是否安装app无关。

```js
const self = this;

uni.getProvider({
  service: 'oauth',
  success: function (res) {
    console.log(res.provider)

    if(type == 'wx' && ~res.provider.indexOf('weixin')) {
      plus.oauth.getServices(servies => {
        const provide = servies.reduce((cur,next) => {
          cur.push(next.id);
          return cur;
        },[]);
        const aweixin = servies[provide.indexOf('weixin')];

        aweixin.authorize(res => {
          console.log('login weixin success:', res.code);
					//TODO
        }, err => {
          console.error('授权登录失败：' + JSON.stringify(err));
        })
      })
    } else if (type == 'qq' && ~res.provider.indexOf('qq')) {
      uni.login({
        provider: 'qq',
        success: (res) => {
          console.log('login qq success:', res);
          //TODO
        },
        fail: (err) => {
          console.error('授权登录失败：' + JSON.stringify(err));
        }
      });
    } else if (type == 'apple' && ~res.provider.indexOf('apple')) {
      plus.oauth.getServices(servies => {
        const provide = servies.reduce((cur,next) => {
          cur.push(next.id);
          return cur;
        },[]);
        const apple = servies[provide.indexOf('apple')];

        apple.logout(res => {
          console.log('Apple注销登录成功：' + JSON.stringify(res));
        }, err => {
          console.log('Apple注销登录失败：' + JSON.stringify(err));
        });
      })

      setTimeout(() => {
      	uni.login({
          provider: 'apple',
          success: (res) => {
            console.log('login apple success:', res);
            //TODO
          },
          fail: (err) => {
            console.error('授权登录失败：' + JSON.stringify(err));
          }
        });
      }, 100)
    } else {
      uni.showToast({
        title: '获取服务供应商异常',
        icon: 'none'
      })
    }
  }
});
```

注意: 苹果登录后退出登录需要需要调用logout方法注销登录.

## 微博登录

```js
uni.login({
  provider: 'sinaweibo',
  success: (res) => {
    uni.getUserInfo({
      provider: 'sinaweibo',
      success: (infoRes) => {
        /**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
        console.log({infoRes: infoRes})
        uni.showToast({
          title: JSON.stringify(infoRes.userInfo),
          icon: 'none',
          duration: 5000
        })
      },
      fail() {
        uni.showToast({
          icon: 'none',
          title: '登陆失败'
        });
      }
    });
  },
  fail: (err) => {
    console.error('授权登录失败：' + JSON.stringify(err));
  }
});
```

## 手机号验证码登录

思路：全局存储登录状态，可以在app.vue和vuex中同时存储。登录成功后，改变状态即可。在登录时，需要向服务端存储token和clientid，可以使用下方api,也可以后端去生成，保证唯一性。

```js
plus.push.getClientInfo();

{
	"appid": "pPyZWvH3Fa6PXba10aJ009",
	"appkey": "b7dOGlNPHR7pqwUxDhpTi4",
	"clientid": "f7e413264992ca1e18e2b99c2d4fafd4",
	"id": "unipush",
	"token": "dd08a0f18e7ed6a2343df54a3eb18b768b3821662815d4b2c4b31ae5934ca638"
}
```

## 一键登录

<https://ask.dcloud.net.cn/article/37965>

<https://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.UniverifyStyles>

## Ios苹果授权登录

<https://www.wangquanwei.com/549.html>

[注意](https://mp.weixin.qq.com/s/BpjWbFyDRNcUs8BpFj46Ag?st=DD0CE7A04E82E517747D01D4AA92F79E2250AE810F2A6B0DA6C662B1D13B710F5928848FAFFEE8D3A09C442CD5937E1A52C0C0672F35A5F1AA9CAF8B2EF48D5FC211C401950C791DA212DA051826D64782076EDA0EABF6FF0B484F307EEB9FA2777DFD4AD59ED738B97BF554E894977BF96D28D5C392BD76C693B80FEF83F383256486620613FFC63D6C917215F511E8&vid=1688851216491959&cst=39F7B8D7D3378E51EF37F58EA41A8F764F9721B35D8D5120DF8DE3D222E9157F1FA3B22F1A3907A7CF54724889DD08EC&deviceid=2ea7e9fb-6569-41ce-bd90-d779cf705f7e&version=3.0.30.6155&platform=mac)

## 注销登录

```js
//weixin
plus.oauth.getServices(servies => {
  const provide = servies.reduce((cur,next) => {
    cur.push(next.id);
    return cur;
  },[]);
  const aweixin = servies[provide.indexOf('weixin')];

  aweixin.logout(res => {
    console.log('微信注销登录成功：' + JSON.stringify(res));
  }, err => {
    console.log('微信注销登录失败：' + JSON.stringifys(err));
  });
})

//qq
plus.oauth.getServices(servies => {
  const provide = servies.reduce((cur,next) => {
    cur.push(next.id);
    return cur;
  },[]);
  const aqq = servies[provide.indexOf('qq')];

  aqq.logout(res => {
    console.log('QQ注销登录成功：' + JSON.stringify(res));
  }, err => {
    console.log('QQ注销登录失败：' + JSON.stringify(err));
  });
})

//apple
plus.oauth.getServices(servies => {
  const provide = servies.reduce((cur,next) => {
    cur.push(next.id);
    return cur;
  },[]);
  const apple = servies[provide.indexOf('apple')];

  apple.logout(res => {
    console.log('Apple注销登录成功：' + JSON.stringify(res));
  }, err => {
    console.log('Apple注销登录失败：' + JSON.stringify(err));
  });
})
```