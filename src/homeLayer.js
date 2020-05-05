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


var HomeLayer = cc.Layer.extend({
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        console.log(" init home layer");

        var logo = new cc.Sprite(res.logo);
        logo.setScale(scaleMin);
        logo.attr({
            x: size.width / 2,
            y: size.height / 2 + logo.height * 0.8 * scaleMin
        });
        this.addChild(logo, 0);

        var btnNewGame = new ccui.Button();
        btnNewGame.setScale(scaleMin);
        btnNewGame.loadTextureNormal(res.btnPlay, ccui.Widget.LOCAL_TEXTURE);
        btnNewGame.attr({
            x: size.width / 2,
            y: size.height / 2 - btnNewGame.height * scaleMin / 2
        });

        btnNewGame.setScale(scaleMin);
        this.addChild(btnNewGame, 0);
        btnNewGame.addClickEventListener(function () {
            gameScene.onLevel();
            console.log("on new btn PLay");
        });

        var btnHelp = new ccui.Button();
        btnHelp.setScale(scaleMin);
        btnHelp.loadTextureNormal(res.btnHelp, ccui.Widget.LOCAL_TEXTURE);
        btnHelp.attr({
            x: size.width * 0.45,
            y: size.height * 0.15
        });

        btnHelp.setScale(scaleMin);
        this.addChild(btnHelp, 0);
        btnHelp.addClickEventListener(function () {
            gameScene.onHelp();
        });

        var btnShop = new ccui.Button();
        btnShop.setScale(scaleMin);
        btnShop.loadTextureNormal(res.btnShop, ccui.Widget.LOCAL_TEXTURE);
        btnShop.attr({
            x: size.width * 0.55,
            y: size.height * 0.15
        });

        btnShop.setScale(scaleMin);
        this.addChild(btnShop, 0);
        btnShop.addClickEventListener(function () {
            gameScene.onShop();
        });

        this.btnSound = new ccui.Button();
        this.btnSound.setScale(scaleMin);
        this.btnSound.loadTextureNormal(res.btnSoundOn, ccui.Widget.LOCAL_TEXTURE);
        this.btnSound.attr({
            x: size.width /1.05,
            y: size.height / 1.1
        });
        this.btnSound.setScale(scaleMin);
        this.addChild(this.btnSound, 0);
        this.btnSound.addClickEventListener(function () {
            gameScene.onSound();
        });



        return true;
    },

    setSound: function (value) {
        if (value == 2) {
            this.btnSound.loadTextureNormal(res.btnSoundOn);
            cc.audioEngine.playMusic(res.bgMusic, true);
        }
        else {
            this.btnSound.loadTextureNormal(res.btnSoundOff);
            cc.audioEngine.stopMusic();
        }
    },

    onEnter: function () {
        this._super();

        this.setSound(gameScene._isSoundOn);
    },
});

HomeLayer.create = function () {
    var homeLayer = new HomeLayer();
    // homeLayer.retain();
    // gameScene.addChild(hitEffect, 10);
    return homeLayer;
};
