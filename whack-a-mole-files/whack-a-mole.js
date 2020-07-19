function setup() {
	createCanvas(600, 600);
	frameRate(60);
	colorMode(RGB, 255);
	
	
	
	
	
	
	
	

	/*-------
	constants
	--------*/
	// repurposed from khan academy for general use 
	var molePosX = [width * 0.5, width * 0.175, width * 0.75, width * 0.75, width * 0.25];
	var molePosY = [height * 0.45, height * 0.25, height * 0.2, height * 0.825, height * 0.75];

	var holePosX = [width * 0.5, width * 0.175, width * 0.75, width * 0.75, width * 0.25];
	var holePosY = [height * 0.5, height * 0.3, height * 0.25, height * 0.875, height * 0.8];
	var holeWidth = width * 0.25;
	var holeHeight = height * 0.075;

	// variables used for repurposing (since khan academy's screen is 400 by 400 px)
	// variable names are the actual number I would use in a 40X40 screen

	var intOneHalfX = width * 0.0125; // half of one = 0.5
	var intOneHalfY = height * 0.0125;

	var intOneX = width * 0.025;
	var intOneY = height * 0.025;

	var intTwoX = width * 0.05;
	var intTwoY = height * 0.05;

	var intThreeHalfX = width * 0.0375; // half of three = 1.5
	var intThreeHalfY = height * 0.0375;

	var intThreeX = width * 0.075;
	var intThreeY = height * 0.075;

	var intFourX = width * 0.1;
	var intFourY = height * 0.1;

	var intFiveX = width * 0.125;
	var intFiveY = height * 0.125;

	var intSixX = height * 0.15;
	var intSixY = height * 0.15;

	//var leaf = getImage("avatars/leaf-yellow"); //repurpose
	//var star = getImage("cute/Star"); //repurpose

	// constant menu background (kinda)
	var drawMenuBg = function(mole, goldMole, bomb) {
		background(130, 240, 255);
		stroke(0, 0, 0);
		
		// dirt
		fill(210, 80, 0);
		strokeWeight(width * 0.0025);
		rect(0, height * 0.8, width, height * 0.2);
		
		// grass
		fill(70, 255, 0);
		for (var i = 0; i < 1; i += 0.01) {
			triangle(width * i, height * 0.8, width * (i + 0.01), height * 0.8, width * (i + 0.005), height * 0.9); 
			
		}
		
		// dirt to cover corners
		noStroke();
		fill(210, 80, 0);
		rect(0, height * 0.86, width, height * 0.1);
		
		// sun
		fill(255, 200, 0);
		ellipse(0, 0, width * 0.5, height * 0.5);
		
		// holes
		fill(100, 60, 2, 230);
		ellipse(width * 0.15, height * 0.8, holeWidth, holeHeight);
		ellipse(width * 0.5, height * 0.8, holeWidth, holeHeight);
		ellipse(width * 0.85, height * 0.8, holeWidth, holeHeight);
		
		// moles/bombs
		mole(width * 0.15, height * 0.75);
		goldMole(width * 0.5, height * 0.75);
		bomb(width * 0.85, height * 0.75);
	};

	// constant game background
	var drawGameBg = function() {
		// green background
		background(52, 168, 83); 
		
		// holes
		fill(100, 60, 2);
		ellipse(holePosX[0], holePosY[0], holeWidth, holeHeight); 
		ellipse(holePosX[1], holePosY[1], holeWidth, holeHeight);
		ellipse(holePosX[2], holePosY[2], holeWidth, holeHeight);
		ellipse(holePosX[3], holePosY[3], holeWidth, holeHeight);
		ellipse(holePosX[4], holePosY[4], holeWidth, holeHeight);
	};

	/*--------------
	global variables
	--------------*/

	// global variable to store the final score
	var finalScore;

	// global variable to keep track of game scenes
	var currentScene = "menu";

	// global variable for storing the frame count before the game is started
	var lastFrameCount;

	// global variable for storing frame count during the game
	var frames;

	// global variable for checking if the mouse is pressed (mallet)
	var malletSwung;

	// global variable for checking frames before an action
	var framesBeforeAction;

	// global variable for storing the frame count after an action
	var framesSinceAction;

	// global variable for storing the countdown function
	var count;

	// global variable for storing the highest score
	var highScore = -1000;

	// global variable for storing lowest score
	var lowScore = 1000;

	/*--------
	Scoreboard
	----------*/
	/*var Scoreboard = function(scoreList, scoreNum) {
		this.scoreList = scoreList;
		this.scoreNum = scoreNum;
	};

	// score sorter
	Scoreboard.prototype.sort = function() {
		
	};

	// draw scoreboard
	Scoreboard.prototype.draw = function() {
		// make scrollbar
	};*/


	/*----
	Mallet
	-----*/

	//draw a mallet (MAY BE TEMPORARY AND REPLACED LATER)
	var drawMallet = function(x, y) {
		
		noStroke();
		
		// head
		fill(189, 100, 27);
		rect(x - intThreeHalfX, y - intTwoY, intFourX, intTwoY, 10);
		

		
		// handle
		fill(235, 242, 39);
		rect(x, y, intOneX, intTwoY);
	};


	/*------
	Objects
	-------*/
	// draw a regular mole
	var drawMole = function(moleX, moleY) {
		
		noStroke();
		
		// face
		fill(125, 90, 40);
		ellipse(moleX, moleY, intSixX, intSixY); 
		fill(255, 237, 209);
		ellipse(moleX, moleY + intOneY, intThreeX, intThreeY); 
		
		// eyes
		fill(0, 0, 0);
		ellipse(moleX - intOneX, moleY - intThreeHalfY, intOneX, intOneY); 
		ellipse(moleX + intOneX, moleY - intThreeHalfY, intOneX, intOneY);
		
		// nose
		ellipse(moleX, moleY - intOneHalfY, intOneX, intOneY); 
		
		// mouth
		ellipse(moleX, moleY + intOneY, intTwoX, intOneHalfY); 
	};

	//hit animation for mole
	var moleHitAnim = function(mHitX, mHitY) {
		
		// lines
		stroke(62, 75, 209);
		strokeWeight(intOneHalfX);
		line(mHitX, mHitY, mHitX - intTwoX, mHitY - intThreeY);
		line(mHitX, mHitY, mHitX + intTwoX, mHitY - intThreeY);
		line(mHitX, mHitY, mHitX, mHitY - intThreeY); 
		
		// leafs
		/*image(leaf, mHitX - intFourX, mHitY - intSixY, intThreeX, intThreeY); 
		image(leaf, mHitX + intTwoX, mHitY - intSixY, intThreeX, intThreeY); 
		image(leaf, mHitX - intOneX, mHitY - (height * 0.175), intThreeX, intThreeY); */
		
		
	};

	// draw a golden mole
	var drawGoldenMole = function(goldMoleX, goldMoleY) {
		
		noStroke();
		
		// face
		fill(176, 196, 28);
		ellipse(goldMoleX, goldMoleY, intSixX, intSixY); 
		fill(223, 29, 237);
		ellipse(goldMoleX, goldMoleY + intOneY, intThreeX, intThreeX); 
		
		// eyes
		fill(255, 0, 0);
		ellipse(goldMoleX - intOneX, goldMoleY - intThreeHalfY, intOneX, intOneY); 
		ellipse(goldMoleX + intOneX, goldMoleY - intThreeHalfY, intOneX, intOneY);
		
		// nose
		fill(39, 15, 196);
		ellipse(goldMoleX, goldMoleY - intOneHalfY, intOneX, intOneY); 
		
		// mouth
		fill(255, 0, 0);
		ellipse(goldMoleX, goldMoleY + intOneY, intTwoX, intOneHalfY);
	};

	//golden mole hit animation
	var goldenHitAnim = function(gHitX, gHitY) {
		
		// lines
		stroke(240, 240, 26);
		strokeWeight(intOneHalfX);
		line(gHitX, gHitY, gHitX - intTwoX, gHitY - intThreeY);
		line(gHitX, gHitY, gHitX + intTwoX, gHitY - intThreeY);
		line(gHitX, gHitY, gHitX, gHitY - intThreeY); 
		
		// star
		/*image(star, gHitX - intFourX, gHitY - intSixY, intThreeX, intThreeY); 
		image(star, gHitX + intTwoX, gHitY - intSixY, intThreeX, intThreeY); 
		image(star, gHitX - intOneX, gHitY - (height * 0.175), intThreeX, intThreeY);*/ 
	};


	// draw a bomb 
	var drawBomb = function(bombX, bombY) {
		
		stroke(255, 146, 79);
		strokeWeight(width * 0.005);
		
		// sparks (left)
		var sparkPosX = intTwoX;
		var sparkPosY = height * 0.1375; //was 5.5 on a 40*40 screen
		while (sparkPosY < (height * 0.155)) {
			line(bombX + intThreeX, bombY - sparkPosY, bombX + sparkPosX, bombY - (sparkPosY + intTwoY));
			sparkPosX += width * 0.02;
			sparkPosY += height * 0.005;
		}
		
		// sparks (right)
		while (sparkPosX < (width * 0.23)) {
			line(bombX + intThreeX, bombY - sparkPosY, bombX + sparkPosX, bombY - (sparkPosY + intTwoY));
			sparkPosX += width * 0.02;
			sparkPosY -= height * 0.005;
		}

		// fuse
		stroke(125, 90, 40);
		strokeWeight(intOneX);
		bezier(bombX, bombY - intTwoY, bombX, bombY - intThreeY, bombX + intTwoX, bombY - intFourY, bombX + intThreeX, bombY - intSixY);
		
		noStroke();
		
		// bomb body
		fill(0, 0, 0);
		ellipse(bombX, bombY, intSixX, intSixY);
		
	};

	//bomb hit animation
	var bombHitAnim = function(bHitX, bHitY, flash) {
		
		var g = 0;
		var b = 0;
		
		// explosion layer 1 (explosion)
		if (flash) {
			g = 255;
			b = 255;
		}
		
		fill(255, g, b);
		triangle(bHitX, bHitY + intOneY, bHitX - intThreeX, bHitY + intOneY, bHitX - intSixX, bHitY - intThreeX);
		triangle(bHitX, bHitY + intOneY, bHitX - intThreeX, bHitY + intOneY, bHitX - intThreeX, bHitY - intFourY);
		triangle(bHitX - intTwoX, bHitY + intOneY, bHitX + intTwoX, bHitY + intOneY, bHitX, bHitY - intSixX);
		triangle(bHitX + intThreeX, bHitY + intOneY, bHitX, bHitY + intOneY, bHitX + intThreeX, bHitY - intFourY);
		triangle(bHitX + intThreeX, bHitY + intOneY, bHitX, bHitY + intOneY, bHitX + intSixX, bHitY - intThreeY);
		
		
		// explosion layer 2 (yellow)
		fill(220, 200, 0);
		triangle(bHitX - intThreeX, bHitY + intOneY, bHitX, bHitY + intOneY, bHitX - (width * 0.1125), bHitY - intThreeHalfY);
		triangle(bHitX, bHitY + intOneY, bHitX - intThreeHalfX, bHitY + intOneX, bHitX - intThreeX, bHitY - intTwoY);
		triangle(bHitX - intOneX, bHitY + intOneY, bHitX + intOneX, bHitY + intOneY, bHitX, bHitY - intThreeY);
		triangle(bHitX + intThreeHalfX, bHitY + intOneY, bHitX, bHitY + intOneX, bHitX + intThreeX, bHitY - intTwoY);
		triangle(bHitX + intThreeX, bHitY + intOneY, bHitX, bHitY + intOneY, bHitX + (width * 0.1125), bHitY - intThreeHalfY);
		
	};




	/*-------
	Main menu
	---------*/
	var Menu = function() {
		this.startButtonIsActive = false;
		this.exButtonIsActive = false;
		
		this.exX = width * 0.1;
		this.textExX = width * 0.16;
		this.textExY = height * 0.44;
		
		this.startX = width * 0.6;
		this.textStartX = width * 0.67;
		this.textStartY = height * 0.46;
		
		this.exStartX = width/4;
		this.exStartY = height * 0.875;
		this.exStartW = width/2;
		
		this.buttonY = height * 0.4;
		this.w = width * 0.25;
		this.h = height * 0.1;
		this.colorAnim = 0;
		this.buttonColorAnim = 0;
	};

	// draw start screen
	Menu.prototype.draw = function() {
		// draw menu background
		drawMenuBg(drawMole, drawGoldenMole, drawBomb);
		
		// draw title
		fill(255, 255, 255, this.colorAnim);
		textFont("cursive", height/10);
		text("Whack-A-Mole", width * 0.18, height * 0.3);
		
		this.colorAnim += 2;
		
		// draw explanation button
		fill(0, 153, 255, this.buttonColorAnim);
		if (this.exButtonIsActive) {
			fill(0, 0, 255);
		}
		rect(this.exX, this.buttonY, this.w, this.h);
		
		// draw explanation button text
		textFont("sans-serif", intThreeHalfX);
		fill(255, 0, 255, this.buttonColorAnim);
		text("How to \n play", this.textExX, this.textExY);
		
		
		// draw start button
		fill(0, 255, 0, this.buttonColorAnim);
		if (this.startButtonIsActive) {
			fill(0, 110, 10);
		}
		rect(this.startX, this.buttonY, this.w, this.h);
		textSize(20);
		
		// draw start button text
		textFont("sans-serif", width/20);
		fill(0, 0, 0, this.buttonColorAnim);
		text("Start", this.textStartX, this.textStartY);
		
		if (this.colorAnim >= 200) {
			this.buttonColorAnim++;
		}
		
	};

	// check if button is active
	Menu.prototype.onActive = function(x, y) {
		if (x > this.exX && x < this.exX + this.w && y > this.buttonY && y < this.buttonY + this.h && this.buttonColorAnim > 200) {
			this.exButtonIsActive = true;
		} else if (x > this.startX && x < this.startX + this.w && y > this.buttonY && y < this.buttonY + this.h && this.buttonColorAnim > 200) {
			this.startButtonIsActive = true;
		} else {
			this.startButtonIsActive = false;
			this.exButtonIsActive = false;
		}
	};


	/*-------------
	Game explanation
	--------------*/

	// draw game explanation
	Menu.prototype.drawGameEx = function() {
		background(52, 168, 83);
		textSize(height/10);
		fill(255, 255, 255);
		text("How to Play", width/4, height * 0.175);
		fill(0, 0, 0);
		textSize(height/20);
		text("Click on the moles to hit them with your", width/20, height * 0.25);
		text("mallet! You have", width/20, height * 0.3);
		fill(184, 184, 184);
		text("60 seconds", width * 0.43, height * 0.3);
		fill(0, 0, 0);
		text("to whack as", width * 0.7, height * 0.3);
		text("many moles with the mallet as you can.", width/20, height * 0.35);
		text("In addition to regular moles,", width/20, height * 0.4);
		fill(255, 217, 0);
		text("golden moles", width * 0.68, height * 0.4);
		fill(0, 0, 0);
		text("and", width/20, height * 0.45);
		fill(255, 0, 0);
		text("bombs", width * 0.15, height * 0.45);
		fill(0, 0, 0);
		text("can appear. Good luck!", width * 0.32, height * 0.45);
		
		textSize(width/16);
		drawMole(width/4, height * 0.675);
		fill(80, 40, 0);
		text("Mole: +15 pts", width * 0.075, height * 0.825);
		
		drawGoldenMole(width/2, height * 0.675);
		fill(255, 242, 0);
		text("Golden mole: +30 pts", width * 0.15, height * 0.575);
		
		drawBomb(width * 0.75, height * 0.675);
		fill(255, 0, 0);
		text("Bomb: -15 pts", width * 0.55, height * 0.825);
		
		// button for starting the game
		fill(17, 255, 0);
		if (this.startButtonIsActive) {
			fill(5, 95, 10);
		}
		rect(this.exStartX, this.exStartY, this.exStartW, this.h);
		fill(0, 0, 0);
		textSize(width * 0.075);
		text("start", width * 0.425, height * 0.95);
	};

	// check if button is active
	Menu.prototype.onActiveEx = function(x, y) {
		if (x > this.exStartX && x < this.exStartX + this.exStartW && y > this.exStartY && y < this.exStartY + this.h) {
			this.startButtonIsActive = true;
		} else {
			this.startButtonIsActive = false;
		}
	};
		
	// draw name enterer (optional in the case that a scoreboard is implemented)
	// name enterer (optional in the case that a scoreboard is implemented)









	/*-------
	Countdown
	--------*/
	var countdown = function(frames) {
		// for changing transparency
		var tp = frames % 60;
		
		// draw the game's background
		drawGameBg();
		
		// make game bg semi-white
		fill(255, 255, 255, 100);
		rect(0, 0, width, height);
		
		// start countdown
		fill(0, 0, 0, tp);
		textSize(width/4);
		if (frames < 60) {
			text("3", width/2.5, height/2);
		} else if (frames < 120) {
			text("2", width/2.5, height/2);
		} else if (frames < 180) {
			text("1", width/2.5, height/2);
		} else {
			return "done";
		}
	};








	/*---------------
	Whack-A-Mole game
	-----------------*/


	var gameElems = {
		elemRng: undefined,
		elemType: "mole",
		elemPosX: undefined,
		elemPosY: undefined,
		isHit: false,
		timeLeft: 60,
		score: 0,
		scoreMod: 0,
		speedMod: 120,
		lastIndx: undefined,
		moleIndx: 0,
		flashOn: false,
		gameIsOver: false
	};


	// start the game
	var playWhackMole = function(obj, frames) {
		// draw background
		noStroke();
		drawGameBg();
		
		// speed modification
		if (obj.timeLeft % 10 === 0 && frames % 60 === 0) {
			obj.speedMod -= 15;
		}
	   
		obj.lastIndx = obj.moleIndx;
		
		// keep track of time
		if (frames % 60 === 0 && obj.timeLeft !== 0) {
			obj.timeLeft -= 1;
		}
		
		noStroke();
		

		
		// score display
		textSize(width/20);
		fill(0, 0, 0);
		text("Score: " + (obj.score + obj.scoreMod), 0, height/20);

		// timer (200 seconds = 200,000 miliseconds)
		text("Time remaining: " + obj.timeLeft, 0, height/10); 
		
		
		
		// speed modification/score checker/object determiner
		if (frames % obj.speedMod === 0) {
			// check if mole/bomb was hit and modify score accordingly
			if (obj.isHit) {
				obj.score += obj.scoreMod;
				obj.scoreMod = 0;
				obj.isHit = false;
			}
			
			// change mole/bomb's position
			while (true) {
				obj.moleIndx = floor(random(0, 5));
				if (obj.moleIndx !== obj.lastIndx) {
					break;
				} else {
					obj.moleIndx = floor(random(0, 5));
				}
			}
			
			// make new object
			obj.elemRng = floor(random(0, 10));
			if (obj.elemRng < 5) {
				obj.elemType = "mole";
			} else if (obj.elemRng < 8) {
				obj.elemType = "bomb";
			} else {
				obj.elemType = "goldMole";
			}
		}
		
		// store the position of an object
		obj.elemPosX = molePosX[obj.moleIndx];
		obj.elemPosY = molePosY[obj.moleIndx];
		
		// draw a mole (50% chance, +15 pts), a bomb (30% chance, -15 pts), or a golden mole (20% chance, +30 pts)
		// placeholder for testing
		if (obj.flashOn) {
			obj.flashOn = false;
		} else {
			obj.flashOn = true;
		}
		
		
		// play hit animation if the current mole/bomb got hit
		if (obj.isHit) {
			if (obj.elemType === "mole") {
				obj.scoreMod = 15;
				moleHitAnim(obj.elemPosX, obj.elemPosY);
			} else if (obj.elemType === "bomb") {
				obj.scoreMod = -15;
				bombHitAnim(obj.elemPosX, obj.elemPosY, obj.flashOn);
			} else {
				obj.scoreMod = 30;
				goldenHitAnim(obj.elemPosX, obj.elemPosY);
			}
		} else {
			if (obj.elemType === "mole") {
				drawMole(obj.elemPosX, obj.elemPosY);
			} else if (obj.elemType === "bomb") {
				drawBomb(obj.elemPosX, obj.elemPosY);
			} else {
				drawGoldenMole(obj.elemPosX, obj.elemPosY);
			}
		}
		
		// counts time elapsed and modifies speed
		
		// when time runs out, end the game
		if (obj.timeLeft === 0) {
			obj.gameIsOver = true;
		}
		
		return obj;
		
	};









	/*-----------
	Results screen
	------------*/
	var Result = function() {
		this.restartButtonIsActive = false;
		this.menuButtonIsActive = false;
		this.buttonY = height * 0.58;
		this.w = width * 0.12;
		this.h = height * 0.12;
		
		this.menuButtonX = width * 0.25;
		
		this.restartButtonX = width * 0.65;
		
	};

	Result.prototype.draw = function(finalScore, highScore, lowScore) {
		var message;
		var textColor;
		noStroke();
		drawGameBg();
		fill(255, 255, 255, 100);
		rect(0, 0, width, height);
		if (finalScore < 0) {
			message = "Was this on purpose?";
			textColor = color(255, 0, 0);
		} else if (finalScore < 75) {
			message = "Do better next time!";
			textColor = color(0, 0, 0);
		} else if (finalScore < 200) {
			message = "Pretty decent score!";
			textColor = color(180, 200, 0);
		} else if (finalScore < 350) {
			message = "Nice job!";
			textColor = color(255, 255, 255);
		} else if (finalScore < 500) {
			message = "Amazing job!";
			textColor = color(225, 0, 255);
		} else {
			message = "Wow! Incredible!";
			textColor = color(floor(random(255)), floor(random(255)), floor(random(255)));
		}
		
		textSize(width/20);
		
		strokeWeight(width/40);
		stroke(0, 0, 0);
		fill(0, 255, 255);
		rect(width * 0.16, height * 0.25, width * 0.7, height * 0.5);
		
		noStroke();
		fill(textColor);
		text(message, width * 0.3, height * 0.35);
		
		fill(0, 0, 0);
		text("Final score: " + finalScore, width * 0.3, height * 0.42);
		
		fill(210, 210, 25);
		text("High score: " + highScore, width * 0.3, height * 0.48);
		
		fill(255, 0, 0);
		text("Lowest score: " + lowScore, width * 0.3, height * 0.54);
		
		strokeWeight(width/80);
		
		fill(0, 190, 255);
		if (this.menuButtonIsActive) {
			fill(0, 0, 255);
		}
		rect(this.menuButtonX, this.buttonY, this.w, this.h);
		
		fill(0, 255, 0);
		if (this.restartButtonIsActive) {
			fill(0, 120, 25);
		}
		rect(this.restartButtonX, this.buttonY, this.w, this.h);
		
		// replace with home/restart button pictures
		noStroke();
		textSize(width/30);
		fill(255, 0, 0);
		text("Home", width * 0.26, height * 0.64);
		
		text("restart", width * 0.66, height * 0.64);
	};


	Result.prototype.onActiveResult = function(x, y) {
		if (x > this.menuButtonX && x < this.menuButtonX + this.w && y > this.buttonY && y < this.buttonY + this.h) {
			this.menuButtonIsActive = true;
		} else if (x > this.restartButtonX && x < this.restartButtonX + this.w && y > this.buttonY && y < this.buttonY + this.h) {
			this.restartButtonIsActive = true;
		} else {
			this.menuButtonIsActive = false;
			this.restartButtonIsActive = false;
		}
	};









	/*----------
	Start everything
	-----------*/

	var menu = new Menu();
	var result = new Result();

	draw = function() {
		if (currentScene === "menu") {
			menu.draw();
			menu.onActive(mouseX, mouseY);
		} else if (currentScene === "gameEx") {
			menu.drawGameEx();
			menu.onActiveEx(mouseX, mouseY);
		} else if (currentScene === "countdown") {
			// keep track of frames
			frames = frameCount - lastFrameCount;
			count = countdown(frames);
			
			// start the game after countdown is done
			if (count === "done") {
				currentScene = "game";
				lastFrameCount = frameCount;
			}
		} else if (currentScene === "game") {
			// draw the game
			gameElems = playWhackMole(gameElems, frames);
			
			// keep track of frames
			frames = frameCount - lastFrameCount;

			// draw mallet
			if (!malletSwung) {
				drawMallet(mouseX, mouseY);
			} else {
				// tilt the mallet on click
				framesSinceAction = frames - framesBeforeAction;
				push();
				translate(mouseX, mouseY);
				if (mouseX < width/2) {
					rotate(-45);
				} else {
					rotate(45);
				}
				drawMallet(0, 0);
				pop();
				
				if (framesSinceAction > 5) {
					malletSwung = false;
					framesSinceAction = 0;
					framesBeforeAction = 0;
				}
			}    
			
			if (gameElems.gameIsOver) {
				// store the final score
				finalScore = gameElems.score;
				
				// check for highest score
				if (finalScore > highScore) {
					highScore = gameElems.score;
				}
				
				// check for lowest score
				if (finalScore < lowScore) {
					lowScore = gameElems.score;
				}
				
				// reset the game elements
				gameElems = {
					elemRng: undefined,
					elemType: "mole",
					elemPosX: undefined,
					elemPosY: undefined,
					isHit: false,
					timeLeft: 60,
					score: 0,
					scoreMod: 0,
					speedMod: 120,
					lastIndx: undefined,
					moleIndx: 0,
					flashOn: false,
					gameIsOver: false
				};
				
				// move to the next scene
				currentScene = "results";
				
				// save the frames before game over
				framesBeforeAction = frames;
			}
		} else if (currentScene === "results") {
			frames = frameCount - lastFrameCount;
			result.draw(finalScore, highScore, lowScore);
			result.onActiveResult(mouseX, mouseY);
		} 
		
	};

	mousePressed = function() {
		if (menu.exButtonIsActive) {
			currentScene = "gameEx";
			menu.exButtonIsActive = false;
		} else if (menu.startButtonIsActive) {
			currentScene = "countdown";
			lastFrameCount = frameCount;
			menu.startButtonIsActive = false;
		} else if (currentScene === "game") {
			// check if the mole/bomb got hit
			if (mouseX < gameElems.elemPosX + intFourX && mouseX > gameElems.elemPosX - intFiveX && mouseY < gameElems.elemPosY + intFiveY && mouseY > gameElems.elemPosY - intThreeY) {
				gameElems.isHit = true;
			}
			// record frames before action
			framesBeforeAction = frames;
			malletSwung = true;
			
		} else if (currentScene === "results" && frames - framesBeforeAction > 60) {
			if (result.menuButtonIsActive) {
				currentScene = "menu";
				framesBeforeAction = 0;
			} else if (result.restartButtonIsActive) {
				currentScene = "countdown";
				framesBeforeAction = 0;
				lastFrameCount = frameCount;
			}
		}
	};
}

