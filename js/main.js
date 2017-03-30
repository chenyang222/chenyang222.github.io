

(function(){


	//开始
	load();	
	//适配
	setPerc();
	//控制背景音乐
	controlbgMusic()
})()

//适配
function setPerc(){
	resetview();
	window.onresize = resetview;
	function resetview(){
		var view = document.querySelector('#view');
		var main = document.querySelector('#main');
		var deg = 52.5;
		var height = document.documentElement.clientHeight;
		var R = Math.round(Math.tan(deg/180*Math.PI)*height*.5);
		view.style.WebkitPerspective = view.style.perspective = R + "px";
		css(main,"translateZ",R);

	}
}

//控制bgmusic

function controlbgMusic(){
	
	document.addEventListener('touchstart',function(e){
		
		if(e.target.id === 'musicBtn' ){
			
			var musicBtn = document.getElementById('musicBtn');
			
			var music = document.getElementById('music');
					
			if(!music.muted){
						
				music.muted = true;
				music.pause();
				musicBtn.style.backgroundImage = 'url(img/noMusic.png)';
				
			}else{
				music.play();				
				music.muted = false;
				musicBtn.style.backgroundImage = 'url(img/music.png)';
			}			
			
		}
		
		e.stopPropagation();
		
	},true)
	
}




//图片预加载
function load(){
	//获取预加载
	var loadText = document.querySelector('.loadText');
	//创建预存图片的数组
	var data = [];
	//定义获取的图片
	var imgNum = 0;	
	
	for(var attr in ImgData){
				
		//console.log(ImgData[attr])
		//把所有图片放到一个数组内
		data = data.concat(ImgData[attr]);
		
	}
	
	//循环所有图片
	for(var i=0;i<data.length;i++){
		
		var img = new Image();
		
		img.src = data[i];
		//图片加载完后
		img.onload = function(){
			//数量++
			imgNum++;
			
			var per = Math.floor(imgNum/data.length*100);
			
			loadText.innerHTML = '已加载'+per+'%';
			
			if(imgNum == data.length){
				
				//图片加载完要做的事情
				
				var logo1 = document.getElementsByClassName('logo1')[0];
				
				MTween({
					el: logo1,
					target:{opacity:0},
					time:1000,
					type: "easeOut",
					callBack:function(){
						logo1.style.display = 'none';
						
						startcart();	
					}
				})
							
			}
		}
		
	}

}


//初始化开始动画
function startcart(){
	
	var view = document.getElementById('view');
	
	var logoTw = document.createElement('div');
		
	logoTw.className = 'logoTw';
	
	var small = document.createElement('div');
	
	small.className = 'small';
	
	for(var i=0;i<10;i++){
				
		var img = document.createElement('img');
		
		img.src = ImgData.logoIcon[i%3];
		
		
		css(img,'rotateX',(i+1)*10);
		css(img,'rotateY',(i+1)*20);
		css(img,'rotateZ',(i+1)*30);		
		
		small.appendChild(img);	
	}
	
	logoTw.appendChild(small);	
	
	view.appendChild(logoTw);	
	
	css(logoTw,'translateZ',-1000);
	
	
	shake(logoTw,'translateX');
	shake(logoTw,'translateY',function(){
		
		 cartTw();
		 
		 var music = document.getElementById('music');
		 
//		 music.load();
		 music.play();
		 
	});

}

