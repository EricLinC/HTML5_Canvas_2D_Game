//=====================================================
//	GameState interface
//=====================================================
function GameState(handler) {
	this.handler = handler;
	this.gsm = this.handler.getGameStateManager();
}

//-----------------------------------------------------
//
//	(1) init
//
GameState.prototype.init = function() {};

//-----------------------------------------------------
//
//	(2) update
//
GameState.prototype.update = function() {};

//-----------------------------------------------------
//
//	(3) render
//
GameState.prototype.render = function(ctx) {};

//-----------------------------------------------------
//
//	(4) reset_state
//
GameState.prototype.reset_state = function() {};

//-----------------------------------------------------
//
//	(5) handleInput
//
GameState.prototype.handleInput = function() {};


//=====================================================
//	PauseState
//=====================================================
function PauseState(handler) {
	this.prototype = GameState;
	this.prototype(handler);
	
	//-----------------------------------------------------
	//
	//	update
	//
	this.update = function() {
		this.handleInput();
	};
	
	//-----------------------------------------------------
	//
	//	render
	//
	this.render = function(ctx) {
		// background
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, this.handler.getCanvasWidth(), this.handler.getCanvasHeight());
		
		// text
		ctx.fillStyle = "#FFFFFF";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = (this.handler.getTileSize()+10)+"px serif";
		ctx.fillText("[Pause]", this.handler.getCanvasWidth()/2, 
							  this.handler.getCanvasHeight()/2-(this.handler.getTileSize()+10)/2);
		ctx.font = (this.handler.getTileSize())+"px serif";
		ctx.fillText("please press any key", this.handler.getCanvasWidth()/2, 
							  this.handler.getCanvasHeight()/2+(this.handler.getTileSize()+10)/2);
	};
	
	//-----------------------------------------------------
	//
	//	handleInput
	//
	this.handleInput = function() {
		if(KeyManager.anyKeyPress()) {
			this.gsm.setPause(false);
		}
	};
}

//=====================================================
//	PlayState
//=====================================================
function PlayState(handler) {
	this.prototype = GameState;
	this.prototype(handler);
	
	this.blockInput = false;
	this.debugMode = false;
	
	this.tileMap = new TileMap(handler);
	this.player = new Player(handler, "Eric Lin");
	
	
	//-----------------------------------------------------
	//
	//	init
	//
	this.init = function() {
		this.tileMap.loadMap(MapDefine, TileDefine);
		
		// set player init index
		this.player.setX(this.tileMap.getPlayerInitX());
		this.player.setY(this.tileMap.getPlayerInitY());
		console.log("[" + this.tileMap.getPlayerInitX() + "," + this.tileMap.getPlayerInitY() +"]");
		
		this.player.setShow(true);
	};
	
	//-----------------------------------------------------
	//
	//	update
	//
	this.update = function() {
		this.handleInput();
		
		this.tileMap.update();
		this.player.update();
		this.handler.getGameCamera().centerOnEntity(this.player);
	};
	
	//-----------------------------------------------------
	//
	//	render
	//
	this.render = function(ctx) {
		// background
		ctx.fillStyle = "#00FFFF";
		ctx.fillRect(0, 0, this.handler.getCanvasWidth(), this.handler.getCanvasHeight());
		
		this.tileMap.render(ctx);
		this.player.render(ctx);
		
		// Debug Mode
		if(this.debugMode) {
			ctx.fillStyle = "#000000";
			ctx.fillRect(0, 0, 80, 80);
			var ss = 15, add = 15;
			ctx.fillStyle = "#FFFFFF";
			ctx.textBaseline = "bottom";
			ctx.textAlign = "left";
			ctx.font = ss+"px serif";
			
			var size = this.handler.getTileSize();
			var xStart = Math.max(0, Math.floor(this.handler.getGameCamera().getXOffset() / size));
			var xEnd = Math.min(this.handler.getTileMap().mapRow, Math.floor((this.handler.getGameCamera().getXOffset() + this.handler.getCanvasWidth()) / size) + 1);
			var yStart = Math.max(0, Math.floor(this.handler.getGameCamera().getYOffset() / size));
			var yEnd = Math.min(this.handler.getTileMap().mapCol, Math.floor((this.handler.getGameCamera().getYOffset() + this.handler.getCanvasHeight()) / size) + 1);
			
			ctx.fillText("xStart: " + xStart, 0, ss);
			ss += add;
			ctx.fillText("xEnd: " + xEnd, 0, ss);
			ss += add;
			ctx.fillText("yStart: " + yStart, 0, ss);
			ss += add;;
			ctx.fillText("yEnd: " + yEnd, 0, ss);
		}
		
	};
	
	//-----------------------------------------------------
	//
	//	handleInput
	//
	this.handleInput = function() {
		if(KeyManager.isPressed(SPACE_KEY)) {
			this.gsm.setPause(true);
		}
		
		if(KeyManager.isPressed(ENTER_KEY)) {
			if(!this.debugMode) this.debugMode = true;
			else this.debugMode = false;
		}
		
		if(this.blockInput) return;
		
		// Action
		if(KeyManager.isDown(LEFT_KEY)) {
			if(this.player.canMove)
				this.player.setLeft();
		}
		
		if(KeyManager.isDown(RIGHT_KEY)) {
			if(this.player.canMove)
				this.player.setRight();
		}
		
		if(KeyManager.isDown(UP_KEY)) {
			if(this.player.canMove)
				this.player.setUp();
		}
		
		if(KeyManager.isDown(DOWN_KEY)) {
			if(this.player.canMove)
				this.player.setDown();
		}
	};
}



