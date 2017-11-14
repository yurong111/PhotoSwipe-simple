/*!function(a,b){
    var c=a.documentElement,d="orientationchange"in window?"orientationchange":"resize",
        e=function(){
            var w=document.documentElement.clientHeight >= document.documentElement.clientWidth?640:1136
            var a=c.clientWidth>w?w:c.clientWidth<320?320:c.clientWidth;
            a&&(c.style.fontSize=100*(a/w)+"px")
        };
    a.addEventListener&&(b.addEventListener(d,e,!1),a.addEventListener("DOMContentLoaded",e,!1),e())
}(document,window);*/

//给html模板使用
String.prototype.tmp = function(obj) {
    return this.replace(/\$\w+\$/g, function(matchs) {
        var returns = obj[matchs.replace(/\$/g, "")];
        return (returns + "") == "undefined"? "": returns;
    });
};

(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false, recalc());
})(document, window);

