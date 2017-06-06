/**
 * 走路
 */

function boyWalk() {
    var $container = $('#content');
//页面的可视区域
    var visualHeight = $container.height();
    var visualWidth = $container.width();

    var swipe = Swipe($container);

// 获取数据
    var getValue = function (className) {
        var $elem = $('' + className + '');
        //走路的路线坐标
        return {
            height: $elem.height(),
            top: $elem.position().top
        };
    }

// 路的Y轴
    var pathY = function () {
        var data = getValue('.a_background_middle');
        return data.top + data.height / 2;
    }();

    var $boy = $("#boy");
    var boyHeight = $boy.height();

// 修正小男孩的正确位置
// 路的中间位置减去小孩的高度，25是一个修正值
    $boy.css({
        top: pathY - boyHeight + 25
    });

//------------动画处理------------

//恢复走路
    function restoreWalk() {
        $boy.removeClass('pauseWalk');
    }

//暂停行走
    function pauseWalk() {
        $boy.addClass('pauseWalk');
    }

//css3的动作变化
    function slowWlak() {
        $boy.addClass('slowWalk');
    }

//计算移动距离
    function calculateDist(direction, proportion) {
        return (direction == 'x' ? visualWidth : visualHeight) * proportion;
    }


//用transition 做运动
    function startRun(options, runTime) {
        var defPlay = $.Deferred();
        restoreWalk();
        $boy.transition(options, runTime, 'linear', function () {
            defPlay.resolve();//动画完成
        });
        return defPlay;
    }

//开始走路
    function walkRun(time, dist, disY) {
        time = time || 3000;

        //脚动作
        slowWlak();
        var d1 = startRun({left: dist, top: disY ? disY : undefined}, time);
        return d1;
    }

    return {
        walkTo: function (time, proportionX, proportionY) {
            var distx = calculateDist('x', proportionX);
            var disty = calculateDist('y', proportionY);
            return walkRun(time, distx, disty);
        },
        //停止走路
        stopWalk: function () {
            pauseWalk();
        },
        //设置颜色
        setColor: function (color) {
            $boy.css('background-color', color);
        }
    }

}



