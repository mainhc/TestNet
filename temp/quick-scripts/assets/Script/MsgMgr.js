(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/MsgMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a68d8Q9NpRB6r+VpkIRI/gY', 'MsgMgr', __filename);
// Script/MsgMgr.js

"use strict";

var protobuf = require("protobufjs");
var ByteBuffer = require("bytebuffer");
var LogicCmd = require("LogicCmd").LogicCmd;
var ClientCmd = require("ClientCmd").ClientCmd;
var ClientGuiCmd = require("ClientGuiCmd").ClientGuiCmd;

var MsgMgr = cc.Class({

    properties: {
        MsgMapStr: null,
        MsgMapId: null,
        m_pbBuilder: null
    },

    registerMsg: function registerMsg(msgStr, msgID) {
        this.MsgMapStr[msgStr] = msgID;
        this.MsgMapId[msgID] = msgStr;
    },

    getMsgStrByID: function getMsgStrByID(msgID) {
        var pMSgStr = this.MsgMapId[msgID];
        return pMSgStr;
    },

    init: function init() {
        if (this.m_pbBuilder == null) {
            this.m_pbBuilder = protobuf.newBuilder();
            protobuf.protoFromFile(cc.url.raw('resources/msgconfig/Player.proto'), this.m_pbBuilder);
            this.MsgMapStr = {};
            this.MsgMapId = {};
            this.registerMsgByConfig();
            //this.registerMsg("Player.cPlayerInfo",10001);  
        }
        if (cc.LogicCmd == null) {
            cc.LogicCmd = new LogicCmd();
            cc.LogicCmd.initLogicCmd();
        }
        if (cc.ClientCmd == null) {
            cc.ClientCmd = new ClientCmd();
            cc.ClientCmd.initClientCmd();
        }
        if (cc.ClientGuiCmd === undefined) {
            cc.ClientGuiCmd = new ClientGuiCmd();
            cc.ClientGuiCmd.initClientGuiCmd();
        }
    },

    registerMsgByConfig: function registerMsgByConfig() {
        var pSelf = this;
        cc.loader.loadRes('msgconfig/MsgRegisterMap', function (err, Cfg) {
            var MsgCfg = Cfg;
            for (var k in MsgCfg) {
                var tempmsgname = MsgCfg[k];
                pSelf.registerMsg(tempmsgname, parseInt(k));
            }

            //连接服务器
            cc.Net.initNet("192.168.214.64", "10131");
        });
    },

    CreateMsgByID: function CreateMsgByID(msgId) {
        var pMSgStr = this.MsgMapId[msgId];
        if (pMSgStr != null) {
            var prostrs = pMSgStr.split(".");
            if (prostrs.length != 2) {
                return null;
            }
            var PB = this.m_pbBuilder.build(prostrs[0]);
            var tempp = prostrs[1];
            return new PB[tempp]();
        }
        return null;
    },

    MsgToDecode: function MsgToDecode(msgId) {
        var pMSgStr = this.MsgMapId[msgId];
        var tempPB = this.m_pbBuilder.build(pMSgStr);

        return tempPB;
    },

    CreateMsgByStr: function CreateMsgByStr(msgstr) {
        var pMSgStr = msgstr;
        var prostrs = pMSgStr.split(".");
        if (prostrs.length != 2) {
            return null;
        }
        var PB = this.m_pbBuilder.build(prostrs[0]);
        var tempp = prostrs[1];
        return new PB[tempp]();
    },

    MsgRecvData: function MsgRecvData(recvData) {
        if (cc.sys.isNative) {
            var pMSg = cc.MsgMgr.MsgToDecode(10004);
            var tempMsg = pMSg.decode(recvData);
        } else {
            var reader = new FileReader();
            reader.readAsArrayBuffer(recvData);
            var pSelf = this;
            reader.onload = function (e) {
                var buffertemp = reader.result;
                var idView = new Uint32Array(buffertemp, 0, 1);
                var pMSg = cc.MsgMgr.MsgToDecode(idView);
                //100000以上的是单局外的消息
                var pMsgData = buffertemp.slice(4);
                if (idView > 100000) {
                    var tempMsg = pMSg.decode(pMsgData);
                    var ClientMsg = {};
                    ClientMsg.msgname = pSelf.getMsgStrByID(idView);
                    ClientMsg.msgcmd = tempMsg;
                    cc.ClientCmd.PushClientMsg(ClientMsg);
                } else {
                    var tempMsg = pMSg.decode(pMsgData);
                    var LogicMsg = {};
                    LogicMsg.msgname = pSelf.getMsgStrByID(idView);
                    LogicMsg.msgcmd = tempMsg;
                    cc.LogicCmd.PushLogicMsg(LogicMsg);
                }
            };
        }
    },

    sendMsgToServer: function sendMsgToServer(msgid, cMsg) {
        var senddata = cMsg.toArrayBuffer();
        var iBufSize = senddata.byteLength;
        var resSend = new ArrayBuffer(iBufSize + 4);
        var msgdata = new Int8Array(senddata);
        var ResSenddata = new Int8Array(resSend);
        ResSenddata[0] = msgid;
        ResSenddata[1] = msgid >> 8;
        ResSenddata[2] = msgid >> 16;
        ResSenddata[3] = msgid >> 24;
        ResSenddata.set(msgdata, 4);
        cc.Net.sendData(resSend);
    },

    updateMsgMgr: function updateMsgMgr(dt) {
        if (cc.ClientCmd != null) {
            cc.ClientCmd.updateClientCmd(dt);
        }
        if (cc.ClientGuiCmd !== undefined) {
            cc.ClientGuiCmd.updateClientGuiCmd(dt);
        }
        if (cc.LogicCmd != null) {
            cc.LogicCmd.updateLogicCmd(dt);
        }
    }
});

module.exports = { MsgMgr: MsgMgr };

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
        //# sourceMappingURL=MsgMgr.js.map
        