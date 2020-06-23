$(function() {
    $('#link_reg').on('click',function(){
       $('.login-box').hide() 
       $('.reg-box').show()
    })
   // "去登陆"
    $('#link_login').on('click', function(){
        $('.login-box').show()
        $('.reg-box').hide()
    
    })
    //从layui获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12,且不能出现空格位'],
        repwd: function (value) {
        //需要进行一次判断，判断失败return一个新消息
         var pwd =  $('.reg-box [name=password]').val()
         if(pwd !=value){
             return '两次密码不一致'
         }
        }
    })
    //监听注册表单的监听事件
    $('#form_reg').on('submit',function(e) {
        e.preventDefault()
        var data =  { username: $('#form_reg[name=username]').val(),password:$('#form_reg[name=password]').val()}
         $.post('http://www.escook.cn:8086/api/reguser',data, function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            //模拟点击行为
            $('#link-login').click()
        })
    })
     //监听登录表单提交事件
     $('#form_login').submit(function(e){
         //阻止默认提交行为
         e.preventDefault()
         $.ajax({
             url:'http://ajax.frontend.itheima.net/api/login',
             method:'POST',
             //快速获取表单数据
             data:$(this).serialize(),
             success: function (res) {
                 if(res.status !==0){
                 return layer.msg('登录失败')
             }
             layer.msg('登录成功')
             localStorage.setItem('token',res.otken)
             
             //跳转后台主页
             Location.href = '/index.html'
            }
         })
     })
})
 