//
function cartTw(){
	
	var view = document.getElementById('view');
	
	var bg = document.getElementById('bg');
	
	var logoTw = document.querySelector('.logoTw');
	
	var logoTh = document.createElement('div');
	
	logoTh.className = 'logoTh';
	
	var img = document.createElement('img');
	
	img.className = 'img';
	
	img.src = ImgData.logo[0];
	
	logoTh.appendChild(img);
	
	var imgshw = document.createElement('img');
	
	imgshw.className = 'imgshw';
	
	imgshw.src = ImgData.logo[1];	
	
	logoTh.appendChild(imgshw);
	
	view.appendChild(logoTh);
	
	css(logoTh,'translateZ',-500);
	css(logoTh,'opacity',0);
	
	//碎片生成
	
	var logoFo = document.createElement('div');
	
	logoFo.className = 'logoFo';
	
	var logoPaper = document.createElement('div');
	
	logoPaper.className = 'logoPaper';	
	
	logoFo.appendChild(logoPaper);
	
	var paperIconNum = 16;
	
	for(var i=0;i<paperIconNum;i++){
		
		var span = document.createElement('span');
		
		var xR = Math.round(Math.random()*200);
	
		var xDeg = 60+Math.round(Math.random()*360);
	
		var yR = Math.round(Math.random()*100);
		
		var yDeg = i * (360/paperIconNum) +Math.round((Math.random()-.5)*20);
	
		css(span,"rotateY",xDeg);
	
		css(span,"translateZ",xR);
	
		css(span,"rotateX",yDeg);
	
		css(span,"translateY",yR);
		
		span.style.backgroundImage = "url("+ImgData.logoIcon[i%4]+")";
		
		logoPaper.appendChild(span);
		
	}

	
	//云朵生成
	
	var logoCloud = document.createElement('div');
	
	logoCloud.className = 'logoCloud';	
	
	logoFo.appendChild(logoCloud);
	
	var cloudNum = 6;
	
	for(var i=0;i<cloudNum;i++){
		
		var span = document.createElement('span');
		
		var xR = 80+Math.round(Math.random()*200);
	
		var xDeg = Math.round(Math.random()*360);
	
		var yR = 80+Math.round(Math.random()*100);
		
		var yDeg = i * (360/cloudNum) +Math.round((Math.random()-.5)*20);
	
		css(span,"rotateY",xDeg);
	
		css(span,"translateZ",xR);
	
		css(span,"rotateX",yDeg);
	
		css(span,"translateY",yR);
		
		span.style.backgroundImage = "url("+ImgData.cloud[i]+")";
		
		logoCloud.appendChild(span);
		
	}
	
	css(logoFo,"scale",0);
	
	view.appendChild(logoFo);			
	
	
	MTween({		
		
		el:logoTw,
		target:{translateZ:-500,opacity:0},
		time: 100,
		type: "linear",
		callBack:function(){
			css(bg,'opacity',100);
			
			MTween({		
				el:logoFo,
				target:{scale:100},
				time: 100,
				type: "easeIn",
			})			
			MTween({		
				el:logoPaper,
				target:{rotateY:720},
				time: 4500,
				type: "linear",
			})	
			MTween({		
				el:logoCloud,
				target:{rotateY:720},
				time: 4500,
				type: "linear",
			})			
			MTween({		
				el:logoTh,
				target:{translateZ:0,opacity:100},
				time: 100,
				type: "easeIn",
			})
			MTween({		
				el:imgshw,
				target:{rotateY:720},
				time: 4500,
				type: "linear",
			})
			MTween({		
				el:img,
				target:{rotateY:720},
				time: 4500,
				type: "linear",
			})	
			
			setTimeout(function(){
				
				css(bg,'opacity',0);
				
				MTween({		
					el:logoFo,
					target:{scale:0},
					time: 500,
					type: "easeIn"
				})		
				
				MTween({		
					el:logoTh,
					target:{translateZ:-1000,opacity:0},
					time: 1000,
					type: "easeIn"
				})

				MTween({
					el:logoTw,
					target:{translateZ:-1000,opacity:100},
					time:1500,
					type: "easeIn",
					callBack:function(){
						
						startcard2()
						
					}
				})
				
			},3000)
		}
	})		
	
}

//初始化动画出现

function startcard2(){
	
	var logoTw = document.querySelector('.logoTw');
	
	css(logoTw,'translateX',0);
	
	css(logoTw,'translateY',0);
	
		
	shake(logoTw,'translateX');

	shake(logoTw,'translateY',function(){
		
		
		cartTw2();
		
		
	});


}

