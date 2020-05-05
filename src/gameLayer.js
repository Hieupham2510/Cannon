/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var gameBall;

var GameLayer = cc.Layer.extend({

    lblScore: null,

    nContent: null,

    ball: null,

    ballState: 0,

    ngangs: [],

    minHeight: 0,
    heightSpace: 0,

    isTouching: false,
    touchingTime: -1,

    cannon: null,
    cannonEnemy: null,
    bullet: null,
    canMove: null,
    actionShoot: null,
    actionMoveOn: null,
    actionMoveDown: null,
    timeCount: null,
    afterScore: null,

    character1: null,
    character2: null,
    character3: null,
    character4: null,
    character5: null,
    character6: null,
    character7: null,
    character8: null,


    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        console.log("init game layer");

        this.nContent = new cc.Node();
        this.addChild(this.nContent, 1);

        var logo = new cc.Sprite(res.bgScore);
        logo.setScale(scaleMin);
        logo.attr({
            x: size.width / 1.15,
            y: size.height / 1.05
        });
        this.addChild(logo, 0);


        this.lblScore = new cc.LabelTTF(gameScene._score.toString(), res.font.srcs[0], 40);

        logo.addChild(this.lblScore, 100);
        this.lblScore.attr({
            x: logo.width / 2,
            y: logo.height / 2.15
        });

        this.bgLvl = new cc.Sprite(res.bgLevel);
        this.addChild(this.bgLvl, 100);
        this.bgLvl.attr({
            x: size.width / 8,
            y: size.height / 1.05
        });

        this.lblLevel = new cc.LabelTTF(gameScene._level.toString(), res.font.srcs[0], 40);
        this.bgLvl.addChild(this.lblLevel, 100);
        this.lblLevel.attr({
            x: this.bgLvl.width / 2,
            y: this.bgLvl.height / 2.15
        });

        let bgBar = new cc.Sprite(res.progressBar);
        bgBar.setScale(scaleMin);
        bgBar.attr({
            x: size.width / 2,
            y: size.height / 1.05
        });
        this.addChild(bgBar, 100);

        this.progressBar = new ccui.LoadingBar(res.bar);
        this.progressBar.setPercent(100);
        this.progressBar.attr({
            x: bgBar.width / 2,
            y: bgBar.height / 1.75
        });
        bgBar.addChild(this.progressBar, 100);
        this.progressBar.setScaleX(1.5);

        this.character1 = new cc.Sprite(res.cannon1);
        this.character2 = new cc.Sprite(res.cannon2);
        this.character3 = new cc.Sprite(res.cannon3);
        this.character4 = new cc.Sprite(res.cannon4);
        this.character5 = new cc.Sprite(res.cannon5);
        this.character6 = new cc.Sprite(res.cannon6);
        this.character7 = new cc.Sprite(res.cannon7);
        this.character8 = new cc.Sprite(res.cannon8);

        this.bulletImg1 = new cc.Sprite(res.bullet1);
        this.bulletImg2 = new cc.Sprite(res.bullet2);
        this.bulletImg3 = new cc.Sprite(res.bullet3);
        this.bulletImg4 = new cc.Sprite(res.bullet4);



        let self = this;
        if (cc.sys.capabilities.hasOwnProperty('touches')) {
            console.log("adđ touch  ne");
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    console.log("touch ne");
                    if (gameScene.gameState == 1) {
                        self.isTouching = true;
                        self.touchingTime = 0;
                        return true;
                    }
                    return false;
                },
                onTouchEnded: function (touch, event) {
                    console.log("touch end ne");
                    if (gameScene.gameState == 1) {
                        self.isTouching = false;
                        return true;
                    }
                    return false;
                },
                onTouchCancelled: function (touch, event) {
                    console.log("touch cancel ne");
                    if (gameScene.gameState == 1) {
                        self.isTouching = false;
                        return true;
                    }
                    return false;
                }
            }, this);
        }
        else {
            console.log("adđ mouse  ne");
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    // console.log("touch ne");
                    if (gameScene.gameState == 1) {
                        self.isTouching = true;
                        self.touchingTime = 0;
                        return true;
                    }
                    return false;

                },
                onMouseMove: function (event) {
                    // if (gameScene.gameState == 0) {
                    //     return;
                    // }
                    // var x = event.getLocationX();
                    // self.gameLayer.vx = x;
                },
                onMouseUp: function (event) {
                    if (gameScene.gameState == 1) {
                        self.isTouching = false;
                        return true;
                    }
                    return false;
                }
            }, this);
        }




        return true;
    },

    onEnter: function () {
        this._super();
        this.scheduleUpdate();

        console.log("onGameLayer enter");
    },

    onExit: function () {
        this._super();
        var that = this;
        var cal = function () {
            that.unscheduleUpdate();
        };
        console.log("onGameLayer exit");
    },

    initGame: function () {
        // if (this.worm && this.worm.getParent()) {
        //     this.worm.removeFromParent();
        //     this.worm.release()
        // }
        console.log(gameScene.CannonSelect, " CannonSelect");
        console.log(gameScene._level, " level");


        this.progressBar.setPercent(100);
        this.timeCount = 100;
        gameScene.gameState = 10;
        gameScene._score = 0;
        this.lblScore.setString("000" + gameScene._score.toString());
        this.lblLevel.setString(gameScene._level);

        this.nContent.removeAllChildren();
        this.nContent.y = 0;

        this.cannon = new cc.Sprite(res.cannon1);
        this.cannon.setScale(0.75);
        this.cannon.attr({
            x: size.width / 8,
            y: size.height / 2
        });
        this.nContent.addChild(this.cannon, 0);

        this.cannonEnemy = new cc.Sprite(res.cannon1);
        this.cannonEnemy.setScale(0.75);
        this.cannonEnemy.attr({
            x: size.width / 1.12,
            y: size.height / 2
        });
        this.nContent.addChild(this.cannonEnemy, 0);
        this.cannonEnemy.setFlippedX(-360);


        this.bullet = new cc.Sprite(res.bullet1);
        this.bullet.setScale(0.75);
        this.bullet.attr({
            x: size.width / 3,
            y: size.height / 2
        });
        this.nContent.addChild(this.bullet, 10);
        this.bullet.setVisible(false);


        switch (gameScene.CannonSelect) {
            case 1:
                this.cannon.setSpriteFrame(this.character1.getSpriteFrame());
                this.cannonEnemy.setSpriteFrame(this.character1.getSpriteFrame());
                this.bullet.setSpriteFrame(this.bulletImg1.getSpriteFrame());
                break;
            case 2:
                this.cannon.setSpriteFrame(this.character2.getSpriteFrame());
                this.cannonEnemy.setSpriteFrame(this.character2.getSpriteFrame());
                this.bullet.setSpriteFrame(this.bulletImg1.getSpriteFrame());
                break;
            case 3:
                this.cannon.setSpriteFrame(this.character3.getSpriteFrame());
                this.cannonEnemy.setSpriteFrame(this.character3.getSpriteFrame());
                this.bullet.setSpriteFrame(this.bulletImg1.getSpriteFrame());
                break;
            case 4:
                this.cannon.setSpriteFrame(this.character4.getSpriteFrame());
                this.cannonEnemy.setSpriteFrame(this.character4.getSpriteFrame());
                this.bullet.setSpriteFrame(this.bulletImg1.getSpriteFrame());
                break;
            case 5:
                this.cannon.setSpriteFrame(this.character5.getSpriteFrame());
                this.cannonEnemy.setSpriteFrame(this.character5.getSpriteFrame());
                this.bullet.setSpriteFrame(this.bulletImg2.getSpriteFrame());
                break;
            case 6:
                this.cannon.setSpriteFrame(this.character6.getSpriteFrame());
                this.cannonEnemy.setSpriteFrame(this.character6.getSpriteFrame());
                this.bullet.setSpriteFrame(this.bulletImg2.getSpriteFrame());
                break;
            case 7:
                this.cannon.setSpriteFrame(this.character7.getSpriteFrame());
                this.cannonEnemy.setSpriteFrame(this.character7.getSpriteFrame());
                this.bullet.setSpriteFrame(this.bulletImg3.getSpriteFrame());
                break;
            case 8:
                this.cannon.setSpriteFrame(this.character8.getSpriteFrame());
                this.cannonEnemy.setSpriteFrame(this.character8.getSpriteFrame());
                this.bullet.setSpriteFrame(this.bulletImg4.getSpriteFrame());
                break;

            default:
                this.cannon.setSpriteFrame(this.character1.getSpriteFrame());
                this.cannonEnemy.setSpriteFrame(this.character1.getSpriteFrame());
                this.bullet.setSpriteFrame(this.bulletImg1.getSpriteFrame());
                break;
        }

        this.moveCannon(this.cannon);
        this.moveCannonEnemy(this.cannonEnemy);



        gameScene.gameState = 1;
        this.canMove = true;
    },


    moveCannon: function (cannon) {
        if (gameScene._level == 1) {
            var seq1 = cc.sequence(
                cc.moveTo(2, cannon.x, size.height / 1.2),
                cc.moveTo(2, cannon.x, 50)
            );
            var rep1 = seq1.repeatForever();
            cannon.runAction(rep1);
        }

        if (gameScene._level == 2) {
            var seq2 = cc.sequence(
                cc.moveTo(2, cannon.x, size.height / 1.2),
                cc.moveTo(2, cannon.x, 50)
            );
            var rep2 = seq2.repeatForever();
            cannon.runAction(rep2);
        }

        if (gameScene._level == 3) {
            var seq3 = cc.sequence(
                cc.moveTo(2, cannon.x, size.height / 1.2),
                cc.moveTo(2, cannon.x, 50)
            );
            var rep3 = seq3.repeatForever();
            cannon.runAction(rep3);
        }

        if (gameScene._level == 4) {
            var seq4 = cc.sequence(
                cc.moveTo(2, cannon.x, size.height / 1.2),
                cc.moveTo(2, cannon.x, 50)
            );
            var rep4 = seq4.repeatForever();
            cannon.runAction(rep4);
        }

        if (gameScene._level == 5) {
            var seq5 = cc.sequence(
                cc.moveTo(2, cannon.x, size.height / 1.2),
                cc.moveTo(2, cannon.x, 50)
            );
            var rep5 = seq5.repeatForever();
            cannon.runAction(rep5);
        }

        if (gameScene._level == 6) {
            var seq6 = cc.sequence(
                cc.moveTo(2, cannon.x, size.height / 1.2),
                cc.moveTo(2, cannon.x, 50)
            );
            var rep6 = seq6.repeatForever();
            cannon.runAction(rep6);
        }

        if (gameScene._level == 7) {
            var seq7 = cc.sequence(
                cc.moveTo(2, cannon.x, size.height / 1.2),
                cc.moveTo(2, cannon.x, 50)
            );
            var rep7 = seq7.repeatForever();
            cannon.runAction(rep7);
        }

        if (gameScene._level == 8) {
            var seq8 = cc.sequence(
                cc.moveTo(2, cannon.x, size.height / 1.2),
                cc.moveTo(2, cannon.x, 50)
            );
            var rep8 = seq8.repeatForever();
            cannon.runAction(rep8);
        }

        if (gameScene._level == 9) {
            var seq9 = cc.sequence(
                cc.moveTo(2, cannon.x, size.height / 1.2),
                cc.moveTo(2, cannon.x, 50)
            );
            var rep9 = seq9.repeatForever();
            cannon.runAction(rep9);
        }

        if (gameScene._level == 10) {
            var seq10 = cc.sequence(
                cc.moveTo(2, cannon.x, size.height / 1.2),
                cc.moveTo(2, cannon.x, 50)
            );
            var rep10 = seq10.repeatForever();
            cannon.runAction(rep10);
        }

    },

    moveCannonEnemy: function (cannon) {
        if (gameScene._level == 1) {
            var seq1 = cc.sequence(
                cc.moveTo(2, cannon.x, 50),
                cc.moveTo(2, cannon.x, size.height / 1.2)

            );
            var rep1 = seq1.repeatForever();
            cannon.runAction(rep1);
        }
        if (gameScene._level == 2) {
            var seq2 = cc.sequence(
                cc.moveTo(1.5, cannon.x, size.height / 1.2),
                cc.moveTo(1.5, cannon.x, 50)

            );
            var rep2 = seq2.repeatForever();
            cannon.runAction(rep2);
        }
        if (gameScene._level == 3) {
            var seq3 = cc.sequence(
                cc.moveTo(1.25, cannon.x, 50),
                cc.moveTo(1.25, cannon.x, size.height / 1.2)

            );
            var rep3 = seq3.repeatForever();
            cannon.runAction(rep3);
        }
        if (gameScene._level == 4) {
            var seq4 = cc.sequence(
                cc.moveTo(2, cannon.x, 50),
                cc.moveTo(2, cannon.x, size.height / 2)

            );
            var rep4 = seq4.repeatForever();
            cannon.runAction(rep4);
        }
        if (gameScene._level == 5) {
            var seq5 = cc.sequence(
                cc.moveTo(1.5, cannon.x, 50),
                cc.moveTo(1.5, cannon.x, size.height / 3),
                cc.moveTo(1.25, cannon.x, size.height / 1.2)

            );
            var rep5 = seq5.repeatForever();
            cannon.runAction(rep5);
        }
        if (gameScene._level == 6) {
            var seq6 = cc.sequence(
                cc.moveTo(1.25, cannon.x, 50),
                cc.moveTo(1.25, cannon.x, size.height / 3),
                cc.moveTo(1.25, cannon.x, size.height / 1.2)

            );
            var rep6 = seq6.repeatForever();
            cannon.runAction(rep6);
        }
        if (gameScene._level == 7) {
            var seq7 = cc.sequence(
                cc.moveTo(1, cannon.x, size.height / 3),
                cc.moveTo(2, cannon.x, size.height / 1.2)

            );
            var rep7 = seq7.repeatForever();
            cannon.runAction(rep7);
        }
        if (gameScene._level == 8) {
            var seq8 = cc.sequence(
                cc.moveTo(1.5, cannon.x, 50),
                cc.moveTo(1.5, cannon.x, size.height / 1.2),
                cc.moveTo(1.5, cannon.x, size.height / 1.75)

            );
            var rep8 = seq8.repeatForever();
            cannon.runAction(rep8);
        }
        if (gameScene._level == 9) {
            var seq9 = cc.sequence(
                cc.moveTo(2, cannon.x, 50),
                cc.moveTo(2, cannon.x, size.height / 1.2),
                cc.moveTo(1.5, cannon.x, size.height / 1.75)

            );
            var rep9 = seq9.repeatForever();
            cannon.runAction(rep9);
        }
        if (gameScene._level == 10) {
            var seq10 = cc.sequence(
                cc.moveTo(1, cannon.x, 50),
                cc.moveTo(1, cannon.x, size.height / 1.2),

            );
            var rep10 = seq10.repeatForever();
            cannon.runAction(rep10);
        }


    },

    shootBullet: function () {
        if (this.canMove == true) {
            this.bullet.setPosition(size.width / 3, this.cannon.y);
            this.bullet.setVisible(true);
            gameScene.gameState = 2;
            this.canMove = false;
            this.actionShoot = cc.MoveTo.create(0.75, cc.p(size.width * 1.1, this.bullet.y));
            this.bullet.runAction(this.actionShoot);

            setTimeout(() => {
                this.canMove = true;
            }, 1100);
            this.actionShoot.setTag(1);

        }
    },

    countScore: function () {
        if (this.afterScore == gameScene._score) {
            gameScene._bestScore = this.afterScore;
        }
        if (this.afterScore < gameScene._score) {
            if (gameScene._score < gameScene._bestScore) {
                gameScene._bestScore = gameScene._bestScore;
            } else {
                gameScene._bestScore = gameScene._score;
            }

        }
        if (this.afterScore > gameScene._score) {
            gameScene._bestScore = this.afterScore;
        }
    },

    bulletMoveOn: function () {
        this.actionMoveOn = cc.MoveTo.create(0.5, cc.p(this.bullet.x, size.height * 1.1));
        this.bullet.runAction(this.actionMoveOn);
    },

    bulletMoveDown: function () {
        this.actionMoveDown = cc.MoveTo.create(0.5, cc.p(this.bullet.x, 0 - 100));
        this.bullet.runAction(this.actionMoveDown);
    },


    update: function (dt) {
        if (gameScene.gameState == 1) {
            if (this.isTouching == true) {
                this.shootBullet();
                this.isTouching = false;
                console.log("shoot");
            }


        } else if (gameScene.gameState == 2) {
            var rectCannon = this.cannonEnemy.getBoundingBox();
            var rectBullet = this.bullet.getBoundingBox();

            if (cc.rectIntersectsRect(rectCannon, rectBullet)) {
                console.log("dead object1", rectCannon, rectBullet);
                this.bullet.stopActionByTag(1);
                if (rectBullet.y <= rectCannon.y + 70 && rectBullet.y >= rectCannon.y - 15) {
                    this.bullet.setVisible(false);
                    gameScene._score += 10;
                    if (gameScene._score < 10) {
                        this.lblScore.setString(("000" + gameScene._score.toString()));
                    } else if (gameScene._score >= 10 && gameScene._score < 100) {
                        this.lblScore.setString(("00" + gameScene._score.toString()));
                    } else if (gameScene._score >= 100 && gameScene._score < 1000) { this.lblScore.setString("00" + parseInt(gameScene._score)); }
                    else { this.lblScore.setString("0" + parseInt(gameScene._score)); }
                } else if (rectBullet.y < rectCannon.y + 70) {
                    this.bulletMoveDown()
                } else if (rectBullet.y >= rectCannon.y - 15) {
                    this.bulletMoveOn();
                }

                gameScene.gameState = 1;
            }
            if (this.bullet.x >= size.width) {
                this.bullet.setVisible(false);
                gameScene.gameState = 1;
                console.log(gameScene.gameState, this.bullet.x, " ?????");
            }
        }

        if (gameScene.gameState == 1 || gameScene.gameState == 2) {
            if (gameScene._level >= 1 && gameScene._level <= 5) {
                this.timeCount -= 1 / 20;
            }
            if (gameScene._level > 5 && gameScene._level <= 10) {
                this.timeCount -= 1 / 10;
            }
            this.progressBar.setPercent(this.timeCount);
            if (this.timeCount <= 0) {
                this.progressBar.setPercent(0);
                this.timeCount = 0;
                this.bullet.stopAllActions();
                this.cannon.stopAllActions();
                this.cannonEnemy.stopAllActions();
                this.canMove = false;
                gameScene.gameState = 0;

                setTimeout(() => {
                    gameScene.gameState = 3;
                }, 500);

            }
            console.log(this.timeCount);

        }

        if (gameScene.gameState == 3) {
            this.countScore();
            gameScene.onEndGame();
            gameScene.gameState = 4;
        }

    },
});

GameLayer.create = function () {
    var gameLayer = new GameLayer();

    return gameLayer;
};
