(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5087a7bNwJO2aH/mbC+HCSL', 'main', __filename);
// Script/main.js

"use strict";

var cClientNet = require("ClientNet").ClientNet;
var cMsgMgr = require("MsgMgr").MsgMgr;
var cGameInit = require("GameInit").GameInit;
var cTableMgr = require("TableMgr").tableMgr;
var cPlayerInfo = require("PlayerInfo").PlayerInfo;

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {

        cc.game.setFrameRate(30);
        cc.game.addPersistRootNode(this.node);
        if (cc.cPlayerInfo == null) {
            cc.PlayerInfo = new cPlayerInfo();
        }
        if (cc.Net == null) {
            cc.Net = new cClientNet();
        }
        if (cc.MsgMgr == null) {
            cc.MsgMgr = new cMsgMgr();
            cc.MsgMgr.init();
        }
        if (cc.GameInit == null) {
            cc.GameInit = new cGameInit();
        }
        if (cc.TableMgr == null) {
            cc.TableMgr = new cTableMgr();
            cc.TableMgr.initTabel();
        }
    },


    update: function update(dt) {
        if (cc.MsgMgr != null) {
            cc.MsgMgr.updateMsgMgr(dt);
        }
    },

    onDestroy: function onDestroy() {
        cc.log("onDestroy+++++++main");
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=main.js.map
        