//每个人都是造物者
function cartTw2(){
	
	var view = document.getElementById('view');
	
	var bg = document.getElementById('bg');
	
	var logoTw = document.querySelector('.logoTw');
	
	var logoTh = document.querySelector('.logoTh');
	
	var logoFo = document.querySelector('.logoFo');
	
	logoTh.innerHTML = '';
	
	var img = document.createElement('img');
	
	img.style.top = '100px';
	
	img.src = ImgData.logo[2];
	
	logoTh.appendChild(img);
		
	//碎片
	var logoPaper = document.querySelector('.logoPaper');
	
	css(logoPaper,'rotateY',0);

	//云朵		
	var logoCloud = document.querySelector('.logoCloud');
	
	css(logoCloud,'rotateY',0);
	
	
	MTween({		
		
		el:logoTw,
		target:{translateZ:-500,opacity:0},
		time: 100,
		type: "linear",
		callBack:function(){
			
			css(bg,'opacity',100);
			
			MTween({		
				el:logoFo,
				target:{scale:100},
				time: 100,
				type: "easeIn",
			})			
			MTween({		
				el:logoPaper,
				target:{rotateY:720},
				time: 4500,
				type: "linear",
			})	
			MTween({		
				el:logoCloud,
				target:{rotateY:720},
				time: 4500,
				type: "linear",
			})			
			MTween({		
				el:logoTh,
				target:{translateZ:0,opacity:100},
				time: 100,
				type: "easeIn",
			})
			MTween({		
				el:img,
				target:{rotateY:720},
				time: 4500,
				type: "linear",
			})	
			
			setTimeout(function(){
				
				css(bg,'opacity',0);
				
				MTween({		
					el:logoFo,
					target:{scale:0},
					time: 500,
					type: "easeIn"
				})		
				
				MTween({		
					el:logoTh,
					target:{translateZ:-1000,opacity:0},
					time: 1000,
					type: "easeIn"
				})

				MTween({
					el:logoTw,
					target:{translateZ:-1000,opacity:100},
					time:1500,
					type: "easeIn",
					callBack:function(){
						
						startcard3();
						
					}
				})
				
			},3000)
		}
	})			
}


//初始化动画出现

function startcard3(){
	
	var logoTw = document.querySelector('.logoTw');
	
	css(logoTw,'translateX',0);
	
	css(logoTw,'translateY',0);
	
		
	shake(logoTw,'translateX');

	shake(logoTw,'translateY',function(){
		
		
		mainTz();
		
		MTween({
			el:logoTw,
			target:{opacity:0},
			time:500,
			type:'easeIn',
			callBack:function(){
				
				var small = document.querySelector('.small');
				
				logoTw.removeChild(small);				
			}
			
		})
		
		
	});


}

//主体动画
function mainTz(){
	
	var main_tz = document.getElementById('main_tz');
	
	css(main_tz,'translateZ',-2000);
	
	css(main_tz,'translateX',100);
	
	//主体背景进场
	mainCart();
	//云彩进场
	mainCloud();	
	//漂浮层
	mainOther();
	//视野变化
	MTween({
		el:main_tz,
		target:{translateZ:0,translateX:0},
		time:3000,
		type:'easeOut'
	})
	
	var maincloud = document.getElementById('maincloud')
	
	//随着动画进入的云朵消失
	setTimeout(function(){
		
		css(maincloud,'opacity',0);
		
	},1500)
	
	//背景变化
	setTimeout(function(){
		
		MTween({
			el:bg,
			target:{opacity:100},
			time:1000,
			type:'easeIn'
		})		
			
	},500)	
}



//主体初始化 
function mainCart(){
	
	var bg = document.getElementById('bg');
	
	var maincart = document.getElementById('maincart');
	
	var width = 129;
	
	var outdeg = 360/ImgData.mainImg.length;
	
	var r = Math.tan((180-outdeg)/2*Math.PI/180)*(width/2);
	
	var startdeg = 180;
	
	css(maincart,'rotateX',0);
	
	for(var i=0;i<ImgData.mainImg.length;i++){
		
		var span = document.createElement('span');
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		span.style.display = 'none';
		
		span.style.backgroundImage = 'url('+ImgData.mainImg[i]+')';
		
		maincart.appendChild(span);
		
		startdeg -= outdeg;
		
	}
	
	var num = 0;
	
	var timer = setInterval(function(){
		
		maincart.children[num].style.display = 'block';
		
		num++;
		
		if(num >= maincart.children.length){
			
			clearInterval(timer);
			
		}
		
	},50)
	
	css(maincart,'scale',0);
	
	css(maincart,'transalteZ',-1000);
	
	css(maincart,'rotateY',-720);
	
	MTween({
		el:maincart,
		target:{rotateY:0,scale:100,transalteZ:0},
		time:3000,
		type:'easeOut',
		callBack:function(){
			
			
			touchedcart();

			tly();
		}
	})
	
	
	
}

