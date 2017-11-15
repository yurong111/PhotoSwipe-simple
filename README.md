# PhotoSwipe-simple

[官网文档](http://photoswipe.com/documentation/getting-started.html)
[github](https://github.com/dimsemenov/PhotoSwipe)
photoswipe是一个在web和移动端都支持的图片展示放大缩小功能的组件。
- photoswipe不是一个jquery插件，只需要基本的js即可；
- photoswipe需要预定义图片的宽高；

## 引入组件必须的js以及css
```
    <link rel="stylesheet" href="css/photoswipe.css">
    <link rel="stylesheet" href="css/default-skin.css">
    <script src="js/photoswipe.min.js"></script>
    <script src="js/photoswipe-ui-default.min.js"></script>
```

## 增加class为.pswp的DOM元素
> You can add HTML code dynamically via JS (directly before the initialization), or have it in the page initially (like it's done on the demo page). This code can be appended anywhere, but ideally before the closing </body>. You may reuse it across multiple galleries (as long as you use same UI class).
Order of pswp__bg, pswp__scroll-wrap, pswp__container and pswp__item elements should not be changed.

就是说，可以在body中的任何地方加入以下代码，可是直接在页面中加入，也可以js动态加载。并且有些元素的顺序不能变。总言之，就将官网以下代码片段加入body元素中。

```
    appenHtml: function() {
        var html = ' <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"> \
            <div class="pswp__bg"></div> \
            <div class="pswp__scroll-wrap"> \
                <div class="pswp__container"> \
                    <div class="pswp__item"></div> \
                    <div class="pswp__item"></div> \
                    <div class="pswp__item"></div> \
                </div> \
                <div class="pswp__ui pswp__ui--hidden"> \
                    <div class="pswp__top-bar"> \
                        <div class="pswp__counter"></div> \
                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button> \
                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> \
                        <div class="pswp__preloader"> \
                            <div class="pswp__preloader__icn"> \
                                <div class="pswp__preloader__cut"> \
                                    <div class="pswp__preloader__donut"></div> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> \
                        <div class="pswp__share-tooltip"></div> \
                    </div> \
                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button> \
                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button> \
                    <div class="pswp__caption"> \
                        <div class="pswp__caption__center"></div> \
                    </div> \
                </div> \
            </div> \
        </div> \
        <div id="progress-bar"> \
            <div class="progress"> \
                <div id="bar" class="bar"></div> \
            </div> \
        </div>';

        document.getElementsByTagName("body")[0].innerHTML+=html;
    },
```

我选择了动态的方式载入，目的就是封装一下，方便重用。

## 初始化
> 1.  `.pswp`element from step 2 (it must be added to DOM).
> 2.  PhotoSwipe UI class. If you included default `photoswipe-ui-default.js`, class will be `PhotoSwipeUI_Default`. Can be`false`.
> 3.  Array with objects (slides).
> 4.  [Options](http://photoswipe.com/documentation/options.html).

1. .pswp元素对象；
2. 引用了photoswipe-ui-default.js的，直接传入PhotoSwipeUI_Default；
3. 幻灯片数组，就是图片对象数组，其中对象中包括src、w、h等参数；src资源文件路径；w图片的宽；h图片的高；
4. options 选项参数

```
    _initPhotoSwipe: function(items) {
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var options = {
            history: false,
            focus: false,

            showAnimationDuration: 0,
            hideAnimationDuration: 0

        };

        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    },
```
## 图片宽高适配
其实在官网文档的[Getting Started](http://photoswipe.com/documentation/getting-started.html) 就有现成的案例。我的则是稍有封装了一下，另外对图片宽高适配也做了处理，因为程序本身是事先是不知道图片的宽高的，要想适配每张图片的宽高，那么需要对每张图片进行宽高的读取操作。

官网例子设置幻灯片参数：
```
var items = [
    {
        src: 'https://placekitten.com/600/400',
        w: 600,
        h: 400
    },
    {
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
    }
];
```
我通过对image.onload去将所有的图片加载并读取其宽高进行设置：
```
    openPhotoSwipe: function(imgs) {
        var items = [];
        var i = 0;
        document.getElementById('progress-bar').style.display = 'block'; //显示

        /*加载每张图片*/
        var loadImage = function(imgs) {
            if (i >= imgs.length) { //当所有图片都加载完毕，初始化图片展示组件
                setTimeout(function() {
                    Photoswipe._initPhotoSwipe(items);
                    document.getElementById('progress-bar').style.display = 'none'; //隐藏
                }, 200)
                return;
            }


            // 创建对象
            var img = new Image();
            // 改变图片的src
            img.src = imgs[i];

            img.onload = function(){
                items.push(Photoswipe._getPhotoSwipeItem(img)); //将图片信息对象存入数组中
                i++;
                Photoswipe._setLoading(imgs.length, i);  //更新进度条
                loadImage(imgs);
            };
        }

        loadImage(imgs);
    },

    _getPhotoSwipeItem: function(img) {
        var obj = {};
        obj.src = img.src;
        obj.w = img.width;
        obj.h = img.height;
        return obj;
    },

```
其中设置了一个全局变量i和items，分别用于记录第几张图片已被加载完成以及将被加载完的图片基本信息对象存到items中。通过img.onload中不停回调本身loadImage方法，从而将所有的图片的基本信息都读取，如下代码：
```
            img.onload = function(){
                items.push(Photoswipe._getPhotoSwipeItem(img)); //将图片信息对象存入数组中
                i++;
                Photoswipe._setLoading(imgs.length, i);   //更新进度条
                loadImage(imgs);
            };
```

每次进入loadImage方法，都需要判断图片是否全部加在完成，是则需要初始化Photoswipe插件。以下之所以做了settimeout操作，是因为等待进度条显示到最后才去做初始化操作。
```
          if (i >= imgs.length) { //当所有图片都加载完毕，初始化图片展示组件
                setTimeout(function() {
                    Photoswipe._initPhotoSwipe(items);
                    document.getElementById('progress-bar').style.display = 'none'; //隐藏
                }, 200)
                return;
            }
```

## 对自己封装好的代码使用方式
photoswipe可通过官网或者文章前三步进行使用。官网例子也是很成熟，但是方便自己日后重用，简单封装了一下，并记录如何使用。
![image.png](http://upload-images.jianshu.io/upload_images/5499785-1cb8d6b84d78935f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

以上是文件目录结构，除了框选的图片以及index.js是项目调用所需，其他则是使用封装后的插件所必须引入的。其中带有wr-前缀的则是自己加以封装的代码。而util.js主要是高清方案，如果不需要，则需要修改wr-photoswipe.css的rem单位修改为相应的px单位，不多，主要是进度条的样式而已。

```
window.onload = function() {
    var imgs = [
        'images/test2.jpeg',
        'images/test1.png',
        'http://img1.imgtn.bdimg.com/it/u=107737178,604807193&fm=27&gp=0.jpg',
    ];

    Photoswipe.appenHtml();
    document.getElementById('btn').onclick = Photoswipe.openPhotoSwipe.bind(this, imgs);
}
```
以上就是index.js的全部代码，就是先定义了图片，由于photoswipe插件需要引入一大段html，其都封装在Photoswipe.appenHtml()中了。最后一句主要是监听点击事件展示图片接口调用。
而index.html，不需要写任何和photoswipe相关的代码。

## 效果程序
[访问](http://www.mini123.link:8010/)
![image.png](http://upload-images.jianshu.io/upload_images/5499785-bf19645e59e0b5dd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](http://upload-images.jianshu.io/upload_images/5499785-992d97fca3fbdced.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

