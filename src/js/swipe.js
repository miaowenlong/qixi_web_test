/**
 * Created by acer on 2017/8/9.
 */
function swipe(element,width) {
    element.css({
        'transition-timing-function':'linear',
        'transition-duration':'2000ms',
        'transform':'translate3d(-'+(width*2)+'px,0px,0px'//设置x轴移动

    });
}