//=====================================================
//	Key code
//=====================================================
const UP_CODE = 38;
const LEFT_CODE = 37;
const DOWN_CODE = 40;
const RIGHT_CODE = 39;
const Z_CODE = 90;
const X_CODE = 88;
const SPACE_CODE = 32;
const ENTER_CODE = 13;
const ESCAPE_CODE = 27;

//=====================================================
//	Key define
//=====================================================
const NUM_KEYS = 9;

const UP_KEY = 0;
const LEFT_KEY = 1;
const DOWN_KEY = 2;
const RIGHT_KEY = 3;
const Z_KEY = 4;
const X_KEY = 5;
const SPACE_KEY = 6;
const ENTER_KEY = 7;
const ESCAPE_KEY = 8;


var KeyManager = {
	
	//=====================================================
	//	Key states
	//=====================================================
	keyState: [],
	preKeyState: [],
	anyKeyState: false,
	preAnyKeyState: false,
	
	//=====================================================
	//	inner use
	//=====================================================
	
	//-----------------------------------------------------
	//
	//	keySet: set current key up or down
	//
	keySet: function(keyCode, b) {
		if(keyCode == UP_CODE) 			KeyManager.keyState[UP_KEY] = b;
		else if(keyCode == LEFT_CODE) 	KeyManager.keyState[LEFT_KEY] = b;
		else if(keyCode == DOWN_CODE) 	KeyManager.keyState[DOWN_KEY] = b;
		else if(keyCode == RIGHT_CODE) 	KeyManager.keyState[RIGHT_KEY] = b;
		else if(keyCode == Z_CODE) 		KeyManager.keyState[Z_KEY] = b;
		else if(keyCode == X_CODE) 		KeyManager.keyState[X_KEY] = b;
		else if(keyCode == SPACE_CODE) 	KeyManager.keyState[SPACE_KEY] = b;
		else if(keyCode == ENTER_CODE) 	KeyManager.keyState[ENTER_KEY] = b;
		else if(keyCode == ESCAPE_CODE) KeyManager.keyState[ESCAPE_KEY] = b;
	},
	
	//-----------------------------------------------------
	//
	//	init
	//
	init: function() {
		var i;
		for(i = 0; i < NUM_KEYS; i++) {
			KeyManager.keyState[i] = false;
			KeyManager.preKeyState[i] = false;
		}
		
		document.addEventListener("keydown", function(e){	
			var key = e.keyCode;
			KeyManager.anyKeyState = true;
			KeyManager.keySet(key, true);
		});
		
		document.addEventListener("keyup", function(e){
			var key = e.keyCode;
			KeyManager.anyKeyState = false;
			KeyManager.keySet(key, false);
		});
		
		return true;
	},
	
	//-----------------------------------------------------
	//
	//	update: in MyGame update, it should be putted behind other handleEvent
	//
	update: function() {
		var i;
		KeyManager.preAnyKeyState = KeyManager.anyKeyState;
		for(i = 0; i < NUM_KEYS; i++) {
			KeyManager.preKeyState[i] = KeyManager.keyState[i];
		}
	},
	
	//=====================================================
	//	public method
	//=====================================================
	
	//-----------------------------------------------------
	//
	//	isPressed: Push one time
	//
	isPressed: function(key) {
		return KeyManager.keyState[key] && !KeyManager.preKeyState[key];
	},
	
	//-----------------------------------------------------
	//
	//	isDown: used to check keeping Key 
	//
	isDown: function(key) {
		return KeyManager.keyState[key];
	},
	
	//-----------------------------------------------------
	//
	//	anyKeyDown
	//
	anyKeyDown: function() {
		/*
		var i;
		for(i = 0; i < NUM_KEYS; i++) {
			if(KeyManager.keyState[i])	return true;
		}
		*/
		if(KeyManager.anyKeyState)	return true;
		return false;
	},
	
	//-----------------------------------------------------
	//
	//	anyKeyPress
	//
	anyKeyPress: function() {
		/*
		var i;
		for(i = 0; i < NUM_KEYS; i++) {
			if(KeyManager.keyState[i] && !KeyManager.preKeyState[i])	return true;
		}
		*/
		if(KeyManager.anyKeyState && !KeyManager.preAnyKeyState)	return true;
		return false;
	}
};