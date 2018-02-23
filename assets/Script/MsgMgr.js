let protobuf = require("protobufjs");
let ByteBuffer = require("bytebuffer");

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
            this.registerMsgByConfig();
            //this.registerMsg("Player.cPlayerInfo",10001);  
        }
    },

    registerMsgByConfig:function()
    {
        var pSelf = this;
        cc.loader.loadRes('msgconfig/MsgRegisterMap', function(err, Cfg) 
        {
            var MsgCfg = Cfg;
            for(var k in MsgCfg)
            {
                var tempmsgname = MsgCfg[k];
                pSelf.registerMsg(tempmsgname,parseInt(k));
            }
        });

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

    MsgToDecode:function(msgId)
    {
        var pMSgStr =  this.MsgMapId[msgId];
        var tempPB = this.m_pbBuilder.build(pMSgStr);
       
        return tempPB;
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

    MsgRecvData:function(recvData)
    {
        var pMSg = cc.MsgMgr.MsgToDecode(10001);      
         if(cc.sys.isNative)
         {
            var tempMsg = pMSg.decode(recvData);
         }
         else
         {
             var reader = new FileReader();
             reader.readAsArrayBuffer(recvData);
             reader.onload = function (e)
             {               
                    var buffertemp = reader.result;
                    var tempMsg = pMSg.decode(buffertemp);
                    cc.log("recvServer +++ "+ tempMsg.id + "  " + tempMsg.name+"  "+ tempMsg.enterTime);               
             }
         }     
    },

    sendMsgToServer:function(msgid,cMsg)
    {
        
        let senddata = cMsg.toArrayBuffer();        
        var iBufSize = senddata.byteLength;
        var resSend = new ArrayBuffer(iBufSize+4);
        var msgdata = new Int8Array(senddata);
        var ResSenddata = new Int8Array(resSend);
        ResSenddata[0] = msgid;
        ResSenddata[1] = msgid>>8;
        ResSenddata[2] = msgid>>16;
        ResSenddata[3] = msgid>>24;
        ResSenddata.set(msgdata,4);
        cc.Net.sendData(resSend);     
    },  
});

module.exports = {MsgMgr};
