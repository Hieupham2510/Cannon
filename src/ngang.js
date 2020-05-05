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


var Ground = cc.Node.extend({
    // grounds: [],

    // lBest: null,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.ground = new cc.Sprite(res.ground1);
        this.ground.setScale(scaleMin);
        this.ground.setAnchorPoint(0.5, 1);
        this.addChild(this.ground, 0);

        this.  bgLevel = new cc.Sprite(res.bgLevel);
        this. bgLevel.setScale(scaleMin);
        this. bgLevel.y = -this.ground.height * scaleMin;
        this. bgLevel.setAnchorPoint(0.5, 0);
        this.addChild(this. bgLevel, 1);

        this.text = new cc.LabelTTF("", res.font.srcs[0], 32);
        // this.text.setFontFillColor(new cc.Color(108, 31, 6, 255));
        this. bgLevel.addChild(this.text, 1);
        this.text.attr({
            x: this. bgLevel.width / 2,
            y: this. bgLevel.height / 2
        });
        // this. lBest = new cc.LabelTTF(this.__instanceId.toString() , res.font.srcs[0], 32);
        // this.lBest.attr({
        //     x:  300,
        //     y: 0
        // });
        // this.addChild(this.lBest,10);
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    },

    setLevel: function (level) {
        this.text.setString(level.toString());
    },

    passLevel: function () {
        this.text.setString("");
        this.bgLevel.setVisible(false);
    }

});

Ground.create = function () {
    var dan = new Ground();
    // gameScene.addChild(hitEffect, 10);
    return dan;
};
