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

var res = {
    font: {
        type: "font",
        name: "Pony",
        srcs: ["res/fonts/Pony.otf"]
    },


    bg: "res/bg/bg.png",
    decorTop: "res/bg/top.png",
    decorL: "res/bg/k2.png",
    decorR: "res/bg/k1.png",
    ground1: "res/bg/ground1.png",
    ground2: "res/bg/ground2.png",

    bgScore: "res/bg/bgScore.png",
  
    bgPopup: "res/bg/bgPopup.png",
    bgLvl: "res/bg/bgLvl.png",
    popupLayer: "res/bg/popupLayer.png",
    bgGameOver: "res/item/bgGameOver.png",
    bgHelp: "res/item/bgHelp.png",
    bgItem: "res/item/bgItem.png",
    bgSelectLvl: "res/item/bgSelectLvl.png",

    logo : "res/bg/logo.png",
    titleGameOver : "res/bg/titleGameOver.png",
    titleHelp : "res/bg/titleHelp.png",

    btnLevel : "res/button/btnSelectlvl.png",

    btnPlay: "res/button/btnPlay.png",
    btnReplay: "res/button/btnReplay.png",
    btnBack: "res/button/btnBack.png",
    btnHelp: "res/button/btnHelp.png",
    btnHome: "res/button/btnHome.png",
    btnSoundOn: "res/button/btnSoundOn.png",
    btnSoundOff: "res/button/btnSoundOff.png",
    btnShop: "res/button/btnShop.png",
    btnNext: "res/button/btnNext.png",
    btnPrevious: "res/button/btnPrevious.png",

    ball: "res/item/bong.png",
    bar: "res/item/luc.png",
    progressBar: "res/item/progress.png",
    iconScore: "res/item/score.png",
    bgLevel: "res/item/muc.png",

    cannon1: "res/item/cannon1.png",
    cannon2: "res/item/cannon2.png",
    cannon3: "res/item/cannon3.png",
    cannon4: "res/item/cannon4.png",
    cannon5: "res/item/cannon5.png",
    cannon6: "res/item/cannon6.png",
    cannon7: "res/item/cannon7.png",
    cannon8: "res/item/cannon8.png",

    bullet1 :"res/item/bullet1-4.png",
    bullet2 :"res/item/bullet5-6.png",
    bullet3 :"res/item/bullet7.png",
    bullet4 :"res/item/bullet8.png",

    txthelp :"res/item/txtHelp.png",

    star1 : "res/item/star1.png",
    star2 : "res/item/star2.png",
    star3 : "res/item/star3.png",


    bgMusic : "res/sounds/bgMusic.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
