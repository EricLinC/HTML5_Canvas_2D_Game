//=====================================================
//	state define
//=====================================================
const NUM_STATES = 1;	// no include pause state

const PLAY = 0;

	
function GameStateManager(handler) {
	
	//=====================================================
	//	configure
	//=====================================================
	this.paused = false;
	this.pauseState = null;
	
	this.handler = handler;
	this.gameStates = [];
	this.currentState = 0;
	this.previousState = 0;
	
	//=====================================================
	//	state change
	//=====================================================
	
	//-----------------------------------------------------
	//
	//	setState
	//
	this.setState = function(state_code) {
		this.previousState = this.currentState;
		this.currentState = state_code;
		
		this.gameStates[this.currentState].reset_state();
	};
	
	//-----------------------------------------------------
	//
	//	setPause
	//
	this.setPause = function(b) {
		this.paused = b;
	};
	
	//=====================================================
	//	init, update, render, resetState
	//=====================================================
	
	//-----------------------------------------------------
	//
	//	init
	//
	this.init = function() {
		this.pauseState = new PauseState(this.handler);
		this.gameStates[0] = new PlayState(this.handler);
		this.gameStates[0].init();
		this.setPause(PLAY);
	};
	
	//-----------------------------------------------------
	//
	//	update
	//
	this.update = function() {
		if(this.paused) {
			this.pauseState.update();
		}
		else if(this.gameStates[this.currentState] != null) {
			this.gameStates[this.currentState].update();
		}
	};
	
	//-----------------------------------------------------
	//
	//	render
	//
	this.render = function(ctx) {
		if(this.paused) {
			this.pauseState.render(ctx);
		}
		else if(this.gameStates[this.currentState] != null) {
			this.gameStates[this.currentState].render(ctx);
		}
	};
	
	//-----------------------------------------------------
	//
	//	resetState
	//
	this.resetState = function() {
		
	};
}