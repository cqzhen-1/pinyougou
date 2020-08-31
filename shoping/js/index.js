window.addEventListener('load', function() {
    //1、获取元素
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;

    //功能1：鼠标经过/离开就显示/隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            //自动调用点击事件
            arrow_r.click();
        }, 2000)
    })

    //功能2：动态生成小圆圈，有几张图片就生成几个小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个li
        var li = this.document.createElement('li');
        //记录当前小圆圈的索引号
        li.setAttribute('index', i);
        //把li插入ol中
        ol.appendChild(li);

        //功能4：通过循环给每个li添加点击事件，点击小圆圈变色，其他无颜色，排它思想
        li.addEventListener('click', function() {
            //把所有小li清除current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下当前的点击的li，将其类名设置为current
            this.className = 'current';

            //功能5:点击小圆圈，移动图片
            //ul的移动距离就是小圆圈的索引号乘以图片宽度，注意是负值
            //当我们点击了某个Li,就拿到当前li的索引号
            var index = this.getAttribute('index');
            //当我们点击了某个li就拿到这个li的索引号Index给num、circle
            num = index;
            circle = index;

            animate(ul, -index * focusWidth);
        })
    }

    //功能3：把ol里面的第一个li设置类名为current
    ol.children[0].className = 'current';

    //功能6：克隆第一张图片放在ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //功能7：点击右侧按钮，图片滚动一张
    var num = 0;
    var circle = 0; //控制小圆圈播放
    var flag = true;
    arrow_r.addEventListener('click', function() {
        //功能11：flag节流阀：利用回调函数防止点击图片播放过快
        if (flag) {
            flag = false; //关闭节流阀

            //功能7：图片无缝衔接循环播放
            //（1）第一张图片复制一个到最后
            //（2）如果走到了最后复制的那张图片，此时的ul要快速、不做动画的跳到最左侧
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; //动画执行完毕调用回调函数：打开节流阀
            });

            //功能8：点击右侧按钮，小圆圈跟着一起变化，可以再声明一个变量circle控制小圆圈的播放
            circle++;
            //如果circle==4说明我们走到了最后我们克隆的那张照片了,将circle变为0指向第一个小圆圈
            // if (circle == ol.children.length) {
            //     circle = 0;
            // }
            circle = circle == ol.children.length ? 0 : circle;
            circleChange();
        }
    });

    //功能9：左侧按钮做法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀

            //功能7：图片无缝衔接循环播放
            //如果走到了第一张图片，此时的ul要快速、不做动画的跳到最右侧
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true; //动画执行完毕调用回调函数：打开节流阀);
            });

            //功能8：点击右侧按钮，小圆圈跟着一起变化，可以再声明一个变量circle控制小圆圈的播放
            circle--;
            //如果circle<0说明我们走到了第一张图片正在点击左侧按钮,要将circle变为4指向最后一个小圆圈
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });

    //功能10：自动播放轮播图
    var timer = setInterval(function() {
        //自动调用点击事件
        arrow_r.click();
    }, 2000)

    function circleChange() {
        //先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前小圆圈current类名
        ol.children[circle].className = 'current';
    }

})