//主体云彩
function mainCloud(){
	
	var maincard = document.getElementById('maincart');
	
	var bg = document.getElementById('bg');
	
	var maincloud = document.getElementById('maincloud');
	
	var width = 200;
	
	var outdeg = 360/9;
	
	var r = 400;
	
	var startdeg = 180;
	
	for(var i=0;i<9;i++){
		
		var span = document.createElement('span');
	
		var xDeg = Math.round(Math.random()*360);
	
		var yR = 100-Math.round(Math.random()*200);
	
		css(span,"rotateY",startdeg);
	
		css(span,"translateY",yR);		
		
		css(span,"translateZ",-r);
		
		span.style.backgroundImage = 'url('+ImgData.cloud[(i+1)%3]+')';
		
		maincloud.appendChild(span);
		
		startdeg -= 30;
		
	}
	
	css(maincloud,'scale',10);
	
	css(maincloud,'translateZ',100)
	
	css(maincard,'rotateY',0);
	
	MTween({
		el:maincloud,
		target:{rotateY:360,scale:1000},
		time:6000,
		type:'easeOut'
	})	
	
}

//手指动作事件

function touchedcart(){
	
	var maincart = document.getElementById('maincart');
	
	var mainOther = document.getElementById('mainOther');
	
	var main_tz = document.getElementById('main_tz');
	
	//初始化按下的值px
	var finger = {x:0,y:0};
	//初始化按下的旋转角度
	var eledeg = {x:0,y:0};
	//平均每度走多少px
	var sca = {x:129/18,y:1170/90};
	//最后一次的角度差值
	var lastdegDis = {x:0,y:0};
	//最后一次的角度
	var lastDeg = {x:0,y:0};
	
	document.addEventListener('touchstart',function(e){
		
		window.isTouch = true;
		window.isStart = true;
		
		e.preventDefault();
		
		//清空当前未完成的缓冲
		clearInterval(maincart.timer)	
		clearInterval(mainOther.timer)
		clearInterval(main_tz.timer)
		
		
		finger.x = event.touches[0].pageX; //获取按下的maincart值x
		
		eledeg.x = css(maincart,'rotateY');//获取按下时旋转的maincart角度x
		
		finger.y = event.touches[0].pageY; //获取按下的maincart值y
		
		eledeg.y = css(maincart,'rotateX');//获取按下时旋转的maincart角度	y	

		//初始化
		lastdegDis = {x:0,y:0};
		lastDeg = {x:0,y:0};
					
	},true)
	
	document.addEventListener('touchmove',function(e){		
		
		e.preventDefault();
		//初始化现在滑到的位置
		var now = {};
		//获取现在滑到的位置
		now.x = event.touches[0].pageX;
		now.y = event.touches[0].pageY;
		//获取滑动和按下的差值px
		var disx = now.x - finger.x;
		var disy = now.y - finger.y;
		//计算出相差的角度
		var disdegx = -disx/sca.x;
		var disdegy = disy/sca.y;
		
		//限制上下的范围
		var degy = eledeg.y+disdegy;
		var degx = eledeg.x+disdegx;
			
		if(degy > 40){
			
			degy = 40
			
		}else if(degy < -40){
			
			degy = -40
			
		}		

		var degy2 = eledeg.y+disdegy*.95;
		var degx2 = eledeg.x+disdegx*.95;
			
		if(degy2 > 40){
			
			degy2 = 40
			
		}else if(degy2 < -40){
			
			degy2 = -40
			
		}

		//maincart旋转角度
		css(maincart,'rotateY',degx);
		css(maincart,'rotateX',degy);
		//mainOther旋转角度
		css(mainOther,'rotateY',degx2);
		css(mainOther,'rotateX',degy2);
		
		
		//获取最后一次的差值
		lastdegDis.x = eledeg.x+disdegx-lastDeg.x;
		lastdegDis.y = eledeg.y+disdegy-lastDeg.y;
		//上一次的角度值
		lastDeg.x = eledeg.x+disdegx;
		lastDeg.y = eledeg.y+disdegy;

		//定义当前translateZ的值
		var startTz = css(main_tz,'translateZ');;
		
		//视野需要变化的值
		var disTz = startTz-2;
		//最大范围
		if(disTz <= -200){
			disTz = -200;
		}
		//tz translateZ视野变化
		css(main_tz,'translateZ',disTz);
		
	})	
	
	document.addEventListener('touchend',function(e){	
				
		e.preventDefault();
		
		//设置缓冲的大小
		var buttdegx = lastdegDis.x*10;
		var buttdegy = lastdegDis.y*10;
		//获取当前的旋转角度
		var nowdegx = css(maincart,'rotateY');
		var nowdegy = css(maincart,'rotateX');
		
		var yDeg = nowdegy + buttdegy;
		
		if(yDeg > 40){
			
			yDeg = 40
			
		}else if(yDeg < -40){
			
			yDeg = -40
			
		}		
		
		//缓冲动画
		MTween({			
			el:maincart,
			target:{rotateY:nowdegx+buttdegx,rotateX:yDeg},
			time:500,
			type:'easeOut'
		})	

		MTween({			
			el:mainOther,
			target:{rotateY:nowdegx+buttdegx,rotateX:yDeg},
			time:500,
			type:'easeOut'
		})
		
		//tz translateZ视野还原动画
		MTween({			
			el:main_tz,
			target:{translateZ:50},
			time:300,
			type:'easeOut',
			callBack:function(){
				window.isStart = false;
				window.isTouch = false;
			}
			
		})	
		
	})		
}


