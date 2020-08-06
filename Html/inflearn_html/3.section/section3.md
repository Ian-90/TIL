# 1. 그룹화와 섹셔닝

* html5 이전에는 div로 layout을 잡았었음.
* html5 부터는 섹셔닝 요소를 활용(i.e9 부터 지원)
  * section
  * article
  * nav
  * aside
  * 섹셔닝 요소는 아니지만 섹셔닝에 활용
    * header
    * footer

* [html5shiv](https://github.com/aFarkas/html5shiv) - html5를 지원하지 않는 것들을 지원해주는 것.
* 만일 IE9보다 낮으면 script를 동작해라.
```html
<!--[if lt IE 9]>
<script src="url"></script>
<![endif]-->
```
