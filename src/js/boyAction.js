/**
 * 小孩走路
 * @param{[type]} container [description]
 */
function walk() {
    $boy.addClass('slowWalk');
}

function pauseWalk() {
    $boy.addClass('pauseWalk');
}

function restoreWalk() {
    $boy.removeClass('pauseWalk');
}

function run(options, runtime) {
    var dft = $.Deferred();
    //恢复走路
    restoreWalk();

    $boy.transition(
        options,
        runtime,
        'linear',
        function () {
            dft.resolve();
        }
    );
    return dft;
}

function moveTo(time, proportionX, proportionY) {
    time = time || 3000;

    walk();

    var d1 = run({
        'left': calculateDist('x', proportionX) + 'px',
        'top': calculateDist('y', proportionY) + 'px' ?
            calculateDist('y', proportionY) + 'px' : undefined
    }, time);
    return d1;
}

function calculateDist(direction, proportion) {
    return (direction == 'x' ?
        visualWidth : visualHeight) * proportion;
}

function setColor(value) {
    $boy.css('background-color', value);
}

var instanceX;

function toShop(time) {
    var defer = $.Deferred();
    var door = $('.door');

    var offsetDoor = door.offset();
    var doorOffsetLeft = offsetDoor.left;

    var offsetBoy = $boy.offset();
    var boyOffsetLeft = offsetBoy.left;

    instanceX = (doorOffsetLeft + door.width() / 2);

    var walkPlay = run({
        transform: "translateX(' + instanceX + 'px),scale(0.3,0.3)",
        opacity: 0.1
    }, 2000);

    walkPlay.done(function () {
        $boy.css({
            opacity: 0
        });
        defer.resolve();
    });
    return defer;
}

function outShop(runTime) {
    var defer = $.Deferred();
    restoreWalk();

    var walkplay = run({
        transform: 'translateX(' + instanceX + 'px),scale(1,1)',
        opacity: 1
    }, runTime)

    walkplay.done(function () {
        defer.resolve();
    });

    return defer;

}