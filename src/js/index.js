
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
function rotate(callback) {
    restoreWalk();
    $boy.addClass('boy-rotate');
    if (callback) {
        $boy.on(animationEnd,function () {
            callback();
            $boy.off();
        })
    }
}
function boyGo() {
    moveTo(2000, 0.5).then(function () {
        pauseWalk();
    }).then(function () {
        return openDoor();
    }).then(function () {
        lamp.bright();
    }).then(function () {
        return toShop(1000);
    }).then(function () {
        return takeFlower();
    }).then(function () {
        bird.fly();
    }).then(function () {
        return outShop(1000);
    }).then(function () {
        moveTo(1000, 0.8);
        return shutDoor();
    }).then(function () {
        lamp.dark();
    });
}

var bird = {
    elem: $('.bird'),
    fly: function () {
        this.elem.addClass('birdFly');
        this.elem.transition({
            right: container.width()
        }, 15000, 'linear');
    }
};

var lamp = {
    elem: $('.b_background'),
    bright: function () {
        this.elem.addClass('lamp-bright')
    },
    dark: function () {
        this.elem.removeClass('lamp-bright')
    }
}

var bridgeY = function () {
    var data = getValue('.c_background_middle');
    return data.top;
}

var girl = {
    elem:$(".girl"),
    getHeight:function () {
        return this.elem.height();
    },
    setOffset:function () {
        this.elem.css({
            left:visualWidth/2,
            top:bridgeY() - this.getHeight()
        })
    },
    rotate:function () {
        this.elem.addClass('girl-rotate');
    },
    getOffset:function () {
        return this.elem.offset();
    },
    getWidth:function () {
        return this.elem.width();
    }
};

var logo = {
    elem:$(".logo"),
    run:function () {
        this.elem.addClass('logolightSpeedIn')
            .on(animationEnd,function () {
                logo.elem.addClass('logoShake').off();
            })
    }
}

// 动画结束事件
var animationEnd = (function() {
    var explorer = navigator.userAgent;
    if (~explorer.indexOf('WebKit')) {
        return 'webkitAnimationEnd';
    }
    return 'animationend';
})();

var audioConfig= {
    enable:true,
    playUrl:'../../music/happy.wav',
    cycleUrl:'../../music/circulation.wav'
}

function h5Audio(url) {
    var audio = new Audio(url);
    audio.autoPlay = true;
    audio.loop = true;
    audio.play();
    return {
        end: function(callback) {
            audio.addEventListener('ended', function() {
                callback();
            }, false);
        }
    };
}