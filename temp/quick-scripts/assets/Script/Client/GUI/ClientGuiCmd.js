(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Client/GUI/ClientGuiCmd.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '815422N9uNOPoI0BuRrYfGx', 'ClientGuiCmd', __filename);
// Script/Client/GUI/ClientGuiCmd.js

"use strict";

var ClientGuiCmd = cc.Class({
    properties: {
        GuiMsgHandle: null,
        GuiMsgObjThis: null,
        akClientGuiMsg: []
    },

    initClientGuiCmd: function initClientGuiCmd() {
        this.GuiMsgHandle = {};
        this.GuiMsgObjThis = {};
    },

    registerClientGuiMsg: function registerClientGuiMsg(msgname, func, pObjThis) {
        this.GuiMsgHandle[msgname] = func;
        this.GuiMsgObjThis[msgname] = pObjThis;
    },

    updateClientGuiCmd: function updateClientGuiCmd(dt) {
        if (this.akClientGuiMsg.length > 0) {
            var clientguimsg = this.akClientGuiMsg.shift();
            this.DoHandleGuiMsg(clientguimsg);
        }
    },

    PushClientGuiMsg: function PushClientGuiMsg(logicMSg) {
        this.akClientGuiMsg.push(logicMSg);
    },

    DoHandleGuiMsg: function DoHandleGuiMsg(clientguiMSg) {
        var msgFun = this.GuiMsgHandle[clientguiMSg.UiMsgName];
        var msgObjThis = this.GuiMsgObjThis[clientguiMSg.UiMsgName];
        if (msgFun != null) {
            msgFun(clientguiMSg.akMsgParame, msgObjThis);
        }
    }

});
module.exports = { ClientGuiCmd: ClientGuiCmd };

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
        //# sourceMappingURL=ClientGuiCmd.js.map
        