function MyGame(canvasId, tileSize) {
	
	//=====================================================
	//	Game object configure
	//=====================================================
	this.canvas = document.getElementById(canvasId);
	this.ctx = this.canvas.getContext("2d");
	this.tileSize = tileSize;
	
	this.running = false;
	this.handler = new Handler(this);
	this.gameCamera = new GameCamera(this.handler, 0, 0);
	this.gsm = new GameStateManager(this.handler);
	
	
	//=====================================================
	//	Game body
	//=====================================================
	
	//-----------------------------------------------------
	//
	//	init
	//
	this.init = function() {
		KeyManager.init();
		this.gsm.init();
	};
	
	//-----------------------------------------------------
	//
	//	update
	//
	this.update = function() {
		
		/*
		//
		// use for test
		//
		if(KeyManager.isPressed(Z_KEY))  	 console.log("Z_KEY is pressed.");
		if(KeyManager.isPressed(X_KEY))  	 console.log("X_KEY is pressed.");
		if(KeyManager.isPressed(SPACE_KEY))  console.log("SPACE_KEY is pressed.");
		if(KeyManager.isPressed(ENTER_KEY))  console.log("ENTER_KEY is pressed.");
		if(KeyManager.isPressed(ESCAPE_KEY)) console.log("ESCAPE_KEY is pressed.");
		if(KeyManager.isDown(LEFT_KEY))      console.log("LEFT_KEY is down.");
		if(KeyManager.isDown(RIGHT_KEY))     console.log("RIGHT_KEY is down.");
		if(KeyManager.isDown(UP_KEY)) 	     console.log("UP_KEY is down.");
		if(KeyManager.isDown(DOWN_KEY))      console.log("DOWN_KEY is down.");
		//if(KeyManager.anyKeyPress())  console.log("anyKey is pressed.");
		//if(KeyManager.anyKeyDown())   console.log("anyKey is down.");
		*/
		
		this.gsm.update();
		// should put behind other handleEvent
		KeyManager.update();
	};
	
	//-----------------------------------------------------
	//
	//	render
	//
	this.render = function() {
		// background
		this.ctx.fillStyle = "#000000";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.gsm.render(this.ctx);
	};
	
	//-----------------------------------------------------
	//
	//	loop
	//
	this.loop = function() {
		if(this.running){
			this.update();
			this.render();
		}
		window.requestAnimationFrame(this.loop.bind(this));
	};
	
	//=====================================================
	//	Start, Stop, Run
	//=====================================================
	
	//-----------------------------------------------------
	//
	//	run
	//
	this.run = function() {
		
		console.log("[init...]");
		this.init();
		window.requestAnimationFrame(this.loop.bind(this));
	};
	
	//-----------------------------------------------------
	//
	//	stop
	//
	this.stop = function() {
		if(!this.running)
			return;
		this.running = false;
	};
	
	//-----------------------------------------------------
	//
	//	start
	//
	this.start = function() {
		if(this.running)
			return;
		this.running = true;
		console.log("[start the game]");
		this.run();
	};
	
	//=====================================================
	//	other method
	//=====================================================
	
	//-----------------------------------------------------
	//
	//	resetCanvasSize
	//
	this.resetCanvasSize = function(width, height) {
		this.canvas.width = width;
		this.canvas.height = height;
	};
}


//=====================================================
//
//	Handler: help other object to get something
//
//=====================================================
function Handler(game) {
	
	this.game = game;
	
	this.getGame = function() {
		return this.game;
	};
	
	this.getTileSize = function() {
		return this.game.tileSize;
	};
	
	this.getTileMap = function() {
		return this.game.gsm.gameStates[PLAY].tileMap;
	};
	
	this.getGameCamera = function() {
		return this.game.gameCamera;
	};
	
	this.getGameStateManager = function() {
		return this.game.gsm;
	};
	
	this.getCanvasWidth = function() {
		return this.game.canvas.width;
	};
	
	this.getCanvasHeight = function() {
		return this.game.canvas.height;
	};
	
	this.setPlayerMovable = function(b) {
		this.game.gsm.gameStates[PLAY].player.canMove = b;
	};
	
}