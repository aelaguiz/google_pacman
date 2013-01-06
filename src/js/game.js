var Game = function() {
	this.util = new Util();
};

Game.prototype = {
	getPlayfieldX: function (b) {
		return b + -32;
	},
	getPlayfieldY: function (b) {
		return b + 0;
	},
	getCorrectedSpritePos: function (b) {
		return b / 8 * 10 + 2;
	},
	getDotElementId: function (b, c) {
		return "pcm-d" + b + "-" + c;
	},

	showElementById: function (b, c) {
		var d = document.getElementById(b);
		if (d) d.style.visibility = c ? "visible" : "hidden";
	},

	getAbsoluteElPos: function (b) {
		var c = [0, 0];

		do {
			c[0] += b.offsetTop;
			c[1] += b.offsetLeft;
			b = b.offsetParent;

		} while(b);

		return c;
	},

	prepareElement: function (b, c, d) {
		c = this.getCorrectedSpritePos(parseInt(c, 10));
		d = this.getCorrectedSpritePos(parseInt(d, 10));

		if (this.useCss) {
			b.style.backgroundImage = "url(src/pacman10-hp-sprite-2.png)";
			b.style.backgroundPosition = -c + "px " + -d + "px";
			b.style.backgroundRepeat = "no-repeat";
		} else {
			b.style.overflow = "hidden";
			c = "display: block; position: relative; left: " + -c + "px; top: " + -d + "px";
			b.innerHTML = '<img style="' + c + '" src="src/pacman10-hp-sprite-2.png">';
		}
	},

	changeElementBkPos: function (b, c, d, f) {
		if (f) {
			c = this.getCorrectedSpritePos(c);
			d = this.getCorrectedSpritePos(d);
		}

		if (this.useCss) {
			b.style.backgroundPosition = -c + "px " + -d + "px";
		}
		else if (b.childNodes[0]) {
			b.childNodes[0].style.left = -c + "px";
			b.childNodes[0].style.top = -d + "px";
		}
	},

	determinePlayfieldDimensions: function () {
		this.playfieldWidth = 0;
		this.playfieldHeight = 0;
		for (var b in n) {
			var c = n[b];
			if (c.w) {
				c = c.x + c.w - 1;
				if (c > this.playfieldWidth) {
					this.playfieldWidth = c;
				}
			} else {
				c = c.y + c.h - 1;
				if (c > this.playfieldHeight) {
					this.playfieldHeight = c;
				}
			}
		}
	},

	preparePlayfield: function () {
		this.playfield = [];

		for (var b = 0; b <= this.playfieldHeight + 1; b++) {
			this.playfield[b * 8] = [];

			for (var c = -2; c <= this.playfieldWidth + 1; c++) {
				this.playfield[b * 8][c * 8] = {
					path: 0,
					dot: 0,
					intersection: 0
				};
			}
		}
	},
	preparePaths: function () {
		var h = 0;
		var f = 0;

		for (var b in n) {
			var c = n[b];
			var d = c.type;

			if (c.w) {
				for (f = c.y * 8,
					h = c.x * 8;
					h <= (c.x + c.w - 1) * 8;
					h += 8) {

					this.playfield[f][h].path = a;
					if (this.playfield[f][h].dot === 0) {
						this.playfield[f][h].dot = 1;
						this.dotsRemaining++;
					}

					this.playfield[f][h].type = !d || h != c.x * 8 && h != (c.x + c.w - 1) * 8 ? d : 0;
				}
				this.playfield[f][c.x * 8].intersection = a;
				this.playfield[f][(c.x + c.w - 1) * 8].intersection = a;
			} else {
				h = c.x * 8;

				for (f = c.y * 8;
						f <= (c.y + c.h - 1) * 8;
						f += 8) {

					if (this.playfield[f][h].path) {
						this.playfield[f][h].intersection = a;
					}

					this.playfield[f][h].path = a;
					if (this.playfield[f][h].dot === 0) {
						this.playfield[f][h].dot = 1;
						this.dotsRemaining++;
					}

					this.playfield[f][h].type = !d || f != c.y * 8 && f != (c.y + c.h - 1) * 8 ? d : 0;
				}
				this.playfield[c.y * 8][h].intersection = a;
				this.playfield[(c.y + c.h - 1) * 8][h].intersection = a;
			}
		}

		for (b in o) {
			if (o[b].w) {
				for (h = o[b].x * 8; h <= (o[b].x + o[b].w - 1) * 8; h += 8) {
					this.playfield[o[b].y * 8][h].dot = 0;
					this.dotsRemaining--;
				}
			} 
			else for (f = o[b].y * 8; f <= (o[b].y + o[b].h - 1) * 8; f += 8) {
				this.playfield[f][o[b].x * 8].dot = 0;
				this.dotsRemaining--;
			}
		}
	},
	prepareAllowedDirections: function () {
		for (var b = 8; b <= this.playfieldHeight * 8; b += 8) for (var c = 8; c <= this.playfieldWidth * 8; c += 8) {
			this.playfield[b][c].allowedDir = 0;
			if (this.playfield[b - 8][c].path) this.playfield[b][c].allowedDir += 1;
			if (this.playfield[b + 8][c].path) this.playfield[b][c].allowedDir += 2;
			if (this.playfield[b][c - 8].path) this.playfield[b][c].allowedDir += 4;
			if (this.playfield[b][c + 8].path) this.playfield[b][c].allowedDir += 8
		}
	},
	createDotElements: function () {
		for (var b = 8; b <= this.playfieldHeight * 8; b += 8) for (var c = 8; c <= this.playfieldWidth * 8; c += 8) if (this.playfield[b][c].dot) {
			var d = document.createElement("div");
			d.className = "pcm-d";
			d.id = this.getDotElementId(b, c);
			d.style.left = c + -32 + "px";
			d.style.top = b + 0 + "px";
			this.playfieldEl.appendChild(d)
		}
	},
	createEnergizerElements: function () {
		for (var b in p) {
			var c = p[b],
			d = this.getDotElementId(c.y * 8, c.x * 8);
			document.getElementById(d).className = "pcm-e";
			this.prepareElement(document.getElementById(d), 0, 144);
			this.playfield[c.y * 8][c.x * 8].dot = 2
		}
	},
	createFruitElement: function () {
		this.fruitEl = document.createElement("div");
		this.fruitEl.id = "pcm-f";
		this.fruitEl.style.left = this.getPlayfieldX(v[1]) + "px";
		this.fruitEl.style.top = this.getPlayfieldY(v[0]) + "px";
		this.prepareElement(this.fruitEl, -32, -16);
		this.playfieldEl.appendChild(this.fruitEl)
	},
	createPlayfieldElements: function () {
		this.doorEl = document.createElement("div");
		this.doorEl.id = "pcm-do";
		this.doorEl.style.display = "none";
		this.playfieldEl.appendChild(this.doorEl);
		this.createDotElements();
		this.createEnergizerElements();
		this.createFruitElement()
	},
	createActors: function () {
		this.actors = [];
		for (var b = 0; b < this.playerCount + 4; b++) {
			this.actors[b] = new E(b);
			if (b < this.playerCount) {
				this.actors[b].ghost = e;
				this.actors[b].mode = 1
			} else this.actors[b].ghost = a
		}
	},
	restartActors: function () {
		for (var b in this.actors) this.actors[b].A()
	},
	createActorElements: function () {
		for (var b in this.actors) this.actors[b].createElement()
	},
	createPlayfield: function () {
		this.playfieldEl = document.createElement("div");
		this.playfieldEl.id = "pcm-p";
		this.canvasEl.appendChild(this.playfieldEl)
	},
	resetPlayfield: function () {
		this.dotsRemaining = 0;
		this.dotsEaten = 0;
		this.playfieldEl.innerHTML = "";
		this.prepareElement(this.playfieldEl, 256, 0);
		this.determinePlayfieldDimensions();
		this.preparePlayfield();
		this.preparePaths();
		this.prepareAllowedDirections();
		this.createPlayfieldElements();
		this.createActorElements()
	},
	keyPressed: function (b) {
		var c = e;
		switch (b) {
			case 37:
				this.actors[0].requestedDir = 4;
			c = a;
			break;
			case 38:
				this.actors[0].requestedDir = 1;
			c = a;
			break;
			case 39:
				this.actors[0].requestedDir = 8;
			c = a;
			break;
			case 40:
				this.actors[0].requestedDir = 2;
			c = a;
			break;
			case 65:
				if (this.playerCount == 2) {
				this.actors[1].requestedDir = 4;
				c = a
			}
			break;
			case 83:
				if (this.playerCount == 2) {
				this.actors[1].requestedDir = 2;
				c = a
			}
			break;
			case 68:
				if (this.playerCount == 2) {
				this.actors[1].requestedDir = 8;
				c = a
			}
			break;
			case 87:
				if (this.playerCount == 2) {
				this.actors[1].requestedDir = 1;
				c = a
			}
			break
		}
		return c
	},
	handleKeyDown: function (b) {
		if (!b) b = window.event;
		if (this.keyPressed(b.keyCode)) if (b.preventDefault) b.preventDefault();
		else b.returnValue = e
	},
	canvasClicked: function (b, c) {
		var d = this.getAbsoluteElPos(this.canvasEl);
		b -= d[1] - -32;
		c -= d[0] - 0;
		d = this.actors[0];
		var f = this.getPlayfieldX(d.pos[1] + d.posDelta[1]) + 16,
		h = this.getPlayfieldY(d.pos[0] + d.posDelta[0]) + 32,
		j = Math.abs(b - f),
		k = Math.abs(c - h);
		if (j > 8 && k < j) d.requestedDir = b > f ? 8 : 4;
		else if (k > 8 && j < k) d.requestedDir = c > h ? 2 : 1
	},
	handleClick: function (b) {
		if (!b) b = window.event;
		this.canvasClicked(b.clientX, b.clientY)
	},
	registerTouch: function () {
		document.body.addEventListener("touchstart", this.handleTouchStart, a);
		this.canvasEl.addEventListener("touchstart", this.handleTouchStart, a);
		document.f && document.f.q && document.f.q.addEventListener("touchstart", this.handleTouchStart, a)
	},
	handleTouchStart: function (b) {
		this.touchDX = 0;
		this.touchDY = 0;
		if (b.touches.length == 1) {
			this.touchStartX = b.touches[0].pageX;
			this.touchStartY = b.touches[0].pageY;
			document.body.addEventListener("touchmove", this.handleTouchMove, a);
			document.body.addEventListener("touchend", this.handleTouchEnd, a)
		}
		b.preventDefault();
		b.stopPropagation()
	},
	handleTouchMove: function (b) {
		if (b.touches.length > 1) this.cancelTouch();
		else {
			this.touchDX = b.touches[0].pageX - this.touchStartX;
			this.touchDY = b.touches[0].pageY - this.touchStartY
		}
		b.preventDefault();
		b.stopPropagation()
	},
	handleTouchEnd: function (b) {
		if (this.touchDX == 0 && this.touchDY == 0) this.canvasClicked(this.touchStartX, this.touchStartY);
		else {
			var c = Math.abs(this.touchDX),
			d = Math.abs(this.touchDY);
			if (c < 8 && d < 8) this.canvasClicked(this.touchStartX, this.touchStartY);
			else if (c > 15 && d < c * 2 / 3) this.actors[0].requestedDir = this.touchDX > 0 ? 8 : 4;
			else if (d > 15 && c < d * 2 / 3) this.actors[0].requestedDir = this.touchDY > 0 ? 2 : 1
		}
	b.preventDefault();
	b.stopPropagation();
	this.cancelTouch()
	},
	cancelTouch: function () {
		document.body.removeEventListener("touchmove", this.handleTouchMove, a);
		document.body.removeEventListener("touchend", this.handleTouchEnd, a);
		this.touchStartX = null;
		this.touchStartY = null
	},
	addEventListeners: function () {
		if (window.addEventListener) {
			window.addEventListener("keydown", this.handleKeyDown, e);
			this.canvasEl.addEventListener("click", this.handleClick, e);
			this.registerTouch()
		} else {
			document.body.attachEvent("onkeydown", this.handleKeyDown);
			this.canvasEl.attachEvent("onclick", this.handleClick)
		}
	},
	startGameplay: function () {
		this.score = [0, 0];
		this.extraLifeAwarded = [e, e];
		this.lives = 3;
		this.level = 0;
		this.paused = e;
		this.globalTime = 0;
		this.newLevel(a)
	},

	restartGameplay: function (b) {
		this.util.seed(0);

		this.frightModeTime = 0;
		this.intervalTime = 0;
		this.gameplayModeTime = 0;
		this.fruitTime = 0;
		this.ghostModeSwitchPos = 0;
		this.ghostModeTime = this.levels.ghostModeSwitchTimes[0] * D;
		this.ghostExitingPenNow = e;
		this.ghostEyesCount = 0;
		this.tilesChanged = e;
		this.updateCruiseElroySpeed();
		this.hideFruit();
		this.resetForcePenLeaveTime();
		this.restartActors();
		this.updateActorPositions();
		this.switchMainGhostMode(2, a);
		for (var c = this.playerCount + 1; c < this.playerCount + 4; c++) this.actors[c].a(16);
		this.dotEatingChannel = [0, 0];
		this.dotEatingSoundPart = [1, 1];
		this.clearDotEatingNow();
		b ? this.changeGameplayMode(4) : this.changeGameplayMode(6)
	},
	initiateDoubleMode: function () {
		if (this.playerCount != 2) {
			this.stopAllAudio();
			this.changeGameplayMode(12)
		}
	},
	newGame: function () {
		this.playerCount = 1;
		this.createChrome();
		this.createPlayfield();
		this.createActors();
		this.startGameplay()
	},
	switchToDoubleMode: function () {
		this.playerCount = 2;
		this.createChrome();
		this.createPlayfield();
		this.createActors();
		this.startGameplay()
	},
	insertCoin: function () {
		this.gameplayMode == 8 || this.gameplayMode == 14 ? this.newGame() : this.initiateDoubleMode()
	},
	createKillScreenElement: function (b, c, d, f, h) {
		var j = document.createElement("div");
		j.style.left = b + "px";
		j.style.top = c + "px";
		j.style.width = d + "px";
		j.style.height = f + "px";
		j.style.zIndex = 119;
		if (h) {
			j.style.background = "url(src/pacman10-hp-sprite-2.png) -" + this.killScreenTileX + "px -" + this.killScreenTileY + "px no-repeat";
			this.killScreenTileY += 8
		} else j.style.background = "black";
		this.playfieldEl.appendChild(j)
	},
	killScreen: function () {
		this.seed(0);
		this.canvasEl.style.visibility = "";
		this.createKillScreenElement(272, 0, 200, 80, e);
		this.createKillScreenElement(280, 80, 192, 56, e);
		this.killScreenTileX = 80;
		this.killScreenTileY = 0;
		for (var b = 280; b <= 472; b += 8) for (var c = 0; c <= 136; c += 8) {
			if (this.rand() < 0.03) {
				this.killScreenTileX = Math.floor(this.rand() * 25) * 10;
				this.killScreenTileY = Math.floor(this.rand() * 2) * 10
			}
			this.createKillScreenElement(b, c, 8, 8, a)
		}
		this.changeGameplayMode(14)
	},
	newLevel: function (b) {
		this.level++;
		this.levels = this.level >= z.length ? z[z.length - 1] : z[this.level];
		// start issue 14: Ghosts stay blue permanently on restart
		if ((this.levels.frightTime > 0) && (this.levels.frightTime <= 6))
			this.levels.frightTime = Math.round(this.levels.frightTime * D);
		// end issue 14
		this.levels.frightTotalTime = this.levels.frightTime + this.timing[1] * (this.levels.frightBlinkCount * 2 - 1);
		for (var c in this.actors) this.actors[c].dotCount = 0;
		this.alternatePenLeavingScheme = e;
		this.lostLifeOnThisLevel = e;
		this.updateChrome();
		this.resetPlayfield();
		this.restartGameplay(b);
		this.level == 256 && this.killScreen()
	},
	newLife: function () {
		this.lostLifeOnThisLevel = a;
		this.alternatePenLeavingScheme = a;
		this.alternateDotCount = 0;
		this.lives--;
		this.updateChromeLives();
		this.lives == -1 ? this.changeGameplayMode(8) : this.restartGameplay(e)
	},
	switchMainGhostMode: function (b, c) {
		if (b == 4 && this.levels.frightTime == 0) for (var d in this.actors) {
			var f = this.actors[d];
			if (f.ghost) f.reverseDirectionsNext = a
		} else {
			f = this.mainGhostMode;
			if (b == 4 && this.mainGhostMode != 4) this.lastMainGhostMode = this.mainGhostMode;
			this.mainGhostMode = b;
			if (b == 4 || f == 4) this.playAmbientSound();
			switch (b) {
				case 1:
					case 2:
					this.currentPlayerSpeed = this.levels.playerSpeed * 0.8;
				this.currentDotEatingSpeed = this.levels.dotEatingSpeed * 0.8;
				break;
				case 4:
					this.currentPlayerSpeed = this.levels.playerFrightSpeed * 0.8;
				this.currentDotEatingSpeed = this.levels.dotEatingFrightSpeed * 0.8;
				this.frightModeTime = this.levels.frightTotalTime;
				this.modeScoreMultiplier = 1;
				break
			}
			for (d in this.actors) {
				f = this.actors[d];
				if (f.ghost) {
					if (b != 64 && !c) f.modeChangedWhileInPen = a;
					if (b == 4) f.eatenInThisFrightMode = e;
					if (f.mode != 8 && f.mode != 16 && f.mode != 32 && f.mode != 128 && f.mode != 64 || c) {
						if (!c && f.mode != 4 && f.mode != b) f.reverseDirectionsNext = a;
						f.a(b)
					}
				} else {
					f.fullSpeed = this.currentPlayerSpeed;
					f.dotEatingSpeed = this.currentDotEatingSpeed;
					f.tunnelSpeed = this.currentPlayerSpeed;
					f.d()
				}
			}
		}
	},
	figureOutPenLeaving: function () {
		if (this.alternatePenLeavingScheme) {
			this.alternateDotCount++;
			switch (this.alternateDotCount) {
				case m[1]:
					this.actors[this.playerCount + 1].freeToLeavePen = a;
				break;
				case m[2]:
					this.actors[this.playerCount + 2].freeToLeavePen = a;
				break;
				case m[3]:
					if (this.actors[this.playerCount + 3].mode == 16) this.alternatePenLeavingScheme = e;
				break
			}
		} else if (this.actors[this.playerCount + 1].mode == 16 || this.actors[this.playerCount + 1].mode == 8) {
			this.actors[this.playerCount + 1].dotCount++;
			if (this.actors[this.playerCount + 1].dotCount >= this.levels.penLeavingLimits[1]) this.actors[this.playerCount + 1].freeToLeavePen = a
		} else if (this.actors[this.playerCount + 2].mode == 16 || this.actors[this.playerCount + 2].mode == 8) {
			this.actors[this.playerCount + 2].dotCount++;
			if (this.actors[this.playerCount + 2].dotCount >= this.levels.penLeavingLimits[2]) this.actors[this.playerCount + 2].freeToLeavePen = a
		} else if (this.actors[this.playerCount + 3].mode == 16 || this.actors[this.playerCount + 3].mode == 8) {
			this.actors[this.playerCount + 3].dotCount++;
			if (this.actors[this.playerCount + 3].dotCount >= this.levels.penLeavingLimits[3]) this.actors[this.playerCount + 3].freeToLeavePen = a
		}
	},
	resetForcePenLeaveTime: function () {
		this.forcePenLeaveTime = this.levels.penForceTime * D
	},
	dotEaten: function (b, c) {
		this.dotsRemaining--;
		this.dotsEaten++;
		this.actors[b].c(1);
		this.playDotEatingSound(b);
		if (this.playfield[c[0]][c[1]].dot == 2) {
			this.switchMainGhostMode(4, e);
			this.addToScore(50, b)
		} else this.addToScore(10, b);
		var d = document.getElementById(this.getDotElementId(c[0], c[1]));
		d.style.display = "none";
		this.playfield[c[0]][c[1]].dot = 0;
		this.updateCruiseElroySpeed();
		this.resetForcePenLeaveTime();
		this.figureOutPenLeaving();
		if (this.dotsEaten == 70 || this.dotsEaten == 170) this.showFruit();
		this.dotsRemaining == 0 && this.finishLevel();
		this.playAmbientSound()
	},
	getFruitSprite: function (b) {
		var c = b <= 4 ? 128 : 160;
		b = 128 + 16 * ((b - 1) % 4);
		return [c, b]
	},
	getFruitScoreSprite: function (b) {
		var c = 128;
		b = 16 * (b - 1);
		return [c, b]
	},
	hideFruit: function () {
		this.fruitShown = e;
		this.changeElementBkPos(this.fruitEl, 32, 16, a)
	},
	showFruit: function () {
		this.fruitShown = a;
		var b = this.getFruitSprite(this.levels.fruit);
		this.changeElementBkPos(this.fruitEl, b[0], b[1], a);
		this.fruitTime = this.timing[15] + (this.timing[16] - this.timing[15]) * this.rand()
	},
	eatFruit: function (b) {
		if (this.fruitShown) {
			this.playSound("fruit", 0);
			this.fruitShown = e;
			var c = this.getFruitScoreSprite(this.levels.fruit);
			this.changeElementBkPos(this.fruitEl, c[0], c[1], a);
			this.fruitTime = this.timing[14];
			this.addToScore(this.levels.fruitScore, b)
		}
	},
	updateActorTargetPositions: function () {
		for (var b = this.playerCount; b < this.playerCount + 4; b++) this.actors[b].B()
	},
	moveActors: function () {
		for (var b in this.actors) this.actors[b].move()
	},
	ghostDies: function (b, c) {
		this.playSound("eating-ghost", 0);
		this.addToScore(200 * this.modeScoreMultiplier, c);
		this.modeScoreMultiplier *= 2;
		this.ghostBeingEatenId = b;
		this.playerEatingGhostId = c;
		this.changeGameplayMode(1)
	},
	playerDies: function (b) {
		this.playerDyingId = b;
		this.changeGameplayMode(2)
	},
	detectCollisions: function () {
		this.tilesChanged = e;
		for (var b = this.playerCount; b < this.playerCount + 4; b++) for (var c = 0; c < this.playerCount; c++) if (this.actors[b].tilePos[0] == this.actors[c].tilePos[0] && this.actors[b].tilePos[1] == this.actors[c].tilePos[1]) if (this.actors[b].mode == 4) {
			this.ghostDies(b, c);
			return
		} else this.actors[b].mode != 8 && this.actors[b].mode != 16 && this.actors[b].mode != 32 && this.actors[b].mode != 128 && this.actors[b].mode != 64 && this.playerDies(c)
	},
	updateCruiseElroySpeed: function () {
		var b = this.levels.ghostSpeed * 0.8;
		if (!this.lostLifeOnThisLevel || this.actors[this.playerCount + 3].mode != 16) {
			var c = this.levels;
			if (this.dotsRemaining < c.elroyDotsLeftPart2) b = c.elroySpeedPart2 * 0.8;
			else if (this.dotsRemaining < c.elroyDotsLeftPart1) b = c.elroySpeedPart1 * 0.8
		}
	if (b != this.cruiseElroySpeed) {
		this.cruiseElroySpeed = b;
		this.actors[this.playerCount].d()
	}
	},
	getSpeedIntervals: function (b) {
		if (!this.speedIntervals[b]) {
			var c = 0,
			d = 0;
			this.speedIntervals[b] = [];
			for (var f = 0; f < D; f++) {
				c += b;
				if (Math.floor(c) > d) {
					this.speedIntervals[b].push(a);
					d = Math.floor(c)
				} else this.speedIntervals[b].push(e)
			}
		}
		return this.speedIntervals[b]
	},
	finishLevel: function () {
		this.changeGameplayMode(9)
	},
	changeGameplayMode: function (b) {
		this.gameplayMode = b;
		if (b != 13) for (var c = 0; c < this.playerCount + 4; c++) this.actors[c].b();
		switch (b) {
			case 0:
				this.playAmbientSound();
			break;
			case 2:
				this.stopAllAudio();
			this.gameplayModeTime = this.timing[3];
			break;
			case 3:
				this.playerDyingId == 0 ? this.playSound("death", 0) : this.playSound("death-double", 0);
			this.gameplayModeTime = this.timing[4];
			break;
			case 6:
				this.canvasEl.style.visibility = "hidden";
			this.gameplayModeTime = this.timing[5];
			break;
			case 7:
				this.stopAllAudio();
			this.canvasEl.style.visibility = "";
			this.doorEl.style.display = "block";
			b = document.createElement("div");
			b.id = "pcm-re";
			this.prepareElement(b, 160, 0);
			this.playfieldEl.appendChild(b);
			this.gameplayModeTime = this.timing[6];
			break;
			case 4:
				this.doorEl.style.display = "block";
			b = document.createElement("div");
			b.id = "pcm-re";
			this.prepareElement(b, 160, 0);
			this.playfieldEl.appendChild(b);
			this.gameplayModeTime = this.timing[7];
			this.stopAllAudio();
			this.playerCount == 2 ? this.playSound("start-music-double", 0, a) : this.playSound("start-music", 0, a);
			break;
			case 5:
				this.lives--;
			this.updateChromeLives();
			this.gameplayModeTime = this.timing[8];
			break;
			case 8:
				case 14:
				b = document.getElementById("pcm-re");
			google.dom.remove(b);
			this.stopAllAudio();
			b = document.createElement("div");
			b.id = "pcm-go";
			this.prepareElement(b, 8, 152);
			this.playfieldEl.appendChild(b);
			this.gameplayModeTime = this.timing[9];
			break;
			case 9:
				this.stopAllAudio();
			this.gameplayModeTime = this.timing[10];
			break;
			case 10:
				this.doorEl.style.display = "none";
			this.gameplayModeTime = this.timing[11];
			break;
			case 11:
				this.canvasEl.style.visibility = "hidden";
			this.gameplayModeTime = this.timing[12];
			break;
			case 12:
				this.playfieldEl.style.visibility = "hidden";
			this.gameplayModeTime = this.timing[13];
			break;
			case 1:
				this.gameplayModeTime =
				this.timing[2];
			break;
			case 13:
				this.startCutscene();
			break
		}
	},
	showChrome: function (b) {
		this.showElementById("pcm-sc-1-l", b);
		this.showElementById("pcm-sc-2-l", b);
		this.showElementById("pcm-sc-1", b);
		this.showElementById("pcm-sc-2", b);
		this.showElementById("pcm-li", b);
		this.showElementById("pcm-so", b)
	},
	toggleSound: function (b) {
		b = window.event || b;
		b.cancelBubble = a;
		if (google.pacManSound) {
			this.userDisabledSound = a;
			this.stopAllAudio();
			google.pacManSound = e
		} else {
			google.pacManSound = a;
			this.playAmbientSound()
		}
		this.updateSoundIcon();
		return b.returnValue = e
	},
	updateSoundIcon: function () {
		if (this.soundEl) google.pacManSound ? this.changeElementBkPos(this.soundEl, 216, 105, e) : this.changeElementBkPos(this.soundEl, 236, 105, e)
	},
	startCutscene: function () {
		this.playfieldEl.style.visibility = "hidden";
		this.canvasEl.style.visibility = "";
		this.showChrome(e);
		this.cutsceneCanvasEl = document.createElement("div");
		this.cutsceneCanvasEl.id = "pcm-cc";
		this.canvasEl.appendChild(this.cutsceneCanvasEl);
		this.cutscene = B[this.cutsceneId];
		this.cutsceneSequenceId = -1;
		this.frightModeTime = this.levels.frightTotalTime;
		this.cutsceneActors = [];
		for (var b in this.cutscene.actors) {
			var c = this.cutscene.actors[b].id;
			if (c > 0) c += this.playerCount - 1;
			var d = document.createElement("div");
			d.className = "pcm-ac";
			d.id = "actor" + c;
			this.prepareElement(d, 0, 0);
			c = new E(c);
			c.el = d;
			c.elBackgroundPos = [0, 0];
			c.elPos = [0, 0];
			c.pos = [this.cutscene.actors[b].y * 8, this.cutscene.actors[b].x * 8];
			c.posDelta = [0, 0];
			c.ghost = this.cutscene.actors[b].ghost;
			this.cutsceneCanvasEl.appendChild(d);
			this.cutsceneActors.push(c)
		}
		this.cutsceneNextSequence();
		this.stopAllAudio();
		this.playAmbientSound()
	},
	stopCutscene: function () {
		this.playfieldEl.style.visibility = "";
		google.dom.remove(this.cutsceneCanvasEl);
		this.showChrome(a);
		this.newLevel(e)
	},
	cutsceneNextSequence: function () {
		this.cutsceneSequenceId++;
		if (this.cutscene.sequence.length == this.cutsceneSequenceId) this.stopCutscene();
		else {
			var b = this.cutscene.sequence[this.cutsceneSequenceId];
			this.cutsceneTime = b.time * D;
			for (var c in this.cutsceneActors) {
				var d = this.cutsceneActors[c];
				d.dir = b.moves[c].dir;
				d.speed = b.moves[c].speed;
				if (b.moves[c].elId) d.el.id = b.moves[c].elId;
				if (b.moves[c].mode) d.mode = b.moves[c].mode;
				d.b()
			}
		}
	},
	checkCutscene: function () {
		this.cutsceneTime <= 0 && this.cutsceneNextSequence()
	},
	advanceCutscene: function () {
		for (var b in this.cutsceneActors) {
			var c = this.cutsceneActors[b],
			d = l[c.dir];
			c.pos[d.axis] += d.increment * c.speed;
			c.b()
		}
		this.cutsceneTime--
	},
		updateActorPositions: function () {
			for (var b in this.actors) this.actors[b].k()
		},
	blinkEnergizers: function () {
		switch (this.gameplayMode) {
			case 4:
				case 5:
				case 6:
				case 7:
				case 9:
				case 10:
				case 11:
				case 12:
				this.playfieldEl.className = "";
			break;
			case 8:
				case 14:
				this.playfieldEl.className = "blk";
			break;
			default:
				if (this.globalTime % (this.timing[0] * 2) == 0) this.playfieldEl.className = "";
			else if (this.globalTime % (this.timing[0] * 2) == this.timing[0]) this.playfieldEl.className = "blk";
			break
		}
	},
	blinkScoreLabels: function () {
		if (this.gameplayMode != 13) {
			var b = "";
			if (this.globalTime % (this.timing[17] * 2) == 0) b = "visible";
			else if (this.globalTime % (this.timing[17] * 2) == this.timing[17]) b = "hidden";
			if (b) for (var c = 0; c < this.playerCount; c++) this.scoreLabelEl[c].style.visibility = b
		}
	},
	finishFrightMode: function () {
		this.switchMainGhostMode(this.lastMainGhostMode, e)
	},
	handleGameplayModeTimer: function () {
		if (this.gameplayModeTime) {
			this.gameplayModeTime--;
			switch (this.gameplayMode) {
				case 2:
					case 3:
					for (var b = 0; b < this.playerCount + 4; b++) this.actors[b].b();
				break;
				case 10:
					Math.floor(this.gameplayModeTime / (this.timing[11] / 8)) % 2 == 0 ? this.changeElementBkPos(this.playfieldEl, 322, 2, e) : this.changeElementBkPos(this.playfieldEl, 322, 138, e)
			}
			if (this.gameplayModeTime <= 0) {
				this.gameplayModeTime = 0;
				switch (this.gameplayMode) {
					case 1:
						this.changeGameplayMode(0);
					this.ghostEyesCount++;
					this.playAmbientSound();
					this.actors[this.ghostBeingEatenId].el.className = "pcm-ac";
					this.actors[this.ghostBeingEatenId].a(8);
					var c = e;
					for (b = this.playerCount; b < this.playerCount + 4; b++) if (this.actors[b].mode == 4 || (this.actors[b].mode == 16 || this.actors[b].mode == 128) && !this.actors[b].eatenInThisFrightMode) {
						c = a;
						break
					}
					c || this.finishFrightMode();
					break;
					case 2:
						this.changeGameplayMode(3);
					break;
					case 3:
						this.newLife();
					break;
					case 4:
						this.changeGameplayMode(5);
					break;
					case 6:
						this.changeGameplayMode(7);
					break;
					case 7:
						case 5:
						b = document.getElementById("pcm-re");
					google.dom.remove(b);
					this.changeGameplayMode(0);
					break;
					case 8:
						b = document.getElementById("pcm-go");
					google.dom.remove(b);
					google.pacManQuery && google.pacManQuery();
					break;
					case 9:
						this.changeGameplayMode(10);
					break;
					case 10:
						this.changeGameplayMode(11);
					break;
					case 11:
						if (this.levels.cutsceneId) {
						this.cutsceneId = this.levels.cutsceneId;
						this.changeGameplayMode(13)
					} else {
						this.canvasEl.style.visibility = "";
						this.newLevel(e)
					}
					break;
					case 12:
						this.playfieldEl.style.visibility = "";
					this.canvasEl.style.visibility = "";
					this.switchToDoubleMode();
					break
				}
			}
		}
	},
	handleFruitTimer: function () {
		if (this.fruitTime) {
			this.fruitTime--;
			this.fruitTime <= 0 && this.hideFruit()
		}
	},
	handleGhostModeTimer: function () {
		if (this.frightModeTime) {
			this.frightModeTime--;
			if (this.frightModeTime <= 0) {
				this.frightModeTime = 0;
				this.finishFrightMode()
			}
		} else if (this.ghostModeTime > 0) {
			this.ghostModeTime--;
			if (this.ghostModeTime <= 0) {
				this.ghostModeTime = 0;
				this.ghostModeSwitchPos++;
				if (this.levels.ghostModeSwitchTimes[this.ghostModeSwitchPos]) {
					this.ghostModeTime = this.levels.ghostModeSwitchTimes[this.ghostModeSwitchPos] * D;
					switch (this.mainGhostMode) {
						case 2:
							this.switchMainGhostMode(1, e);
						break;
						case 1:
							this.switchMainGhostMode(2, e);
						break
					}
				}
			}
		}
	},
	handleForcePenLeaveTimer: function () {
		if (this.forcePenLeaveTime) {
			this.forcePenLeaveTime--;
			if (this.forcePenLeaveTime <= 0) {
				for (var b = 1; b <= 3; b++) if (this.actors[this.playerCount + b].mode == 16) {
					this.actors[this.playerCount + b].freeToLeavePen = a;
					break
				}
				this.resetForcePenLeaveTime()
			}
		}
	},
	handleTimers: function () {
		if (this.gameplayMode == 0) {
			this.handleForcePenLeaveTimer();
			this.handleFruitTimer();
			this.handleGhostModeTimer()
		}
		this.handleGameplayModeTimer()
	},
	tick: function () {
		var b = (new Date).getTime();
		this.lastTimeDelta += b - this.lastTime - this.tickInterval;
		if (this.lastTimeDelta > 100) this.lastTimeDelta = 100;
		if (this.canDecreaseFps && this.lastTimeDelta > 50) {
			this.lastTimeSlownessCount++;
			this.lastTimeSlownessCount == 20 && this.decreaseFps()
		}
		var c = 0;
		if (this.lastTimeDelta > this.tickInterval) {
			c = Math.floor(this.lastTimeDelta / this.tickInterval);
			this.lastTimeDelta -= this.tickInterval * c
		}
		this.lastTime = b;
		if (this.gameplayMode == 13) {
			for (b = 0; b < this.tickMultiplier + c; b++) {
				this.advanceCutscene();
				this.intervalTime = (this.intervalTime + 1) % D;
				this.globalTime++
			}
				this.checkCutscene();
				this.blinkScoreLabels()
		} else for (b = 0; b < this.tickMultiplier + c; b++) {
			this.moveActors();
			if (this.gameplayMode == 0) if (this.tilesChanged) {
				this.detectCollisions();
				this.updateActorTargetPositions()
			}
			this.globalTime++;
			this.intervalTime = (this.intervalTime + 1) % D;
			this.blinkEnergizers();
			this.blinkScoreLabels();
			this.handleTimers()
		}
	},
	extraLife: function (b) {
		this.playSound("extra-life", 0);
		this.extraLifeAwarded[b] = a;
		this.lives++;
		if (this.lives > 5) this.lives = 5;
		this.updateChromeLives()
	},
	addToScore: function (b, c) {
		this.score[c] += b;
		!this.extraLifeAwarded[c] && this.score[c] > 1E4 && this.extraLife(c);
		this.updateChromeScore(c)
	},
	updateChrome: function () {
		this.updateChromeLevel();
		this.updateChromeLives();
		for (var b = 0; b < this.playerCount; b++) this.updateChromeScore(b)
	},
	updateChromeScore: function (b) {
		var c = this.score[b].toString();
		if (c.length > this.scoreDigits) c = c.substr(c.length - this.scoreDigits, this.scoreDigits);
		for (var d = 0; d < this.scoreDigits; d++) {
			var f = document.getElementById("pcm-sc-" + (b + 1) + "-" + d),
			h = c.substr(d, 1);
			h ? this.changeElementBkPos(f, 8 + 8 * parseInt(h, 10), 144, a) : this.changeElementBkPos(f, 48, 0, a)
		}
	},
	updateChromeLives: function () {
		this.livesEl.innerHTML = "";
		for (var b = 0; b < this.lives; b++) {
			var c = document.createElement("div");
			c.className = "pcm-lif";
			this.prepareElement(c, 64, 129);
			this.livesEl.appendChild(c)
		}
	},
	updateChromeLevel: function () {
		this.levelEl.innerHTML = "";
		for (var b = this.level; b >= Math.max(this.level - 4 + 1, 1); b--) {
			var c = b >= z.length ? z[z.length - 1].fruit : z[b].fruit,
			d = document.createElement("div");
			c = this.getFruitSprite(c);
			this.prepareElement(d, c[0], c[1]);
			this.levelEl.appendChild(d)
		}
		this.levelEl.style.marginTop = (4 - Math.min(this.level, 4)) * 16 + "px"
	},
	createChrome: function () {
		this.canvasEl.innerHTML = "";
		this.scoreDigits = this.playerCount == 1 ? 10 : 5;
		this.scoreLabelEl = [];
		this.scoreLabelEl[0] = document.createElement("div");
		this.scoreLabelEl[0].id = "pcm-sc-1-l";
		this.prepareElement(this.scoreLabelEl[0], 160, 56);
		this.canvasEl.appendChild(this.scoreLabelEl[0]);
		this.scoreEl = [];
		this.scoreEl[0] = document.createElement("div");
		this.scoreEl[0].id = "pcm-sc-1";
		for (var b = 0; b < this.scoreDigits; b++) {
			var c = document.createElement("div");
			c.id = "pcm-sc-1-" + b;
			c.style.top = b * 8 + "px";
			c.style.left = 0;
			c.style.position = "absolute";
			c.style.width = "8px";
			c.style.height = "8px";
			this.prepareElement(c, 48, 0);
			this.scoreEl[0].appendChild(c)
		}
		this.canvasEl.appendChild(this.scoreEl[0]);
		this.livesEl = document.createElement("div");
		this.livesEl.id = "pcm-li";
		this.canvasEl.appendChild(this.livesEl);
		this.levelEl = document.createElement("div");
		this.levelEl.id = "pcm-le";
		this.canvasEl.appendChild(this.levelEl);
		if (this.playerCount == 2) {
			this.scoreLabelEl[1] = document.createElement("div");
			this.scoreLabelEl[1].id = "pcm-sc-2-l";
			this.prepareElement(this.scoreLabelEl[1], 160, 64);
			this.canvasEl.appendChild(this.scoreLabelEl[1]);
			this.scoreEl[1] = document.createElement("div");
			this.scoreEl[1].id = "pcm-sc-2";
			for (b = 0; b < this.scoreDigits; b++) {
				c = document.createElement("div");
				c.id = "pcm-sc-2-" + b;
				c.style.top = b * 8 + "px";
				c.style.left = 0;
				c.style.position = "absolute";
				c.style.width = "8px";
				c.style.height = "8px";
				this.prepareElement(c, 48, 0);
				this.scoreEl[1].appendChild(c)
			}
			this.canvasEl.appendChild(this.scoreEl[1])
		}
		if (this.soundAvailable) {
			this.soundEl = document.createElement("div");
			this.soundEl.id = "pcm-so";
			this.prepareElement(this.soundEl, -32, -16);
			this.canvasEl.appendChild(this.soundEl);
			this.soundEl.onclick =
				this.toggleSound;
			this.updateSoundIcon()
		}
	},
	clearDotEatingNow: function () {
		this.dotEatingNow = [e, e];
		this.dotEatingNext = [e, e]
	},
	playSound: function (b, c, d) {
		if (!(!this.soundAvailable || !google.pacManSound || this.paused)) {
			d || this.stopSoundChannel(c);
			try {
				this.flashSoundPlayer.playTrack(b, c)
			} catch (f) {
				this.soundAvailable = e
			}
		}
	},
	stopSoundChannel: function (b) {
		if (this.soundAvailable) try {
			this.flashSoundPlayer.stopChannel(b)
		} catch (c) {
			this.soundAvailable = e
		}
	},
	stopAllAudio: function () {
		if (this.soundAvailable) {
			try {
				this.flashSoundPlayer.stopAmbientTrack()
			} catch (b) {
				this.soundAvailable = e
			}
			for (var c = 0; c < 5; c++) this.stopSoundChannel(c)
		}
	},
	playDotEatingSound: function (b) {
		if (this.soundAvailable && google.pacManSound) if (this.gameplayMode == 0) if (this.dotEatingNow[b]) this.dotEatingNext[b] = a;
		else {
			if (b == 0) {
				var c = this.dotEatingSoundPart[b] == 1 ? "eating-dot-1" : "eating-dot-2";
				this.playSound(c, 1 + this.dotEatingChannel[b], a);
				this.dotTimer = window.setInterval(this.repeatDotEatingSoundPacMan, 150)
			} else {
				this.playSound("eating-dot-double", 3 + this.dotEatingChannel[b], a);
				this.dotTimerMs = window.setInterval(this.repeatDotEatingSoundMsPacMan, 150)
			}
			this.dotEatingChannel[b] = (this.dotEatingChannel[b] + 1) % 2;
			this.dotEatingSoundPart[b] =
				3 - this.dotEatingSoundPart[b]
		}
	},
	repeatDotEatingSound: function (b) {
		this.dotEatingNow[b] = e;
		if (this.dotEatingNext[b]) {
			this.dotEatingNext[b] = e;
			this.playDotEatingSound(b)
		}
	},
	repeatDotEatingSoundPacMan: function () {
		this.repeatDotEatingSound(0)
	},
	repeatDotEatingSoundMsPacMan: function () {
		this.repeatDotEatingSound(1)
	},
	playAmbientSound: function () {
		if (this.soundAvailable && google.pacManSound) {
			var b = 0;
			if (this.gameplayMode == 0 || this.gameplayMode == 1) b = this.ghostEyesCount ? "ambient-eyes" : this.mainGhostMode == 4 ? "ambient-fright" : this.dotsEaten > 241 ? "ambient-4" : this.dotsEaten > 207 ? "ambient-3" : this.dotsEaten > 138 ? "ambient-2" : "ambient-1";
			else if (this.gameplayMode == 13) b = "cutscene";
			if (b) try {
				this.flashSoundPlayer.playAmbientTrack(b)
			} catch (c) {
				this.soundAvailable = e
			}
		}
	},
	initializeTickTimer: function () {
		window.clearInterval(this.tickTimer);
		this.fps = C[this.fpsChoice];
		this.tickInterval = 1E3 / this.fps;
		this.tickMultiplier = D / this.fps;
		this.timing = {};
		for (var b in w) {
			var c = !google.pacManSound && (b == 7 || b == 8) ? 1 : w[b];
			this.timing[b] = Math.round(c * D)
		}
		this.lastTime = (new Date).getTime();
		this.lastTimeDelta = 0;
		this.lastTimeSlownessCount = 0;
		this.tickTimer = window.setInterval(this.tick, this.tickInterval)
	},
	decreaseFps: function () {
		if (this.fpsChoice < C.length - 1) {
			this.fpsChoice++;
			this.initializeTickTimer();
			if (this.fpsChoice == C.length - 1) this.canDecreaseFps = e
		}
	},
	addCss: function () {
		var b = "#pcm-c {  width: 554px;  border-top: 25px solid black;  padding-bottom: 25px;  height: 136px;  position: relative;  background: black;  outline: 0;  overflow: hidden;  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);}#pcm-c * {  position: absolute;  overflow: hidden;}#pcm-p,#pcm-cc {  left: 45px;  width: 464px;  height: 136px;  z-index: 99;  overflow: hidden;}#pcm-p .pcm-d {  width: 2px;  height: 2px;  margin-left: 3px;  margin-top: 3px;  background: #f8b090;  z-index: 100;}#pcm-p .pcm-e {  width: 8px;  height: 8px;  z-index: 101;}#pcm-sc-1 {  left: 18px;  top: 16px;  width: 8px;  height: 56px;  position: absolute;  overflow: hidden;}#pcm-sc-2 {  left: 18px;  top: 80px;  width: 8px;  height: 56px;  position: absolute;  overflow: hidden;}#pcm-le {  position: absolute;  left: 515px;  top: 74px;  height: 64px;  width: 32px;} #pcm-le div {  position: relative;}#pcm-sc-1-l {    left: -2px;  top: 0;  width: 48px;  height: 8px;}#pcm-sc-2-l {    left: -2px;  top: 64px;  width: 48px;  height: 8px;}#pcm-so {  left: 7px;  top: 116px;  width: 12px;  height: 12px;  border: 8px solid black;  cursor: pointer;}#pcm-li {  position: absolute;  left: 523px;  top: 0;  height: 80px;  width: 16px;}#pcm-li .pcm-lif {  position: relative;  width: 16px;  height: 12px;  margin-bottom: 3px;}#pcm-p.blk .pcm-e {  visibility: hidden;}#pcm-c .pcm-ac {  width: 16px;  height: 16px;  margin-left: -4px;  margin-top: -4px;  z-index: 110;}#pcm-c .pcm-n {  z-index: 111;}#pcm-c #pcm-stck {  z-index: 109;}#pcm-c #pcm-gbug {  width: 32px;}#pcm-c #pcm-bpcm {  width: 32px;  height: 32px;  margin-left: -20px;  margin-top: -20px;}#pcm-f,#pcm-le div {  width: 32px;  height: 16px;  z-index: 105;}#pcm-f {  margin-left: -8px;  margin-top: -4px;}#pcm-do {  width: 19px;  height: 2px;  left: 279px;  top: 46px;  overflow: hidden;  position: absolute;  background: #ffaaa5;}#pcm-re {  width: 48px;  height: 8px;  z-index: 120;  left: 264px;  top: 80px;}#pcm-go {  width: 80px;  height: 8px;  z-index: 120;  left: 248px;  top: 80px;}";
		this.styleElement =
			document.createElement("style");
		this.styleElement.type = "text/css";
		if (this.styleElement.styleSheet) this.styleElement.styleSheet.cssText = b;
		else this.styleElement.appendChild(document.createTextNode(b));
		document.getElementsByTagName("head")[0].appendChild(this.styleElement)
	},
	createCanvasElement: function () {
		this.canvasEl = document.createElement("div");
		this.canvasEl.id = "pcm-c";
		this.canvasEl.hideFocus = a;
		document.getElementById("logo").appendChild(this.canvasEl);
		this.canvasEl.tabIndex = 0;
		this.canvasEl.focus()
	},
	everythingIsReady: function () {
		if (!this.ready) {
			this.ready = a;
			var b = document.getElementById("logo-l");
			google.dom.remove(b);
			document.getElementById("logo").style.background = "black";
			this.addCss();
			this.createCanvasElement();
			this.speedIntervals = [];
			this.oppositeDirections = [];
			this.oppositeDirections[1] = 2;
			this.oppositeDirections[2] = 1;
			this.oppositeDirections[4] = 8;
			this.oppositeDirections[8] = 4;
			this.addEventListeners();
			this.fpsChoice = 0;
			this.canDecreaseFps = a;
			this.initializeTickTimer();
			this.newGame()
		}
	},
	checkIfEverythingIsReady: function () {
		if (this.soundReady || this.graphicsReady) this.updateLoadingProgress(0.67);
		if (this.soundReady && this.graphicsReady) {
			this.updateLoadingProgress(1);
			this.everythingIsReady()
		}
	},
	preloadImage: function (b) {
		var c = new Image,
		d = google.browser.engine.IE;
		if (!d) c.onload = this.imageLoaded;
		c.src = b;
		d && this.imageLoaded()
	},
	imageLoaded: function () {
		this.graphicsReady = a;
		this.checkIfEverythingIsReady()
	},
	prepareGraphics: function () {
		this.graphicsReady = e;
		this.preloadImage("src/pacman10-hp-sprite-2.png")
	},
	trimString: function (b) {
		return b.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
	},
	g: function (b, c) {
		if (b < c) return -1;
		else if (b > c) return 1;
		return 0
	},
	compareVersions: function (b, c) {
		for (var d = 0, f = this.trimString(String(b)).split("."), h = this.trimString(String(c)).split("."), j = Math.max(f.length, h.length), k = 0; d == 0 && k < j; k++) {
			var x = f[k] || "",
			F = h[k] || "",
			G = new RegExp("(\\d*)(\\D*)", "g"),
			H = new RegExp("(\\d*)(\\D*)", "g");
			do {
				var t = G.exec(x) || ["", "", ""],
				u = H.exec(F) || ["", "", ""];
				if (t[0].length == 0 && u[0].length == 0) break;
				d = t[1].length == 0 ? 0 : parseInt(t[1], 10);
				var I = u[1].length == 0 ? 0 : parseInt(u[1], 10);
				d = this.g(d, I) || this.g(t[2].length == 0, u[2].length == 0) || this.g(t[2], u[2])
			} while (d == 0)
		}
	return d
	},
	getFlashVersion: function (b) {
		b = b.match(/[\d]+/g);
		b.length = 3;
		return b.join(".")
	},
	detectFlash: function () {
		var b = e,
		c = "";
		if (navigator.plugins && navigator.plugins.length) {
			var d = navigator.plugins["Shockwave Flash"];
			if (d) {
				b = a;
				if (d.description) c = this.getFlashVersion(d.description)
			}
		if (navigator.plugins["Shockwave Flash 2.0"]) {
			b = a;
			c = "2.0.0.11"
		}
		} else if (navigator.mimeTypes && navigator.mimeTypes.length) {
			if (b = (d = navigator.mimeTypes["application/x-shockwave-flash"]) && d.enabledPlugin) {
				c = d.enabledPlugin.description;
				c = this.getFlashVersion(c)
			}
		} else try {
			d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			b = a;
			c = this.getFlashVersion(d.GetVariable("$version"))
		} catch (f) {
			try {
				d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				b = a;
				c = "6.0.21"
			} catch (h) {
				try {
					d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
					b = a;
					c = this.getFlashVersion(d.GetVariable("$version"))
				} catch (j) {}
			}
		}
		this.hasFlash = b;
		this.flashVersion = c
	},
	isFlashVersion: function (b) {
		return this.compareVersions(this.flashVersion, b) >= 0
	},
	prepareSound: function () {
		this.soundAvailable = e;
		this.soundReady = e;
		this.detectFlash();
		if (!this.hasFlash || !this.isFlashVersion("9.0.0.0")) {
			this.soundReady = a;
			this.checkIfEverythingIsReady()
		} else {
			this.flashIframe = document.createElement("iframe");
			this.flashIframe.name = "pm-sound";
			this.flashIframe.style.position = "absolute";
			this.flashIframe.style.top = "-150px";
			this.flashIframe.style.border = 0;
			this.flashIframe.style.width = "100px";
			this.flashIframe.style.height = "100px";
			google.dom.append(this.flashIframe);
			this.flashIframeDoc = this.flashIframe.contentDocument;
			if (this.flashIframeDoc == undefined || this.flashIframeDoc == null) this.flashIframeDoc = this.flashIframe.contentWindow.document;
			this.flashIframeDoc.open();
			this.flashIframeDoc.write('<html><head></head><body><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="0" height="0" id="pacman-sound-player" type="application/x-shockwave-flash"> <param name="movie" value="src/swf/pacman10-hp-sound.swf"> <param name="allowScriptAccess" value="always"> <object id="pacman-sound-player-2"  type="application/x-shockwave-flash" data="src/swf/pacman10-hp-sound.swf" width="0" height="0"><param name="allowScriptAccess" value="always"> </object></object></body></html>');
			this.flashIframeDoc.close();
			window.setTimeout(this.flashNotReady, 3E3)
		}
	},

	flashNotReady: function () {
		if (!this.ready) {
			this.soundAvailable = e;
			this.soundReady = a;
			this.checkIfEverythingIsReady()
		}
	},

	flashReady: function (b) {
		this.flashSoundPlayer = b;
		this.soundAvailable = a;
		this.soundReady = a;
		this.checkIfEverythingIsReady()
	},

	flashLoaded: function () {
		if (this.flashIframeDoc) {
			var b = this.flashIframeDoc.getElementById("pacman-sound-player");
			if (b && b.playTrack) {
				this.flashReady(b);
				return
			} else if ((b = this.flashIframeDoc.getElementById("pacman-sound-player-2")) && b.playTrack) {
				this.flashReady(b);
				return
			}
		}
		this.flashNotReady()
	},

	destroy: function () {
		if (google.pacman) {
			this.stopAllAudio();
			window.clearInterval(this.tickTimer);
			window.clearInterval(this.dotTimer);
			window.clearInterval(this.dotTimerMs);
			google.dom.remove(this.styleElement);
			google.dom.remove(this.flashIframe);
			google.dom.remove(this.canvasEl);
			google.pacman = undefined
		}
	},

	exportFunctionCalls: function () {
		google.pacman = {};
		google.pacman.insertCoin = this.insertCoin;
		google.pacman.flashLoaded = this.flashLoaded;
		google.pacman.destroy = this.destroy
	},

	updateLoadingProgress: function (b) {
		b = Math.round(b * 200);
		document.getElementById("logo-b").style.width = b + "px"
	},

	init: function () {
		this.ready = e;

		document.getElementById("logo").title = "";

		this.updateLoadingProgress(0.33);
		this.exportFunctionCalls();
		this.useCss = navigator.userAgent.indexOf("MSIE 5.") != -1 || navigator.userAgent.indexOf("MSIE 6.") != -1 || navigator.userAgent.indexOf("MSIE 7.") != -1 ? e : a;
		this.prepareGraphics();
		this.prepareSound()
	}
};
