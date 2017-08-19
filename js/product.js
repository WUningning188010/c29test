/**
 * Created by Administrator on 2017/8/18.
 */
$(function () {
var arr=getRequest();
    var plisttile=arr['category'];
    var plistid=arr['categoryId'];
    var pageid=1;
    var totalsize=0;
    $('#plisttile').html(plisttile);
 //渲染页面
    getplist(plistid,pageid,totalsize);
});



function getplist(plistid,pageid,totalsize){
    $.ajax({
        url:'http://182.254.146.100:3000/api/getproductlist',
        data:{
            "categoryid":plistid,
            "pageid":pageid
        },
        success:function(data){
            console.log(data);
            var productlistHtml=template('productlistTpl',{data:data.result})
            $('#productList').html(productlistHtml);
            totalsize=Math.ceil(data.totalCount/data.pagesize);
            var str="";
            for(var i=1;i<=totalsize;i++){
                 str+='<option value='+i+'>'+i+'</option>';
                $('.select select').html(str);
            }
            $('.select option').each(function(i,item){
               if(i+1==pageid){
                   $(item).attr('selected','selected');
               }
            })
        },
        complete:function(){
            //先解绑在绑定 防止多次绑定事件
            //$('#btn').click=null;
           $('#btnPre').unbind('click').click(function(){
               if(pageid===1) return false;
               pageid--;
               getplist(plistid,pageid);
           });
            $('#btnNext').unbind('click').click(function(){
             if(pageid===totalsize) return false;
                pageid++;
                getplist(plistid,pageid);
            });
        }
    });
}
//获取地址栏参数
function getRequest() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            //就是这句的问题
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            //之前用了unescape()
            //才会出现乱码
        }
    }
    return theRequest;
}
