$('#index_index').live("pagecreate",function(){
			//读取类别为散文和随笔
			var listview=$(this).find('ul[data-role="listview"]');
			var $strkey="";
			var $m=0;
			var $n=0;
			var $strhtml="";
			for(var i=0;i<localStorage.length;i++){
				$strkey=localStorage.key(i);
				if($strkey.substring(0,4)=="note"){
					var getdata=JSON.parse(rttophtml5mobi.utils.getParam($strkey));
					if(getdata.type=="a"){
						$m++;
					}
					if(getdata.type=="b"){
						$n++;
					}
				}
			}
			var $sum=parseInt($m)+parseInt($n);
			$strhtml+="<li data-role='list-divider'>全部记事本内容<span class='ul-li-count'>"+$sum+"</span></li>";
			$strhtml+="<li><a href='list.html' data-ajax='false' data-id='a' data-name='散文'>散文<span class='ul-li-count'>"+$m+"</span></a></li>";
			$strhtml+="<li><a href='list.html' data-ajax='false' data-id='b' data-name='随笔'>随笔<span class='ul-li-count'>"+$n+"</span></a></li>";
			listview.html($strhtml);
			//给a标签绑定点击事件
			listview.delegate('li a','click',function(){
				rttophtml5mobi.utils.setParam('link_type',$(this).data('id'));
				rttophtml5mobi.utils.setParam('link_name',$(this).data('name'));
			})
		})
$('#list_index').live('pagecreate',function(){
	var $listview=$(this).find('ul[data-role="listview"]');
	var strkey="";
	var strhtml="",$intsum=0;
	var $strtype=rttophtml5mobi.utils.getParam('link_type');
	var $strname=rttophtml5mobi.utils.getParam('link_name');
	for(var i=0;i<localStorage.length;i++){
		strkey=localStorage.key(i);
		if(strkey.substring(0,4)=="note"){
			var getdata=JSON.parse(rttophtml5mobi.utils.getParam(strkey));
				if(getdata.type==$strtype){
					strhtml+='<li data-icon="false" data-ajax="false"><a href="notedetail.html" data-id="'+getdata.nid+'">'+getdata.title+'</a></li>';
					$intsum++;
				}
		}
	}
	var strtitle='<li>'+$strname+'<span class="ul-li-count">'+$intsum+'</span></li>';
	$listview.html(strtitle+strhtml);
	$listview.delegate('li a','click',function(){
				rttophtml5mobi.utils.setParam('link_id',$(this).data('id'));
			})
})
$('#addnote_index').live("pagecreate",function(){
	//先取用户所输入的内容
	var header=$(this).find('div[data-role="header"]');
	var rdotype=$('input[type="radio"]');
	var hidtype=$('#hidtype');
	var title=$('#txt-title');
	var content=$('#txt-content');
	//当切换类别把值更新到隐藏域
	rdotype.bind("change",function(){
		hidtype.val(this.value);
	})
	header.delegate('a','click',function(e){
		if(title.val().length>0&&content.val().length>0){
			var strnid="note_"+getrandom(3)
			var notedata=new Object();
			notedata.nid=strnid;
			notedata.type=hidtype.val();
			notedata.title=title.val();
			notedata.content=content.val();
			//把对象解析成json字符串
			var jsonnotedata=JSON.stringify(notedata);
			rttophtml5mobi.utils.setParam(strnid,jsonnotedata);
			//页面重定向
			window.location.href="list.html";
		}
	})
	function getrandom(n){
		var rand="";
		for(var i=0;i<n;i++){
			rand+=Math.floor(Math.random()*10);
		}
		return rand;
	}
})
$('#notedetail_index').live("pagecreate",function(){
	var strid=rttophtml5mobi.utils.getParam("link_id");
	var type=$(this).find('div[data-role="header"] h4');
	var title=$('#title');
	var content=$('#content');
	var listdata=JSON.parse(rttophtml5mobi.utils.getParam(strid));
	var strtype=listdata.type=="a"?"散文":"随笔";
	title.html(listdata.title);
	content.html(listdata.content);
	type.html(strtype);
	//删除
	$(this).delegate('#alink_delete','click',function(e){
		var yn=confirm("你确定要删除么");
		if(yn){
			localStorage.removeItem(strid);
			window.location.href="list.html";
		}
	})
	
})