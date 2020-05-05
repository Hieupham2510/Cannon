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


var PopupHelp = cc.Layer.extend({

    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        console.log("init popup help");

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var blackLayer = new cc.Sprite(res.popupLayer);
        blackLayer.setScale(scale.x, scale.y);
        blackLayer.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(blackLayer, 0);

        var btnBack = new ccui.Button();
        btnBack.loadTextureNormal(res.btnBack, ccui.Widget.LOCAL_TEXTURE);
        btnBack.setScale(scaleMin);
        btnBack.attr({
            x: btnBack.width * scaleMin * 1.5,
            y:  size.height - btnBack.height * 1.4
            // y:  logo.y -logo.height/2 - btnNewGame.height/2 - 50
        });
        this.addChild(btnBack,1);
        btnBack.addClickEventListener(function () {
            gameScene.onHome();
        });

        var bang = new cc.Sprite(res.bgHelp);
        bang.setScale(scaleMin);
        bang.attr({
            x: size.width / 2,
            y: size.height / 2 - 20
        });
        this.addChild(bang, 1);

        var txtHelp = new cc.Sprite(res.txthelp);
        txtHelp.setScale(scaleMin);
        txtHelp.attr({
            x: bang.width / 2,
            y: bang.height / 2 - 20
        });
        bang.addChild(txtHelp, 1);

        return true;
    }
});

PopupHelp.create = function () {
    var popupHelp = new PopupHelp();
    // popupHelp.retain();
    // gameScene.addChild(hitEffect, 10);
    return popupHelp;
};
