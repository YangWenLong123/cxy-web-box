## 前言

有时候我们需要在同一个域名下部署多个项目，这个时候就需要配置二级目录，二级目录也叫做子目录，实际就是在根目录下建立一个文件夹。

例如,这三个地址中域名都是一样的，只是后面的二级目录不一样

- http://www.along.ink/a
- http://www.along.ink/b
- http://www.along.ink/b

## 配置

通过别名匹配， `location /cms`要放在`location /`的上面.

```js
location /cms {
  alias /www/wwwroot/xyz.alongweb.top/cms;
  try_files $uri $uri/ /cms/index.html;
  index index.html index.htm index.htm.gz;
  add_header Cache-Control "public, max-age=86400";
}
```
