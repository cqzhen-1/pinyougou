function animate(obj, target, callback) {
    //obj.timer避免了var timer声明重复开辟内存空间，obj.timer给不同的对象指定了不同的定时器
    //当我们不断点击按钮，这个元素的速度会越来越快，因为开启了多个定时器同时运行
    //解决方案：让我们的元素只要一个定时器来执行
    clearInterval(obj.timer); //清除以前的定时器，只保留当前的一个定时器在执行，排它思想

    obj.timer = setInterval(function() {
        //把每次加1这个步长值改为一个慢慢变小的值，步长公式：（目标值-现在的位置）/10 作为每次移动的距离
        //把步长值改为整数，避免出现小数最后无法到达目标位置
        //var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step); //判断是正着走还是倒着走，否则倒着走无法到达目标位置

        if (obj.offsetLeft == target) {
            //停止条件：当前盒子位置等于目标位置就停止定时器
            clearInterval(obj.timer);
            //回调函数调用写在定时器结束里面
            // if (callback) {
            //     callback();
            // }
            callback && callback(); //短路运算
        }
        //缓动效果原理：让盒子每次移动的距离慢慢变小，速度就会慢慢落下来
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 20)
}