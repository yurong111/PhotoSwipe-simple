window.onload = function() {
    var imgs = [
        'images/test2.jpeg',
        'images/test1.png',
        'http://img1.imgtn.bdimg.com/it/u=107737178,604807193&fm=27&gp=0.jpg',
    ];
    Photoswipe.appenHtml();
    document.getElementById('btn').onclick = Photoswipe.openPhotoSwipe.bind(this, imgs);
}

