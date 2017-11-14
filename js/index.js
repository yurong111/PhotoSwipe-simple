window.onload = function() {
    /*图片展示*/
    var openPhotoSwipe = function() {
        var imgs = [
            'images/test2.jpeg',
            'images/test1.png',
            'http://img1.imgtn.bdimg.com/it/u=107737178,604807193&fm=27&gp=0.jpg',
            // 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
            // 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg'
        ]
        // build items array
        loadImage(imgs);
    };

    var items = [];
    var i = 0;

    /*加载每张图片*/
    var loadImage = function(imgs) {
        if (i >= imgs.length) { //当所有图片都加载完毕，初始化图片展示组件
            setTimeout(function() {
                initPhotoSwipe(items);
            }, 500)
            return;
        }
        // 创建对象
        var img = new Image();
        // 改变图片的src
        img.src = imgs[i];

        img.onload = function(){
            console.log('***');
            items.push(getPhotoSwipeItem(img)); //将图片信息对象存入数组中
            i++;
            setLoading(imgs.length, i);
            loadImage(imgs);
        };

        return items;
    }

    openPhotoSwipe();

    document.getElementById('btn').onclick = openPhotoSwipe;


}

/*获取每张图片的基础信息*/
function getPhotoSwipeItem(img) {
    var obj = {};
    obj.src = img.src;
    obj.w = img.width;
    obj.h = img.height;
    return obj;
}

/*初识化PhotoSwipe组件*/
function initPhotoSwipe(items) {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var options = {
        history: false,
        focus: false,

        showAnimationDuration: 0,
        hideAnimationDuration: 0

    };

    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
}


function setLoading(len, index) {
    var bar = document.getElementById('bar');
    bar.style.width = index/len*100 + '%';
    console.log('pWidth', index/len);
}

