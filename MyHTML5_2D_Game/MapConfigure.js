//=====================================================
// tile types: player can pass or not
//=====================================================
const NORMAL = 0;
const BLOCKED = 1;

//=====================================================
// Tile configure
//=====================================================
var TileDefine = [
	// (0) no building
	{type: NORMAL, Text: ' ', backgroundColor: "#000000", textColor: "#FFFFFF"},
	
	// (1) up and down wall
	{type: BLOCKED, Text: '\u{2501}', backgroundColor: "#000000", textColor: "#FFFFFF"},
	// (2) left and right wall
	{type: BLOCKED, Text: '\u{2503}', backgroundColor: "#000000", textColor: "#FFFFFF"},
	// (3) up-left wall
	{type: BLOCKED, Text: '\u{250F}', backgroundColor: "#000000", textColor: "#FFFFFF"},
	// (4) up-right wall
	{type: BLOCKED, Text: '\u{2513}', backgroundColor: "#000000", textColor: "#FFFFFF"},
	// (5) down-left wall
	{type: BLOCKED, Text: '\u{2517}', backgroundColor: "#000000", textColor: "#FFFFFF"},
	// (6) down-right wall
	{type: BLOCKED, Text: '\u{251B}', backgroundColor: "#000000", textColor: "#FFFFFF"},
	// (7) (up-down-right) wall
	{type: BLOCKED, Text: '\u{2523}', backgroundColor: "#000000", textColor: "#FFFFFF"},
	// (8) (up-down-left) wall
	{type: BLOCKED, Text: '\u{252B}', backgroundColor: "#000000", textColor: "#FFFFFF"},
	// (9) (left-right-up) wall
	{type: BLOCKED, Text: '\u{253B}', backgroundColor: "#000000", textColor: "#FFFFFF"},
	// (10) (left-right-down) wall
	{type: BLOCKED, Text: '\u{2533}', backgroundColor: "#000000", textColor: "#FFFFFF"},
	// (11) (center) wall
	{type: BLOCKED, Text: '\u{254B}', backgroundColor: "#000000", textColor: "#FFFFFF"},
	
	// (12) stone
	{type: BLOCKED, Text: '@', backgroundColor: "#000000", textColor: "#AAAAAA"},
	
	// (13) door
	{type: NORMAL, Text: '\u{254B}', backgroundColor: "#000000", textColor: "#FFFF00"},
	
	// (14) up arrow
	{type: NORMAL, Text: '\u{2191}', backgroundColor: "#000000", textColor: "#FFFF00"},
	// (15) down arrow
	{type: NORMAL, Text: '\u{2193}', backgroundColor: "#000000", textColor: "#FFFF00"},
	// (16) left arrow
	{type: NORMAL, Text: '\u{2190}', backgroundColor: "#000000", textColor: "#FFFF00"},
	// (17) right arrow
	{type: NORMAL, Text: '\u{2192}', backgroundColor: "#000000", textColor: "#FFFF00"},
];

//=====================================================
// Entity configure
//=====================================================
var EntityDefine = [
	// player (smile)
	{type: BLOCKED, Text: '\u{263A}', backgroundColor: "#000000", textColor: "#FFFF00"},
];

