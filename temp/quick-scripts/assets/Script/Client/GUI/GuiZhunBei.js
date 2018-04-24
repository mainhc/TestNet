(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Client/GUI/GuiZhunBei.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6d620l167JOD4iONyC4h5Ms', 'GuiZhunBei', __filename);
// Script/Client/GUI/GuiZhunBei.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        m_pPlayerID: cc.Label,
        m_pPlayerNum: cc.Label,
        m_pBeginTime: cc.Label

    },

    start: function start() {
        var myPlayerID = cc.PlayerInfo.getMyPlayerID();
        // var plabel = this.m_pPlayerID.getComponent(cc.Label);
        this.m_pPlayerID.string = myPlayerID;

        cc.ClientGuiCmd.registerClientGuiMsg("updataZhunBei", this.onUpdataZhunBeiData, this);
    },
    onUpdataZhunBeiData: function onUpdataZhunBeiData(msgdata, pSelf) {

        cc.log("+++++++onUpdataZhunBeiData");
        if (pSelf == null) {
            return;
        }
        if (msgdata.length == 2) {
            var iNum = msgdata[0];
            var strTemp = "人数：" + iNum;
            pSelf.m_pPlayerNum.string = strTemp;
            var iTime = msgdata[1];
            strTemp = "倒计时：" + iTime;
            pSelf.m_pBeginTime.string = strTemp;
        }
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
        //# sourceMappingURL=GuiZhunBei.js.map
        