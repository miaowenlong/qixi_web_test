
var container = $("#content");

var visualHeight = container.height();
var visualWidth = container.width();
var swipe = Swipe(container);

//获取数据
var getValue = function (className) {
    var $elem = $('' + className + '');
    // 走路的路线坐标
    return {
        height: $elem.height(),
        top: $elem.position().top
    };
};

//路的Y周
var pathY = function () {
    var data = getValue('.a_background_middle');
    return data.top + data.height / 2;
}();

var $boy = $("#boy");
var boyHeight = $boy.height();

$boy.css({
    top: pathY - boyHeight + 25
});


