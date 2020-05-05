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


var Ball = cc.Node.extend({
    ball: null,
    vy:0,
    maxPosY :0,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.ball = new cc.Sprite(res.ball);
        this.ball.setScale(scaleMin);
        this.addChild(this.ball, 0);
    },

    onEnter: function () {
        this._super();

        this.scheduleUpdate();
    },

    onExit: function(){
        this._super();

        this.unscheduleUpdate();
    },

    update: function (dt) {
        if(this.y - this.getHeightHalp() > this.maxPosY){
            this.maxPosY = this.y - this.getHeightHalp() > this.maxPosY ? this.y - this.getHeightHalp() : this.maxPosY;
        }
    },

    getHeightHalp: function () {
        return this.ball.height* scaleMin/2;
    },

    startRotate: function () {
        let rotate = new cc.RotateBy(1,360);
        let repeat = new cc.RepeatForever(rotate);
        this.ball.runAction(repeat);
    },

    stopRotate: function () {
        this.ball.stopAllActions();
    }
});

Ball.create = function () {
    var dan = new Ball();
    // gameScene.addChild(hitEffect, 10);
    return dan;
};
