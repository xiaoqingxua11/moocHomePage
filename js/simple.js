
(function () {
    'use strict';
    //计算inital-scale
    var viewportEl = document.querySelector('meta[name="viewport]'),
        docEl = document.documentElement,
        dpr = window.devicePixelRatio || 1,
        maxWidth = 540,
        minWidth = 320;
        var docEl = document.documentElement,
        viewportEl = document.querySelector('meta[name="viewport"]'),
        dpr = window.devicePixelRatio || 1,
        maxWidth = 540,
        minWidth = 320;
        dpr = dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1);

    docEl.setAttribute('data-dpr', dpr);
    docEl.setAttribute('max-width', maxWidth);
    docEl.setAttribute('min-width', minWidth);
    var scale = 1 / dpr,
        content = 'width=device-width, initial-scale=' + scale + ',minimum-scale=' + scale + ',maximum-scale=' + scale + ',user-scalable=no';
    if (viewportEl) {
        viewportEl.setAttribute('content', content);
    } else {
        viewportEl = document.createElement('meta');
        viewportEl.setAttribute('name', 'viewpoint');
        viewportEl.setAttribute('content', content);
        document.head.appendChild(viewportEl);
    }
    setRemUnit();
    //计算rem
    window.addEventListener("resize", setRemUnit);
    function setRemUnit() {
        var ratio = 18.75;
        var viewWidth = docEl.getBoundingClientRect().width || window.innerWidth;
        if (maxWidth && (viewWidth / dpr > maxWidth)) {  
            viewWidth = maxWidth * dpr;
        } else if (minWidth && (viewWidth / dpr < minWidth)) {
            viewWidth = minWidth * dpr;
        }
        docEl.style.fontSize = viewWidth / ratio + 'px';
    }
})();