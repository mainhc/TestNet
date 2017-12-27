(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ClientNet.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9a860BP1jBOBqNIamRZgIRX', 'ClientNet', __filename);
// Script/ClientNet.js

"use strict";

var ClientNet = cc.Class({

    properties: {
        m_strServerIp: "",
        m_strIpPort: "",
        m_pWebSocket: null
    },

    initNet: function initNet(svrIp, strPort) {
        if (svrIp == "" || svrIp == null) {
            return false;
        }
        if (strPort == "" || strPort == null) {
            return false;
        }
        this.m_strServerIp = svrIp;
        this.m_strIpPort = strPort;
        var strWs = "ws://" + this.m_strServerIp + ":" + this.m_strIpPort;
        try {
            this.m_pWebSocket = new WebSocket(strWs);
            var pSelf = this;
            this.m_pWebSocket.onopen = function (evt) {
                cc.log("m_pWebSocket    onopen");
                pSelf.m_pWebSocket.send("my clinet go01");
                pSelf.m_pWebSocket.send("my clinet go02");
                pSelf.m_pWebSocket.send("my clinet go03");
                pSelf.m_pWebSocket.send("my clinet go04");
                pSelf.m_pWebSocket.send("my clinet go05");
            };

            this.m_pWebSocket.onclose = function (evt) {
                cc.log("m_pWebSocket    onclose");
            };

            this.m_pWebSocket.onmessage = function (evt) {
                cc.log("m_pWebSocket    onmessage");
            };

            this.m_pWebSocket.onerror = function (evt) {
                cc.log("m_pWebSocket    onerror");
            };
        } catch (e) {
            cc.log(e.name + " NetError:" + e.message);
        };

        //this.m_pWebSocket.
    },

    CloseNet: function CloseNet() {
        if (this.m_pWebSocket != null) {
            this.m_pWebSocket.close();
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

module.exports = { ClientNet: ClientNet };

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
        //# sourceMappingURL=ClientNet.js.map
        