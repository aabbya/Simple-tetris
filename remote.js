var Remote = function(socket){
//游戏对象
	var game;
	//绑定按钮
	var bindEvents = function(){
		socket.on('init', function(data){
			start(data.type, data.dir);
		});
		socket.on('next', function(data){
			game.performNext(data.type, data.dir);
		});
		socket.on('rotate', function(data){
			game.rotate();
		});
		socket.on('right', function(data){
			game.right();
		});
		socket.on('down', function(data){
			game.down();
		});
		socket.on('left', function(data){
			game.left();
		});
		socket.on('fixed', function(data){
			game.fixed();
		});
		socket.on('fall', function(data){
			game.fall();
		});
		socket.on('line', function(data){
			game.checkClear();
			game.addScore(data);
		});
		socket.on('time', function(data){
			game.setTime(data);
		});
		socket.on('lose', function(data){
			game.gameover(false);
		});
		socket.on('addTailLines', function(data){
			game.addTailLines(data);
		});
	};
	//start
	var start = function(type, dir){
		var doms = {
			gamediv: document.getElementById('remote_game'),
			nextdiv: document.getElementById('remote_next'),
			timediv: document.getElementById('remote_time'),
			scorediv: document.getElementById('remote_score'),
			resultdiv: document.getElementById('remote_gameover')
		}
		game=new Game();
		game.init(doms, type, dir);
	}
	bindEvents();
}
