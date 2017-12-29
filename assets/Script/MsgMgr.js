let protobuf = require("protobufjs");

var MsgMgr = cc.Class({

    properties: {
        MsgMapStr:null,
        MsgMapId:null,
        m_pbBuilder:null,
    },

    registerMsg:function(msgStr,msgID)
    {
        this.MsgMapStr[msgStr] = msgID;
        this.MsgMapId[msgID] = msgStr;
    },
    init:function()
    {
        if(this.m_pbBuilder == null)
        {
            this.m_pbBuilder = protobuf.newBuilder();
            protobuf.protoFromFile(cc.url.raw('resources/msgconfig/Player.proto'),this.m_pbBuilder);
            this.MsgMapStr= {};
            this.MsgMapId = {};
            this.registerMsg("Player.cPlayerInfo",10001);  
        }
        // let PB = cc.builder.build('grace.proto.msg');
        // var  temp = new PB.Player();
        // temp.id = 1000003;
        // temp.name = "hahahaer";
        // temp.enterTime = 222222;
        // let data = temp.toArrayBuffer();
        // cc.Net.sendData(data);       

    },

    CreateMsgByID:function(msgId)
    {
        var pMSgStr =  this.MsgMapId[msgId];
        if(pMSgStr != null)
        {
            var prostrs = pMSgStr.split(".");
            if(prostrs.length != 2)
            {
                return null;
            }
            let PB = this.m_pbBuilder.build(prostrs[0]);          
            var tempp = prostrs[1];
            return new PB[tempp]();           
        }
        return null;
    },

    CreateMsgByStr:function(msgstr)
    {
        var pMSgStr = msgstr;
        var prostrs = pMSgStr.split(".");
        if(prostrs.length != 2)
        {
            return null;
        }
        let PB = this.m_pbBuilder.build(prostrs[0]);          
        var tempp = prostrs[1];
        return new PB[tempp]();
    },

    sendMsgToServer:function(cMsg)
    {
        let senddata = cMsg.toArrayBuffer();
        cc.Net.sendData(senddata);     
    },  
});

module.exports = {MsgMgr};
