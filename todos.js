$(function () {
    load();
    $('.main').on('keydown', function (e) {
        if (e.keyCode === 13) {
            if ($('#text').val() === '') {
                alert('请输入要记的内容');
            } else {
                //先读取本地存储原来的数据
                var local = getData();
                //把local数组进行更新数据 把最新的数据 追加给local数组
                local.push({ title: $('#text').val(), done: false });
                //把这个数据存储给本地存储
                saveDate(local);
                load();
                $('#text').val('');
            }
        }
    });
    //todolist删除操作
    $('ol,ul').on('click', 'a', function () {
        //先获取本地存储
        var data = getData();
        //修改数据
        var index = $(this).attr('id');
        data.splice(index, 1); //数组删除方式  第一个参数是从哪儿删  第二个参数是删几个
        //保存到本地
        saveDate(data);
        //重新渲染页面
        load();


    });
    //正在进行
    $('ol,ul').on('click', 'input', function () {
        //先获取本地存储数据
        var data = getData();
        var index = $(this).siblings('a').attr('id');
        //修改数据
        data[index].done = $(this).prop('checked');
        //保存到本地
        saveDate(data);
        //渲染页面
        load();


    });


    $('.checkAll').click(function () {
        var data = getData();
        if ($('.checkAll').prop('checked') == true) {
            $.each(data, function (index, item) {
                item.done = true;
            });
            saveDate(data);
        } else {
            $.each(data, function (index, item) {
                item.done = false
            });
            saveDate(data);
        }
        load();

    })

    $(".tab button").on("click", function (e) {
        // 链式编程操作


        $(this).css("border", "1px solid #ccc").siblings().css("border", "none");
        var index = $(this).index();


        if (index == 2) {
            $("#all").show();
            $("#active").hide();
            $("#completed").hide();
        }
        if (index == 3) {
            $("#all").hide();
            $("#active").show();
            $("#completed").hide();
        }
        if (index == 4) {
            $("#all").hide();
            $("#active").hide();
            $("#completed").show();
        }
        if (index == 5) {
            var data = getData();
            var newdata = [];
            var donecount = 0; //已经完成的个数

            //遍历之前先要清空里面的元素内容
            /* $("ol,ul").empty(); */

            //遍历数据
            $.each(data, function (index, item) {

                if (!item.done) {

                    newdata.push(item);
                }
            });
            saveDate(newdata);
        }
        load();


    });


})


//读取本地数据的函数
function getData() {
    var data = localStorage.getItem('todolist');
    if (data !== null) {
        //本地存储里面的数据是字符串格式  我们需要对象格式
        return JSON.parse(data);
    } else {
        return [];
    }
}
//保存本地存储数据
function saveDate(data) {
    localStorage.setItem('todolist', JSON.stringify(data));
}
//渲染加载数据
function load() {
    var data = getData();
    var todocount = 0; //正在进行的个数
    var donecount = 0; //已经完成的个数
    //遍历之前先要清空里面的元素内容
    $("ol,ul").empty();
    //遍历数据
    $.each(data, function (i, n) {
        if (n.done) {
            donecount++;
            $('ul').prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id=" + i + " ></a> </li>");

        } else {
            todocount++;
            $('ol').prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a> </li>");
        }

    });
    if (todocount == 0) {
        $('.checkAll').prop('checked', true);
    }
    else {
        $('.checkAll').prop('checked', false);
    }


    $("li a").addClass("close");
    $("li input").addClass("check");
    $('#todocount').text(todocount);
    $('#donecount').text(donecount);
    $('#allcount').text(todocount + donecount);

}
