var Game = function() {
	//dom元素
	var gamediv;
	var nextdiv;
	var timediv;
	var scorediv;
	var score = 0;
	var resultdiv;
	//游戏矩阵
	var gamedata = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
	];
	//当前方块
	var cur;
	//下一个方块
	var next;
//divs
	var nextdivs = [];
	var gamedivs = [];
	//初始化div
		var initdiv = function(container,data ,divs ){
		for(var i = 0; i < data.length; i++){
			var div=[];
			for(j = 0;j < data[0].length; j++){
				var newnode = document.createElement('div');
				newnode.className = 'none';
				newnode.style.top = (i*20) + 'px';
				newnode.style.left = (j*20) + 'px';
				container.appendChild(newnode);
				div.push(newnode);
			}
			divs.push(div);
		}
	}
	//刷新div
	var refreshdiv = function(data,divs){
	for(var i=0; i<data.length; i++){
		for(var j=0; j<data[0].length; j++){
			if(data[i][j] == 0){
				divs[i][j].className ='none';
			}else if(data[i][j] == 1){
				divs[i][j].className ='done';
			}else if(data[i][j] == 2){
				divs[i][j].className ='current';
			}
		}
	}
}
//监测点是否合法
var check = function(pos, x, y){
	if(pos.x + x < 0){
		return false;
	}else if(pos.x + x >= gamedata.length){
		return false;
	}else if(pos.y + y < 0){
		return false;
	}else if(pos.y + y >= gamedata[0].length){
		return false;
	}else if (gamedata[pos.x + x][pos.y + y] == 1){
		return false;
	}else{
		return true;
	}
}
//监测数据是否合法
var isValid = function(pos,data ){
	for(var i=0; i<data.length;i++){
		for(var j=0; j<data[0].length; j++){
			if(data[i][j] !=0){
				if(!check(pos,i,j)){
					return false;
				}
			}
		}
	}
	return true;
}
//清除数据
var clearData = function(){
	for(var i=0; i<cur.data.length; i++){
			for(var j=0; j<cur.data.length; j++){
				if(check(cur.origin,i,j)){
				gamedata[cur.origin.x + i][cur.origin.y + j] = 0;
			}
		}
		}
}
//设置数据
var setData = function(){
	for(var i=0; i<cur.data.length; i++){
			for(var j=0; j<cur.data.length; j++){
				if(check(cur.origin,i,j)){
				gamedata[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
			}
		}
		}
	}
	//下移
	var down = function(){
		if(cur.canDown(isValid)){
		clearData();
		cur.down();
		setData();
		refreshdiv(gamedata,gamedivs);
		return true;
		}else {
			return false;
		}
		
	}
	//左移
	var left = function(){
		if(cur.canLeft(isValid)){
		clearData();
		cur.left();
		setData();
		refreshdiv(gamedata,gamedivs);
		}
		
	}
	//右移
	var right = function(){
		if(cur.canRight(isValid)){
		clearData();
		cur.right();
		setData();
		refreshdiv(gamedata,gamedivs);
		}
		
	}
	//旋转
	var rotate = function(){
		if(cur.canRotate(isValid)){
		clearData();
		cur.rotate();
		setData();
		refreshdiv(gamedata,gamedivs);
		}
		
	}
	//固定方块
	var fixed = function(){
		for(i=0; i<cur.data.length; i++){
			for(j=0; j<cur.data[0].length; j++){
				if(check(cur.origin, i, j)){
					if(gamedata[cur.origin.x + i][cur.origin.y + j] == 2)
						gamedata[cur.origin.x + i][cur.origin.y + j] = 1
				}
			}
		}
		refreshdiv(gamedata, gamedivs);
	}
	//消行
	var checkClear = function(){
		var line = 0;
		for(var i=gamedata.length-1; i>=0; i--){
			var clear = true;
			for(var j=0; j<gamedata[0].length; j++){
				if(gamedata[i][j] != 1){
					clear = false;
					break;
				}
			}
			if(clear){
				line = line + 1;
				for(var m=i; m>0; m--){
					for(var n=0; n<gamedata[0].length; n++){
						gamedata[m][n] = gamedata[m-1][n];
					}
				}
				for(var n=0; n<gamedata[0].length; n++){
						gamedata[0][n] = 0;
					}
					i++;
			}

		}
		return line;
	}
	//检查游戏结束
	var checkGameOver = function(){
		var gameOver = false;
		for(var i=0; i<gamedata[0].length; i++){
			if(gamedata[0][i] == 1){
				gameOver = true;
			}
		}
		return gameOver;
	}
	//使用下一个方块
	var performNext = function(type, dir){
		cur = next;
		setData();
		next = SquareFactory.prototype.make(type, dir);
		refreshdiv(gamedata,gamedivs);
		refreshdiv(next.data, nextdivs);
	}
	//设置时间
	var setTime = function(time){
		timediv.innerHTML = time;
	}
	//加分
	var addScore = function(line){
		var s = 0;
		switch(line){
			case 1: s=10; break;
			case 2: s=30; break;
			case 3: s=60; break;
			case 4: s=100; break;
			default: break;
		} 
		score = score + s;
		scorediv.innerHTML = score;
	}
	//游戏结束
	var gameover = function(win){
		if(win){
			resultdiv.innerHTML = 'win';
		}else{
			resultdiv.innerHTML = 'lose';
		}
	}
	//底部增加行
	var addTailLines = function(lines){
		for(var i=0; i<gamedata.length - lines.length; i++){
			gamedata[i] = gamedata[i + lines.length];
		}
		for(var i=0; i<lines.length; i++){
			gamedata[gamedata.length - lines.length + i] = lines[i];
		}
		cur.origin.x = cur.origin.x - lines.length;
		if(cur.origin.x < 0){
			cur.origin.x = 0;
		}
		refreshdiv(gamedata,gamedivs);
	}
//初始化
var init = function(doms, type, dir){
	gamediv = doms.gamediv;
	nextdiv = doms.nextdiv;
	timediv = doms.timediv;
	scorediv = doms.scorediv;
	resultdiv = doms.resultdiv;
	next = SquareFactory.prototype.make(type, dir);
	initdiv(gamediv, gamedata, gamedivs);
	initdiv(nextdiv, next.data, nextdivs);
	refreshdiv(next.data, nextdivs);
	}
	//导出api
	this.init=init;
	this.down=down;
	this.left=left;
	this.right=right;
	this.rotate=rotate;
	this. fall = function(){while(down());};
	this.fixed = fixed;
	this.performNext = performNext;
	this.checkClear = checkClear;
	this.checkGameOver = checkGameOver;
	this.setTime = setTime;
	this.addScore = addScore;
	this.gameover = gameover;
	this.addTailLines = addTailLines;
	}
