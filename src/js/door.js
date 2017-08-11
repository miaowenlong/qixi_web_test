function doorAction(left,right,time) {
    var $door = $('.door');
    var doorLeft = $('.door-left');
    var doorRight = $('.door-right');
    var defer = $.Deferred();
    var count = 2;

    var complete = function () {
        if (count == 1) {
            defer.resolve();
            return;
        }
        count --;
    };
    doorLeft.transition({
        'left':left
    },time,complete);

    doorRight.transition({
        'left':right
    },time,complete);

    return defer;
}

function openDoor() {
    return doorAction('-50%', '100%', 2000);
}
function shutDoor() {
    return doorAction('0%', '50%', 2000);
}