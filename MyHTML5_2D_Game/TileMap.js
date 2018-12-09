//=====================================================
//
//	Tile
//
//=====================================================
function Tile() {
	
	this.type = NORMAL;
	this.Text = "";
	this.backgroundColor = "#000000";
	this.textColor = "#FFFFFF";
	
	this.getType = function() {
		return this.type;
	};
}

//=====================================================
//
//	TileMap
//
//=====================================================
function TileMap(handler) {
	
	// index in canvas
	this.tileMap_x = 0;
	this.tileMap_y = 0;
	this.tileMap_show_width = 0;
	this.tileMap_show_height = 0;
	
	this.mapRow = 0;	// width
	this.mapCol = 0;	// height
	this.init_X = 0;	// player init index
	this.init_Y = 0;
	
	this.handler = handler;
	this.tileMap_show_width = this.handler.getCanvasWidth();
	this.tileMap_show_height = this.handler.getCanvasHeight();
	this.tileImages = []; // tile
	this.map = [];		// tile id
	
	
	//=====================================================
	//	update, render
	//=====================================================
	
	//-----------------------------------------------------
	//
	//	update
	//
	this.update = function() {
		
	};
	
	//-----------------------------------------------------
	//
	//	render
	//
	this.render = function(ctx) {
		var i, j;
		var size = this.handler.getTileSize();
		
		/*
		var xStart = 0;
		var xEnd = this.mapRow;
		var yStart = 0;
		var yEnd = this.mapCol;
		*/
		
		var xStart = Math.max(0, Math.floor(this.handler.getGameCamera().getXOffset() / size));
		var xEnd = Math.min(this.handler.getTileMap().mapRow, Math.floor((this.handler.getGameCamera().getXOffset() + this.handler.getCanvasWidth()) / size) + 1);
		var yStart = Math.max(0, Math.floor(this.handler.getGameCamera().getYOffset() / size));
		var yEnd = Math.min(this.handler.getTileMap().mapCol, Math.floor((this.handler.getGameCamera().getYOffset() + this.handler.getCanvasHeight()) / size) + 1);
		
		for(i=yStart; i<yEnd; i++) {
			for(j=xStart; j<xEnd; j++) {
				ctx.fillStyle = this.getTile(i, j).backgroundColor;
				ctx.fillRect(this.tileMap_x + j*size - this.handler.getGameCamera().getXOffset(), 
							 this.tileMap_y + i*size - this.handler.getGameCamera().getYOffset(), 
							 size, size);
				
				ctx.fillStyle = this.getTile(i, j).textColor;
				ctx.textBaseline = "middle";
				ctx.textAlign = "center";
				ctx.font = size+"px serif";
				ctx.fillText(this.getTile(i, j).Text, 
							 this.tileMap_x + j*size - this.handler.getGameCamera().getXOffset() + size/2, 
							 this.tileMap_y + i*size - this.handler.getGameCamera().getYOffset() + size/2);
			}
		}
	};
	
	//=====================================================
	//	Tile methods
	//=====================================================
	
	//-----------------------------------------------------
	//
	//	getMapWidth
	//
	this.getMapWidth = function() {
		return this.mapRow*this.handler.getTileSize();
	};
	
	//-----------------------------------------------------
	//
	//	getMapHeight
	//
	this.getMapHeight = function() {
		return this.mapCol*this.handler.getTileSize();
	};
	
	//-----------------------------------------------------
	//
	//	getPlayerInitX
	//
	this.getPlayerInitX = function() {
		return this.init_X*this.handler.getTileSize();
	};
	
	//-----------------------------------------------------
	//
	//	getPlayerInitY
	//
	this.getPlayerInitY = function() {
		return this.init_Y*this.handler.getTileSize();
	};
	
	//-----------------------------------------------------
	//
	//	getTile
	//
	this.getTile = function(x, y) {
		var id = this.map[x][y]
		return this.tileImages[id];
	};
	
	//-----------------------------------------------------
	//
	//	getType
	//
	this.getType = function(rowTile, colTile) {
		var id = this.map[colTile][rowTile];
		return this.tileImages[id].getType();
	};
	
	//-----------------------------------------------------
	//
	//	loadMap
	//
	this.loadMap = function(mapText, tileDefine) {
		var t = "";
	    var mapArray = [];
		var i, j;
		
		this.mapRow = mapText.mapRow;
		this.mapCol = mapText.mapCol;
		this.init_X = mapText.init_X;
		this.init_Y = mapText.init_Y;
		t = mapText.data;
		mapArray = t.split(" ");
		
		for(i=0; i<this.mapCol; i++) {
			this.map[i] = [];
			for(j=0; j<this.mapRow; j++) {
				this.map[i][j] = mapArray[i*this.mapRow + j];
			}
		}
		
		// init Tiles
		for(i=0; i<tileDefine.length; i++) {
			this.tileImages[i] = new Tile();			
			this.tileImages[i].type = tileDefine[i].type;
			this.tileImages[i].Text = tileDefine[i].Text;
			this.tileImages[i].backgroundColor = tileDefine[i].backgroundColor;
			this.tileImages[i].textColor = tileDefine[i].textColor;
		}
	};
	
}