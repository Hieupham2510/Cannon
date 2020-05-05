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


var ResultLayer = cc.Layer.extend({

    lblScore: null,
    lblBestScore: null,
    star1: null,
    star2: null,
    star3: null,


    ctor: function () {
        this._super();
        console.log("init result layer");

        var blackLayer = new cc.Sprite(res.popupLayer);
        blackLayer.setScale(scale.x, scale.y);
        blackLayer.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(blackLayer, 0);

        var bang = new cc.Sprite(res.bgGameOver);
        bang.setScale(scaleMin);
        bang.attr({
            x: size.width / 2,
            y: size.height / 2 - 20
        });
        this.addChild(bang, 1);


        this.star1 = new cc.Sprite(res.star3);
        this.star1.setScale(scaleMin);
        this.star1.attr({
            x: bang.width / 1.6,
            y: bang.height / 1.5
        });
        bang.addChild(this.star1, 1);
        this.star1.setVisible(false);

        this.star2 = new cc.Sprite(res.star2);
        this.star2.setScale(scaleMin);
        this.star2.attr({
            x: bang.width / 2,
            y: bang.height / 1.45
        });
        bang.addChild(this.star2, 1);
        this.star2.setVisible(false);

        this.star3 = new cc.Sprite(res.star1);
        this.star3.setScale(scaleMin);
        this.star3.attr({
            x: bang.width / 2.65,
            y: bang.height / 1.5
        });
        bang.addChild(this.star3, 1);
        this.star3.setVisible(false);


        {
            this.lblScore = new cc.LabelTTF("SCORE: " + gameScene._score.toString(), res.font.srcs[0], 32);
            this.lblScore.enableStroke(new cc.Color(255, 255, 255, 255), 1);
            this.lblScore.setAnchorPoint(0, 0.5);
            bang.addChild(this.lblScore, 10);
            this.lblScore.attr({
                x: bang.width / 2.25,
                y: bang.height / 2
            });

            this.lblBestScore = new cc.LabelTTF("BEST SCORE: " + gameScene._score.toString(), res.font.srcs[0], 32);
            this.lblBestScore.enableStroke(new cc.Color(255, 255, 255, 255), 1);
            this.lblBestScore.setAnchorPoint(0, 0.5);
            bang.addChild(this.lblBestScore, 10);
            this.lblBestScore.attr({
                x: bang.width / 2.45,
                y: bang.height / 2.5
            });

        }

        this.btnReplay = new ccui.Button();
        this.btnReplay.loadTextureNormal(res.btnReplay, ccui.Widget.LOCAL_TEXTURE);
        this.btnReplay.attr({
            x: bang.width * 0.3,
            y: 130
        });

        bang.addChild(this.btnReplay, 0);
        this.btnReplay.addClickEventListener(function () {
            gameScene.onLevel();
        });

        this.btnHome = new ccui.Button();
        this.btnHome.loadTextureNormal(res.btnHome, ccui.Widget.LOCAL_TEXTURE);
        this.btnHome.attr({
            x: bang.width * 0.7,
            y: 130
        });
        bang.addChild(this.btnHome, 0);
        this.btnHome.addClickEventListener(function () {
            gameScene.onHome();
        });


        return true;
    },

    onEnter: function () {
        this._super();
        this.lblScore.setString("SCORE: " + gameScene._score.toString());
        this.lblBestScore.setString("BEST SCORE: : " + gameScene._bestScore.toString());

    },

    updateLabel: function () {
        this.lblScore.setString("SCORE: " + gameScene._score.toString());
        this.lblBestScore.setString("BEST SCORE: : " + gameScene._bestScore.toString());

        if (gameScene._score >= 10 && gameScene._score < 30) {
            this.star3.setVisible(true);
            this.star2.setVisible(false);
            this.star1.setVisible(false);
        } else if (gameScene._score > 30 && gameScene._score < 50) {
            this.star3.setVisible(true);
            this.star2.setVisible(true);
            this.star1.setVisible(false);
        } else if (gameScene._score >= 50) {
            this.star3.setVisible(true);
            this.star2.setVisible(true);
            this.star1.setVisible(true);
        }
    }
});

ResultLayer.create = function () {
    var popupHelp = new ResultLayer();
    // popupHelp.retain();
    // gameScene.addChild(hitEffect, 10);
    return popupHelp;
};