function tly(){
	
	var maincart = document.getElementById('maincart');
	var mainOther = document.getElementById('mainOther');
	var main_tz = document.getElementById('main_tz');	

	var o = new Orienter();
	var start = {};
	var now = {};
	var last = {};
	var dis = {};
	var nowEl = {};
	var n = {y:0};
	var nZ = {y:0};
	window.isStart = false;
	window.isTouch = false;
    o.onOrient = function (obj) {
    	if(window.isTouch){
			return;
		}
    	
		var y = obj.lon;

		if(!isStart){
			//start
			start.y = y;
			last.y = start.y;
	 		isStart = true;
			return;
		} else {
			//move
			now.y = y - Math.abs(start.y);
			
			dis.y = now.y - (last.y + Math.abs(start.y));
			
			if (dis.y > 10) {
				dis.y = 1;
			} else if (dis.y < -10) {
				dis.y = -1;
			}
			
			nowEl.y = css(maincart,'rotateY');

			n.y += Math.abs(dis.y);
			
			if (n.y >= 30) {
				if (dis.y < 0) {
					n.y = -n.y;
				}

				var startZ = css(main_tz,'translateZ');
				var nowZ = startZ - 50;
				
				if (nowZ < -200) {
					nowZ = -200;
				}
				
				MTween({
					el:main_tz,
					target:{translateZ:nowZ},
					time:400,
					type:'easeOut',
					callBack:function () {
						MTween({
							el:main_tz,
							target:{translateZ:50},
							time:600,
							type:'easeOut'
						})
					}
				})
				MTween({
					el:maincart,
					target:{rotateY:nowEl.y + -(n.y * 2)},
					time:500,
					type:'easeOut'
				})
				MTween({
					el:mainOther,
					target:{rotateY:nowEl.y + -(n.y * 2)},
					time:500,
					type:'easeOut',
				})
				n.y = 0;
				
			}

			last.y = now.y - Math.abs(start.y);
		}
    };
    o.init();

}

