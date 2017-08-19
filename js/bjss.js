/**
 * Created by Administrator on 2017/8/18.
 */
$(function () {
    getCategoryTitle();
    bindLiClick();
});

function getCategoryTitle(){
    $.ajax({
        url:url+'api/getcategorytitle',
        success:function(data){
           var tvHtml=template('tvTitleTpl',{data:data.result});
            $('#tvMenuu').html(tvHtml);
        }
    });
}

function bindLiClick(){
  $('#tvMenuu').on('click','.tvTitle', function () {
      var tid=parseInt($(this).attr('titleId'));
      $.ajax({
          url:'http://182.254.146.100:3000/api/getcategory',
          data:{titleid : tid},
          //data:{titleid : tid},ÖÐµÄtitleId  --¡·¡·titleid
          success:function(data){
              console.log(data);
              var html = template('tvListTpl' , {data:data.result});

              $(".tvList" + tid).html(html);
          },
          complete:function(){
              $('.tvList').hide();
              $('.tvList'+ tid).show();
          }
      })
      });
}