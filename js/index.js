$(function(){
  getIndexMenu();
    getDissale();
    indexMenuToggle();
    goBack();
});

//首页动态渲染菜单
function getIndexMenu(){

    $.ajax({
        url:'http://182.254.146.100:3000/api/getindexmenu',
        success:function(result){
          //准备模板
            //绑定数据和模板
            var indexMenuHtml=template('indexMenuTpl',{result:result.result});
            $('#menu .row ').html(indexMenuHtml);
        }
    });
}
//首页折扣
function getDissale(){
    $.ajax({
        url:'http://182.254.146.100:3000/api/getmoneyctrl',
        success: function (data) {
            var indexDissaleHtml=template('indexDissaleTpl',{data:data.result});
            $('#dissale .dissaleList').html(indexDissaleHtml);
        }
    });
}

function indexMenuToggle(){
  $('#menu .row').on('click',$('#menu .row .item:nth-child(8)'),function(){
     $('#menu .item:nth-last-child(-n+4)').toggle();
  });
}

function goBack(){
    $('.as').click(function () {
        $('html body').animate({scrollTop:0},2000);
        return false;
    });
}