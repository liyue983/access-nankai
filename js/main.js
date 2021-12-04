

//格式化时间戳
Date.prototype.format = function (format) {
    var date =
    {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

userName = document.getElementById('username');
userId = document.getElementById('userid');
deptName = document.getElementById('deptname');
placeName = document.getElementById('placename');
formatTime = document.getElementById('formatTime');


defaultValues = { 'uname': '张三', 'uid': '123456765432123456', 'udept': '电子信息与光学工程学院', 'uplace': '津南理科食堂一楼' };

function setValues(values) {
    userName.innerText = values.uname;//'张三';
    userId.innerText = values.uid;//'123456765432123456';
    deptName.innerText = values.udept; //'电子信息与光学工程学院';
    placeName.innerText = values.uplace;//'津南理科食堂一楼';
}

function storeValues(values) {
    localStorage.setItem("values", JSON.stringify(values));
}
function getValues() {
    return JSON.parse(localStorage.getItem("values"));
}
function fullScreen() {
    var div = document.querySelector("body");
    //使用Chrome浏览器需要加上webkit
    // div.webkitRequestFullScreen();
    // div.requestFullscreen();
    //使用FireFox浏览器需要加上moz
    // div.mozRequestFullScreen();
    //    所有浏览器都可以全屏，使用能力测试
    if (div.requestFullscreen) {
        div.requestFullscreen();
    } else if (div.webkitRequestFullScreen) {
        div.webkitRequestFullScreen();
    } else if (div.mozRequestFullScreen) {
        div.mozRequestFullScreen();
    } else if (div.msRequestFullScreen) {
        div.msRequestFullScreen();
    }
}
function cancelFull() {
    if (document.cancelFullscreen) {
        document.cancelFullscreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msCancelFullScreen) {
        document.msCancelFullScreen();
    }
}
function isFull() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        return true;
    } else {
        return false;
    }
}
function reFull() {
    if (isFull()) {
        cancelFull()
    } else {
        fullScreen()
    }
}

function init() {
    // fullScreen();
    placeName.addEventListener('click', disp_prompt);
    document.querySelector("#pic").addEventListener('click', reFull)
    values = getValues() || defaultValues;
    setValues(values);
    storeValues(values);
    formatTime.innerText = (new Date()).format('yyyy.MM.dd hh:mm:ss');
    setInterval("formatTime.innerText = (new Date()).format('yyyy.MM.dd hh:mm:ss');", 1000);
}

function disp_prompt() {
    layer.prompt({
        formType: 0,
        placeholder: 'Name',
        title: '请输入值',
    }, function (value, index, elem) {
        // alert(value); //得到value
        values = { 'uname': value, 'uid': $('#uid').val(), 'udept': $('#udept').val(), 'uplace': $('#uplace').val() };
        setValues(values);
        storeValues(values);
        console.log(values);
        layer.close(index);
    });
    lastValues = getValues() || defaultValues;
    p = document.querySelector("input.layui-layer-input");
    p.placeholder = "Name";
    p.value = lastValues.uname;
    $(".layui-layer-content").append("<br/><input type=\"text\" id= \"uid\" class=\"layui-layer-input\" placeholder=\"ID\"/>");
    $(".layui-layer-content").append("<br/><input type=\"text\" id= \"udept\" class=\"layui-layer-input\" placeholder=\"Department\"/>");
    $(".layui-layer-content").append("<br/><input type=\"text\" id= \"uplace\" class=\"layui-layer-input\" placeholder=\"Place\"/>");
    $('#uid').val(lastValues.uid); $('#udept').val(lastValues.udept); $('#uplace').val(lastValues.uplace);


}

init()