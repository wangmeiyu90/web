var json='['+
'{"i":1,"img":"banner_01.jpg"},'+
'{"i":2,"img":"banner_02.jpg"},'+
'{"i":3,"img":"banner_03.jpg"},'+
'{"i":4,"img":"banner_04.jpg"},'+
'{"i":5,"img":"banner_05.jpg"}'+
']';
var imgs=eval("("+json+")");//用eval将数据解析为数组

window.$=HTMLElement.prototype.$=function(selector){
	return (this==window?document:this).querySelectorAll(selector);
}
var adv={//广告轮播对象
	ulImgs:null,//轮播的ul元素
	ulIdxs:null,//序号按钮的ul元素
	INTERVAL:10,//每步时间间隔10毫秒
	STEP:33.5,//每步移动的距离是40px
	WAIT:3000,//自动轮播时的等时3s一换
	timer:null,//当前定时器的序号
			//同一时刻，只有一个定时器实例在运行
	curri:1,//当前img的li的序号，又指序号按钮的内容
	LIWIDTH:670,//每个图片li的宽度
	init:function(){
		this.ulImgs=$("#imgs")[0];
		this.ulIdxs=$("#indexs")[0];
		this.initUlImgs();
		this.initUlIdxs();
		this.automove();
	},
	//初始化ulImgs中的广告图片
	initUlImgs:function(){
		//<li data-i="图片的i属性">
		//<img src="images/index/图片的img的属性"></li>
		//遍历imgs数组中每个img对象
		//	将每个对象替换为规定li格式的字符串
		//	再放回数组原位
		for(var i=0;i<imgs.length;i++){
			imgs[i]='<li data-i="'+imgs[i].i+'">'+'<img src="images/index/'+imgs[i].img+'"></li>';
		}
		this.ulImgs.innerHTML=imgs.join("");
		this.ulImgs.style.width=this.LIWIDTH*imgs.length+"px";
	
	},
	//初始化序号按钮
	initUlIdxs:function(){
		//遍历imgs中每个元素，声明临时数组idxs=[]
		//
		for(var i=0,idxs=[];i<imgs.length;i++){
			idxs.push(i+1);
			this.ulIdxs.innerHTML="<li>"+idxs.join("</li><li>")+"</li>";
			//默认第一个li按钮选中
			this.ulIdxs.$("li")[0].className="hover";
			this.ulIdxs.onmouseover=function(){
				var e=window.event||arguments[0];
				adv.move(e);
			}
		}
	},
	move:function(e){//响应idx li的mouseover事件
		var nextLi=e.srcElement||e.target; 
		if(nextLi.nodeName=="LI"){
			var nexti=nextLi.innerHTML;
			this.ulIdxs.$(".hover")[0].className="";
			adv.ulIdxs.$("li")[nexti-1].className="hover";
			if(nexti>this.curri){
				clearTimeout(this.timer);
				this.timer=null;
				this.moveStep(nexti-this.curri);
			}else if(nexti<this.curri){//右移
				clearTimeout(this.timer);
				this.timer=null;
				this.moveLi(nexti-this.curri);
				this.moveStep(nexti-this.curri);
			}
		}
	},
	automove:function(){//自动轮播广告
		this.timer=setTimeout(function(){
			//找到当前hover的li，移除样式
			adv.ulIdxs.$(".hover")[0].className="";
			//将hover设置到curri对应的li上
			adv.ulIdxs.$("li")[adv.curri==imgs.length?0:adv.curri].className="hover";
			adv.moveStep(1);
		},this.WAIT);
	},
	moveStep:function(n){//每次移动一步
		//n两个作用：1.移动几个li
		//			  2.n>0,左移；n<0右移
		//获得前ulImgs元素的left值
		var left=parseFloat(getComputedStyle(this.ulImgs).left);
			//什么条件下，才注册下一个定时器
			if((n>0&&left>-this.LIWIDTH*n)||(n<0&&left<0)){
				//n的正负，让ulImgs左/右一步
				this.ulImgs.style.left=left-(n>0?this.STEP:-this.STEP)+"px";
				//注册定时器，反复移动下一次
				this.timer=setTimeout(function(){
					adv.moveStep(n);
				},this.INTERVAL);
			}else{//停止移动，注册下一次自动移动
				this.curri+=n;
				this.curri>imgs.length&&(this.curri=1);
				n>0&&this.moveLi(n);
				this.automove();
			}
	},
	//每次移动后，迁移左侧看不见的li到ul结尾
	//修正ul的left位置：左移修正为0
	moveLi:function(n){
		if(n>0){//左移
			while(this.ulImgs.firstChild.dataset.i!=this.curri){
				this.ulImgs.appendChild(this.ulImgs.removeChild(this.ulImgs.firstChild));
			}
			//左移后将ulImgs的left归零
			this.ulImgs.style.left=0;
		}else{//右移：从结尾取最后一个元素，插入到第一个元素之前
			while(this.ulImgs.$("li")[-n].dataset.i!=this.curri){
				this.ulImgs.insertBefore(this.ulImgs.removeChild(this.ulImgs.lastChild),this.ulImgs.firstChild);
			}
			this.ulImgs.style.left=n*this.LIWIDTH+"px";
		}
	}
}


window.onload=function(){
	adv.init();
	console.log(adv);
}