//漂浮层
function mainOther(){
	//获取漂浮层
	var mainOther = document.getElementById('mainOther');
	//角度
	var deg = 18;
	var num = 0;		
	var r = 406;
	
	css(mainOther,'rotateX',0);
	css(mainOther,'rotateY',-180);
	css(mainOther,'scale',0);
	
	//第一个
	var other1 = document.createElement('div');
	
	other1.className = 'mainother';
	
	var startdeg = 54;

	css(other1,"translateX",11.35);
	
	css(other1,"translateZ",22.28);	
	
	for(var i=0;i<4;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:547px;margin-top: -273.5px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';	
		
		css(span,'translateY',200);

		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other1.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other1);
	
	//第二个
	var other2 = document.createElement('div');
	
	other2.className = 'mainother';
	
	var startdeg = 180;
	
	css(other2,"translateX",1.56);
	
	css(other2,"translateZ",-9.88);	
	
	for(var i=0;i<2;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:107px;margin-top: -53.5px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',-200);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other2.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other2);	
	

	//第三个
	var other3 = document.createElement('div');
	
	other3.className = 'mainother';
	
	var startdeg = 126;
	
	css(other3,"translateX",25.82);
	
	css(other3,"translateZ",9.0);		
	
	for(var i=0;i<4;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:220px;margin-top: -110px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',-400);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other3.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other3);	


	//第四个
	var other4 = document.createElement('div');
	
	other4.className = 'mainother';
	
	var startdeg = 144;
	
	css(other4,"translateX",21.71);
	
	css(other4,"translateZ",-5.76);		
	
	for(var i=0;i<3;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:128px;margin-top: -64px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',-450);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other4.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other4);	
	
	//第五个
	var other5 = document.createElement('div');
	
	other5.className = 'mainother';
	
	var startdeg = 180;
	
	css(other5,"translateX",13.62);
	
	css(other5,"translateZ",-26.73);		
	
	for(var i=0;i<4;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:159px;margin-top: -78.5px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',350);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other5.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other5);	
	
	//第六个
	var other6 = document.createElement('div');
	
	other6.className = 'mainother';
	
	var startdeg = 126;
	
	css(other6,"translateX",47);
	
	css(other6,"translateZ",2);		
	
	for(var i=0;i<5;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:350px;margin-top: -175px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',350);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other6.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other6);
	

	//第七个
	var other7 = document.createElement('div');
	
	other7.className = 'mainother';
	
	var startdeg = -108;
	
	css(other7,"translateX",-8.91);
	
	css(other7,"translateZ",-4.45);		
	
	for(var i=0;i<2;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:95px;margin-top: -47.5px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',350);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other7.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other7);	
	

	//第八个
	var other8 = document.createElement('div');
	
	other8.className = 'mainother';
	
	var startdeg = -126;
	
	css(other8,"translateX",-4.04);
	
	css(other8,"translateZ",-2.49);		
	
	for(var i=0;i<1;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:52px;margin-top: -26px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',290);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other8.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other8);	
	
	

	//第九个
	var other9 = document.createElement('div');
	
	other9.className = 'mainother';
	
	var startdeg = -126;
	
	css(other9,"translateX",-8.82);
	
	css(other9,"translateZ",-12.13);		
	
	for(var i=0;i<3;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:268px;margin-top: -134px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',-450);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other9.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other9);	
	
	//第十个
	var other10 = document.createElement('div');
	
	other10.className = 'mainother';
	
	var startdeg = -126;
	
	css(other10,"translateX",-10.61);
	
	css(other10,"translateZ",-10.61);		
	
	for(var i=0;i<2;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:151px;margin-top: -75.5px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',350);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other10.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other10);	
	
	
	//第十一个
	var other11 = document.createElement('div');
	
	other11.className = 'mainother';
	
	var startdeg = -54;
	
	css(other11,"translateX",-43.02);
	
	css(other11,"translateZ",31.18);		
	
	for(var i=0;i<3;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:410px;margin-top: -205px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',300);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other11.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other11);		
	
	
	//第十二个
	var other12 = document.createElement('div');
	
	other12.className = 'mainother';
	
	var startdeg = -108;
	
	css(other12,"translateX",-17.82);
	
	css(other12,"translateZ",-9.08);		
	
	for(var i=0;i<2;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:265px;margin-top: -132.5px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',300);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other12.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other12);		


	//第十三个
	var other13 = document.createElement('div');
	
	other13.className = 'mainother';
	
	var startdeg = -144;
	
	css(other13,"translateX",-6.81);
	
	css(other13,"translateZ",-13.36);		
	
	for(var i=0;i<2;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:238px;margin-top: -119px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',0);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other13.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other13);	
	
	
	//第十四个
	var other14 = document.createElement('div');
	
	other14.className = 'mainother';
	
	var startdeg = 0;
	
	css(other14,"translateX",-9.08);
	
	css(other14,"translateZ",17.82);		
	
	for(var i=0;i<4;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:183px;margin-top: -91.5px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',350);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other14.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other14);		
	
	//第十五个
	var other15 = document.createElement('div');
	
	other15.className = 'mainother';
	
	var startdeg = -36;
	
	css(other15,"translateX",-9.08);
	
	css(other15,"translateZ",17.82);		
	
	for(var i=0;i<2;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:179px;margin-top: -89px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',-100);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other15.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other15);		


	//第十六个
	var other16 = document.createElement('div');
	
	other16.className = 'mainother';
	
	var startdeg = -54;
	
	css(other16,"translateX",-28.53);
	
	css(other16,"translateZ",9.27);		
	
	for(var i=0;i<3;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:160px;margin-top: -80px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',-400);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other16.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other16);	
	

	//第十七个
	var other17 = document.createElement('div');
	
	other17.className = 'mainother';
	
	var startdeg = 18;
	
	css(other17,"translateX",2.35);
	
	css(other17,"translateZ",14.82);		
	
	for(var i=0;i<2;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:196px;margin-top: -98px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',-150);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other17.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other17);
	

	//第十八个
	var other18 = document.createElement('div');
	
	other18.className = 'mainother';
	
	var startdeg = 18;
	
	css(other18,"translateX",25.56);
	
	css(other18,"translateZ",21.88);		
	
	for(var i=0;i<2;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:99px;margin-top: -49.5px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',-300);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other18.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other18);
	

	//第十九个
	var other19 = document.createElement('div');
	
	other19.className = 'mainother';
	
	var startdeg = 36;
	
	css(other19,"translateX",1.56);
	
	css(other19,"translateZ",20.88);		
	
	for(var i=0;i<2;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:188px;margin-top: -99px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',-350);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other19.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other19);



	//第二十个
	var other20 = document.createElement('div');
	
	other20.className = 'mainother';
	
	var startdeg = 72;
	
	css(other20,"translateX",8.91);
	
	css(other20,"translateZ",4.54);		
	
	for(var i=0;i<2;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:154px;margin-top: -77px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',-150);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other20.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other20);


	//第二一个
	var other21 = document.createElement('div');
	
	other21.className = 'mainother';
	
	var startdeg = 180;
	
	css(other21,"translateX",14.7);
	
	css(other21,"translateZ",-20.23);		
	
	for(var i=0;i<5;i++){
		
		var span = document.createElement('span');
		
		span.style.cssText = 'height:679px;margin-top: -339.5px;';
		
		span.style.backgroundImage = 'url('+ImgData.peoImg[num]+')';
		
		css(span,'translateY',100);
		
		css(span,'rotateY',startdeg);
		
		css(span,'translateZ',-r);
		
		other21.appendChild(span);
		
		num++;
		
		startdeg -= 18;
		
	}
	
	mainOther.appendChild(other21);


	setTimeout(function(){
		MTween({
			el:mainOther,
			target:{
				rotateY: 25,
				scale:100
			},
			time:1000,
			type:'easeBoth'
		})
		
	},2000)
}
//抖动函数
function shake(obj,attr,endFn){
	
    var arr=[];
    
    var timer=null;
    
    var n=0;
    
   	obj.num=css(obj,attr);
   	
    //拿到一组数字，抖动的幅度。
    for(var i=0;i<10;i++){
    	
        arr.push(i,-i);
    }
    
    arr.push(0);

    //用定时器来实现抖动效果。
    clearInterval(obj[attr]);
    
    obj[attr]=setInterval(function(){
    	
        n++;
        
        if(n>arr.length-1){
        	
            clearInterval(obj[attr]);
            
            endFn&&endFn();
        }
        
        css(obj,attr,obj.num+arr[n])
        
    },50);
    
}