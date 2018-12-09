//=====================================================
//
//	GameCamera
//
//=====================================================
function GameCamera(handler, xOffset, yOffset) {
	
	this.handler = handler;
	this.xOffset = xOffset;
	this.yOffset = yOffset;
	
	
	//=====================================================
	//	control methods
	//=====================================================
	this.checkBlankSpace = function(){
		if(this.xOffset < 0) {
			this.xOffset = 0;
		} else if (this.xOffset > this.handler.getTileMap().getMapWidth() - this.handler.getCanvasWidth()) {
			this.xOffset = this.handler.getTileMap().getMapWidth() - this.handler.getCanvasWidth();
		}
		
		if(this.yOffset < 0) {
			this.yOffset = 0;
		} else if (this.yOffset > this.handler.getTileMap().getMapHeight() - this.handler.getCanvasHeight()) {
			this.yOffset = this.handler.getTileMap().getMapHeight() - this.handler.getCanvasHeight();
		}
	};
	
	this.centerOnEntity = function(entity) {
		this.xOffset = entity.x - this.handler.getCanvasWidth() / 2 + this.handler.getTileSize() / 2;
		this.yOffset = entity.y - this.handler.getCanvasHeight() / 2 + this.handler.getTileSize() / 2;
		this.checkBlankSpace();
	};
	
	this.move = function(xAmt, yAmt) {
		this.xOffset += xAmt;
		this.yOffset += yAmt;
		this.checkBlankSpace();
	};
	
	//=====================================================
	//	get, set methods
	//=====================================================
	this.getXOffset = function() {
		return this.xOffset;
	};
	
	this.setXOffset = function(xOffset) {
		this.xOffset = xOffset;
	};
	
	this.getYOffset = function() {
		return this.yOffset;
	};
	
	this.setYOffset = function(yOffset) {
		this.yOffset = yOffset;
	};
}