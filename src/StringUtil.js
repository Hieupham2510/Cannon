
var StringUtil = {

};


var StringUtil_GenText = function (str, parent, pos) {
    let text = GameText.create();
    text.setPosition(pos);
    parent.addChild(text, 1000);
    text.setText(str);

    let movBy = new cc.MoveBy(1.5,cc.p(0, 200)).easing(cc.easeOut(2));
    var finish = new cc.CallFunc(function () {
       text.removeFromParent();
    });
    var seq = new cc.Sequence(movBy, finish);
    text.runAction(seq);
};

var GameText = cc.Node.extend({

    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.text = new cc.LabelTTF("", res.font.srcs[0], 60);
        // this.text.setFontFillColor(new cc.Color(108, 31, 6, 255));
        this.text.enableStroke(new cc.Color(159, 36, 0, 255),1);
        this.text.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        // this.text.setDimensions(570, 200);
        this.addChild(this.text,1);
        // this.text.attr({
        //     x: bang.width / 2,
        //     y: bang.height * 0.4
        // });
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    },

    setText:function (str) {
        this.text.setString(str);
    },

    setColor:function (color) {
        this.text.setFontFillColor(color);
    }
});

GameText.create = function () {
    var text = new GameText();
    // homeLayer.retain();
    // gameScene.addChild(hitEffect, 10);
    return text;
};