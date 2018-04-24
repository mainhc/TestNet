(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Client/Logic/LogicCmd.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '89829ZAT0pPqbC8UcozjFOL', 'LogicCmd', __filename);
// Script/Client/Logic/LogicCmd.js

"use strict";

var LogicCmd = cc.Class({
    properties: {
        MsgHandle: null,
        akLogicMsg: []
    },

    initLogicCmd: function initLogicCmd() {
        this.MsgHandle = {};
        this.MsgHandle["Player.cPlayerTrun"] = this.onLogicPlayerTrun;
        this.MsgHandle["Player.cPlayerState"] = this.onLogicPlayerState;
    },

    updateLogicCmd: function updateLogicCmd(dt) {
        if (this.akLogicMsg.length > 0) {
            cc.log("+++updateLogicCmd+++" + this.akLogicMsg.length);
            var logicmsg = this.akLogicMsg.shift();
            this.DoHandleMsg(logicmsg);
        }
    },


    PushLogicMsg: function PushLogicMsg(logicMSg) {
        this.akLogicMsg.push(logicMSg);
    },

    DoHandleMsg: function DoHandleMsg(logicMSg) {
        var msgFun = this.MsgHandle[logicMSg.msgname];
        if (msgFun != null) {
            msgFun(logicMSg.msgcmd);
        }
    },

    onLogicPlayerTrun: function onLogicPlayerTrun(msgcmd) {

        cc.GameObjMgr.playerObjTurn(msgcmd.objLogicID, parseFloat(msgcmd.fDir));
    },

    onLogicPlayerState: function onLogicPlayerState(msgcmd) {
        cc.GameObjMgr.playerobjState(msgcmd.objLogicID, msgcmd.ObjState);
    }

});
module.exports = { LogicCmd: LogicCmd };

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
        //# sourceMappingURL=LogicCmd.js.map
        