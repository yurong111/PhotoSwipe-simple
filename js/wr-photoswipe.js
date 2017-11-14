

Photoswipe = {
    _appenHtml: function() {
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

        $('body').append(html);
    },

    openPhotoSwipe: function(imgs) {
        var items = [];
        var i = 0;
        Photoswipe._appenHtml();
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
                Photoswipe._setLoading(imgs.length, i);
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


    _setLoading: function(len, index) {
        var bar = document.getElementById('bar');
        bar.style.width = index/len*100 + '%';
    }

}