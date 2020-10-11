// 轮播控制器
function Slider(el, options) {
    //默认参数
    var defaults = {
        initIndex: 0,
        speed: 300,
        hasIndicator: false
    };
    this.options = {};
    //参数选择
    this.options.initIndex = typeof options.initIndex !== 'undefined' ? options.initIndex : defaults.initIndex;
    this.options.speed = typeof options.speed !== 'undefined' ? options.speed : defaults.speed;
    this.options.hasIndicator = typeof options.hasIndicator !== 'undefined' ? options.hasIndicator : defaults.hasIndicator;
    //挂在DOM
    this.el = el;
    this.itemContainer = el.querySelector('.slider-item-container');
    this.items = this.itemContainer.children;
    this.distancePerSlide = (this.items[0].offsetWidth - 200) / 2;
    console.log(this.distancePerSlide)
    this.minIndex = 0;
    this.maxIndex = this.items.length - 1;
    //   修改默认索引
    this.index = this._adjustIndex(this.options.initIndex);
    //   移动到对应的距离
    this.move(this.getDistanceByIndex(this.index));
    if (this.options.hasIndicator) {
        this._createIndicators();
        this._setIndicatorActive(this.index)
    }
}
//到第几章图片
Slider.prototype.to = function (index,cb) {
    this.index = index;
    this._setTransitionSpeed(this.options.speed);
    this.move(this.getDistanceByIndex(this.index));
    var _this = this;
    this.itemContainer.addEventListener('transitionend', function () {
        _this._setTransitionSpeed(0)
        if(typeof cb==='function'){
            cb();
        }
    });
    if (this.options.hasIndicator) {
        this._setIndicatorActive(this.index);
    }
};
Slider.prototype._setTransitionSpeed = function (speed) {
    this.itemContainer.style.transitionDuration = speed + 'ms';
}
//上一张
Slider.prototype.prev = function (cb) {
    this.to(this.index - 1,cb);
};
//下一章
Slider.prototype.next = function (cb) {
    this.to(this.index + 1,cb)
};
//次改默认缩影
Slider.prototype._adjustIndex = function (index) {
    if (index < this.minIndex) {
        index = this.minIndex;
    }
    if (index > this.maxIndex) {
        index = this.maxIndex;
    }
    return index;
};
// 移动相应的距离
Slider.prototype.move = function (distance) {
    this.itemContainer.style.transform = 'translate3d(' + distance / 20 + 'rem,0,0)';
};
// 获取移动的距离
Slider.prototype.getDistanceByIndex = function (index) {
    return -index * this.distancePerSlide;
};
//创建知识器
Slider.prototype._createIndicators = function () {
    var indicatorContainer = document.createElement('div');
    var html = '';
    indicatorContainer.className = 'slider-indicator-container';
    for (let i = 0; i <= this.maxIndex; i++) {
        html += '<span class="slider-indicator"></span>';
    }
    indicatorContainer.innerHTML = html;
    this.el.appendChild(indicatorContainer);
};
//设置高亮
Slider.prototype._setIndicatorActive = function (index) {
    this.indicators = this.indicators || this.el.querySelectorAll('.slider-indicator');
    for (var i = 0; i < this.indicators.length; i++) {
        this.indicators[i].classList.remove
            ('slider-indicator-active');
    }
    this.indicators[index].classList.add('slider-indicator-active');
};
Slider.prototype.getItemContainer=function(){
    return this.itemContainer;
}
Slider.prototype.getIndex=function(){
    return this.index;
}
Slider.prototype.getDistancePerSlider=function(){
    console.log("aaa"+this.distancePerSlide)
    return this.distancePerSlide;
}
