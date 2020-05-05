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
var gameScene;

var size = cc.winSize;
// var size = {width: 1280, height: 720};
var scale = { x: cc.winSize.width / 1280, y: cc.winSize.height / 720 };
var scaleMin = scale.x < scale.y ? scale.x : scale.y;

var HelloWorldScene = cc.Scene.extend({

    _level: 1,
    _score: 0,

    _bestScore: 0,
    CannonSelect : 1, 
    _isSoundOn: 2,

    gameState: 10,

    homeLayer: null,
    popupEndGame: null,
    popupHelp: null,
    gameLayer: null,
    shopLayer: null,
    levelPopup : null , 

    setSound: function (value) {
        this._isSoundOn = value;
        cc.sys.localStorage.setItem("sound", value);
    },

    setBestScore: function (score) {
        if (score > this._bestScore) {
            this._bestScore = score;
            cc.sys.localStorage.setItem("bestScore", score);
        }

    },

    onEnter: function () {
        this._super();
        gameScene = this;


        // var level = cc.sys.localStorage.getItem("bestScore");
        // if (level) {
        //     this.setBestScore(parseInt(level));
        // }


        var soundValue = cc.sys.localStorage.getItem("sound");
        if (soundValue) {
            this.setSound(parseInt(soundValue));
        }
        else {
            this.setSound(2);
        }


        var bg = new cc.Sprite(res.bg);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        bg.setScale(scale.x, scale.y);
        this.addChild(bg);


        this.homeLayer = HomeLayer.create();
        this.addChild(this.homeLayer);
        this.homeLayer.setSound(this._isSoundOn);


        this.gameLayer = GameLayer.create();
        this.addChild(this.gameLayer);
        this.gameLayer.setVisible(false);

        this.popupEndGame = ResultLayer.create();
        this.addChild(this.popupEndGame);
        this.popupEndGame.setVisible(false);

        this.popupHelp = PopupHelp.create();
        this.addChild(this.popupHelp);
        this.popupHelp.setVisible(false);

        this.shopLayer = PopupShop.create();
        this.addChild(this.shopLayer);
        this.shopLayer.setVisible(false);

        this.shopLayer = PopupShop.create();
        this.addChild(this.shopLayer);
        this.shopLayer.setVisible(false);

        this.levelPopup = PopupLevel.create();
        this.addChild(this.levelPopup);
        this.levelPopup.setVisible(false);
    },

    onPlay: function (sender) {
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(true);
        this.popupEndGame.setVisible(false);
        this.shopLayer.setVisible(false);
        this.levelPopup.setVisible(false);

        this.gameLayer.initGame();
    },

    onHome: function (sender) {
        this.homeLayer.setVisible(true);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(false);
        this.popupEndGame.setVisible(false);
        this.shopLayer.setVisible(false);
        this.levelPopup.setVisible(false);
    },

    onHelp: function (sender) {
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(true);
        this.gameLayer.setVisible(false);
        this.popupEndGame.setVisible(false);
        this.shopLayer.setVisible(false);
        this.levelPopup.setVisible(false);
    },

    onReplay: function (sender) {
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(true);
        this.popupEndGame.setVisible(false);
        this.shopLayer.setVisible(false);
        this.levelPopup.setVisible(true);
        this.gameLayer.initGame();
    },

    onShop: function (sender) {
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(false);
        this.popupEndGame.setVisible(false);
        this.shopLayer.setVisible(true);
        this.levelPopup.setVisible(false);
    },

    onLevel: function (sender) {
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(false);
        this.popupEndGame.setVisible(false);
        this.shopLayer.setVisible(false);
        this.levelPopup.setVisible(true);
    },


    onSound: function () {
        if (this._isSoundOn == 2) {
            this.setSound(1);
            this.homeLayer.setSound(1);

        }
        else {
            this.setSound(2);
            this.homeLayer.setSound(2);

        }
    },


    onEndGame: function (sender) {
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(false);
        this.shopLayer.setVisible(false);
        this.popupEndGame.setVisible(true);
        this.popupEndGame.updateLabel();
    },

});

