$(function(){
  getIndexMenu();
    getDissale();
    indexMenuToggle();
    goBack();
});

//��ҳ��̬��Ⱦ�˵�
function getIndexMenu(){

    $.ajax({
        url:'http://182.254.146.100:3000/api/getindexmenu',
        success:function(result){
          //׼��ģ��
            //�����ݺ�ģ��
            var indexMenuHtml=template('indexMenuTpl',{result:result.result});
            $('#menu .row ').html(indexMenuHtml);
        }
    });
}
//��ҳ�ۿ�
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