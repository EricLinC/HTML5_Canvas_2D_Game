//=====================================================
//
//	Entity
//
//=====================================================
function Entity(handler, tileImage, x, y) {
	
	// handler
	this.handler = handler;
	
	// position
	this.x = x;
	this.y = y;
	// next position
	this.xdest = x;
	this.ydest = y;
	this.rowTile = this.x / this.handler.getTileSize();
	this.colTile = this.y / this.handler.getTileSize();
	
	// movement
	this.moving = false;
	this.moveSpeed = 0;
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	
	// show in map
	this.show = false;
	this.isExistence = true;
	this.tileImage = tileImage;
	
	
	//=====================================================
	//	update, render
	//=====================================================
	
	//-----------------------------------------------------
	//
	//	update
	//
	this.update = function() {
		/*
		// get next position
		if(this.moving) this.getNextPosition();
		
		// check stop moving
		if(this.x == this.xdest && this.y == this.ydest) {
			this.left = this.right = this.up = this.down = this.moving = false;
			
			this.rowTile = this.x / this.handler.getTileMap();
			this.colTile = this.y / this.handler.getTileMap();
		}
		*/
	};
	
	//-----------------------------------------------------
	//
	//	render
	//
	this.render = function(ctx) {
		if(!this.show) return;
		
		var size = this.handler.getTileSize();
		var tileMap_x = this.handler.getTileMap().tileMap_x;
		var tileMap_y = this.handler.getTileMap().tileMap_y;
		ctx.fillStyle = this.tileImage.backgroundColor;
		ctx.fillRect(tileMap_x + this.x - this.handler.getGameCamera().getXOffset(), 
					 tileMap_y + this.y - this.handler.getGameCamera().getYOffset(), 
					 size, size);
				
		ctx.fillStyle = this.tileImage.textColor;
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = size+"px serif";
		ctx.fillText(this.tileImage.Text, 
					 tileMap_x + this.x - this.handler.getGameCamera().getXOffset() + size/2, 
					 tileMap_y + this.y - this.handler.getGameCamera().getYOffset() + size/2);
	};
	
	//=====================================================
	//	control methods
	//=====================================================
	this.getX = function() {return this.x;};
	this.setX = function(x) {
		this.x = x;
		this.xdest = x;
	};
	this.getY = function() {return this.y;};
	this.setY = function(y) {
		this.y = y;
		this.ydest = y;
	};
	this.getShow = function() {return this.show;};
	this.setShow = function(b) {this.show = b;};
	
	//-----------------------------------------------------
	//
	//	methods for player control to move
	//
	this.setLeft = function() {
		if(this.moving) return;
		this.left = true;
		this.moving = this.validateNextPosition();
	};
	
	this.setRight = function() {
		if(this.moving) return;
		this.right = true;
		this.moving = this.validateNextPosition();
	};
	
	this.setUp = function() {
		if(this.moving) return;
		this.up = true;
		this.moving = this.validateNextPosition();
	};
	
	this.setDown = function() {
		if(this.moving) return;
		this.down = true;
		this.moving = this.validateNextPosition();
	};
	
	//-----------------------------------------------------
	//
	// Returns whether or not the entity can
	// move into the next position.
	//
	//-----------------------------------------------------
	this.validateNextPosition = function() {
		
		if(this.moving) return true;
		
		var tileSize = this.handler.getTileSize();
		var tileMap = this.handler.getTileMap();
		this.rowTile = this.x / tileSize;
		this.colTile = this.y / tileSize;
		
		if(this.left) {
			if(this.rowTile == 0 || tileMap.getType(this.rowTile-1, this.colTile) == BLOCKED) {
				return false;
			}
			else {
				this.xdest = this.x - tileSize;
			}
		}
		if(this.right) {
			if(this.rowTile == tileMap.mapRow-1 || tileMap.getType(this.rowTile+1, this.colTile) == BLOCKED) {
				return false;
			}
			else {
				this.xdest = this.x + tileSize;
			}
		}
		if(this.up) {
			if(this.colTile == 0 || tileMap.getType(this.rowTile, this.colTile-1) == BLOCKED) {
				return false;
			}
			else {
				this.ydest = this.y - tileSize;
			}
		}
		if(this.down) {
			if(this.colTile == tileMap.mapCol+1 || tileMap.getType(this.rowTile, this.colTile+1) == BLOCKED) {
				return false;
			}
			else {
				this.ydest = this.y + tileSize;
			}
		}
		
		return true;
		
	};
	
	//-----------------------------------------------------
	//
	// Calculates the destination coordinates.
	//
	//-----------------------------------------------------
	this.getNextPosition = function() {
		
		if(this.left && this.x > this.xdest) this.x -= this.moveSpeed;
		else this.left = false;
		if(this.left && this.x < this.xdest) this.x = this.xdest;
		
		if(this.right && this.x < this.xdest) this.x += this.moveSpeed;
		else this.right = false;
		if(this.right && this.x > this.xdest) this.x = this.xdest;
		
		if(this.up && this.y > this.ydest) this.y -= this.moveSpeed;
		else this.up = false;
		if(this.up && this.y < this.ydest) this.y = this.ydest;
		
		if(this.down && this.y < this.ydest) this.y += this.moveSpeed;
		else this.down = false;
		if(this.down && this.y > this.ydest) this.y = this.ydest;
		
	}
	
	//-----------------------------------------------------
	//
	//	setExistence
	//
	this.setExistence = function(b) {
		if(b) {
			this.isExistence = true;
			this.show = true;
		} else {
			this.isExistence = false;
			this.show = false;
		}
	};
}

//=====================================================
//	Player
//=====================================================
function Player(handler, name) {
	this.prototype = Entity;
	this.prototype(handler, EntityDefine[0], 0, 0);
	
	this.moveSpeed = this.handler.getTileSize()/10;
	this.canMove = true;
	this.name = name;
	
	this.sayHello = function() {
		console.log("Hi! My name is " + this.name + ".");
	};
	
	this.update = function() {
		// get next position
		if(this.moving) this.getNextPosition();
		
		// check stop moving
		if(this.x == this.xdest && this.y == this.ydest) {
			this.left = this.right = this.up = this.down = this.moving = false;
			
			this.rowTile = this.x / this.handler.getTileMap();
			this.colTile = this.y / this.handler.getTileMap();
		}
	};
}



