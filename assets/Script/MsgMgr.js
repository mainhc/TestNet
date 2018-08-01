let protobuf = require("protobufjs");
let ByteBuffer = require("bytebuffer");
var LogicCmd = require("LogicCmd").LogicCmd;
var ClientCmd = require("ClientCmd").ClientCmd;
var ClientGuiCmd = require("ClientGuiCmd").ClientGuiCmd;

protobuf.loadProtoFile = function(filename, callback, builder) { 
    if (callback && typeof callback === 'object') 
        builder = callback, 
        callback = null; 
    else if (!callback || typeof callback !== 'function') 
        callback = null; 
    if (callback) 
        return cc.loader.load(typeof filename === 'string' ? filename : filename["root"]+"/"+filename["file"], function(error, contents) { 
            if (contents === null) { 
                callback(Error("Failed to fetch file")); 
                return; 
            } 
            try { 
                callback(error, protobuf.loadProto(contents, builder, filename)); 
            } catch (e) { 
                callback(e); 
            } 
        }); 
    var contents = cc.loader.load(typeof filename === 'object' ? filename["root"]+"/"+filename["file"] : filename); 
    return contents === null ? null : protobuf.loadProto(contents, builder, filename); 
};

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

    getMsgStrByID:function(msgID)
    {
         var pMSgStr =  this.MsgMapId[msgID];
         return pMSgStr;
    },
    
    init:function()
    {
        if(this.m_pbBuilder == null)
        {
            this.m_pbBuilder = protobuf.newBuilder();
            let tempProto = cc.url.raw('resources/msgconfig/Player.proto');
            var callfun = function(error, builder){
                console.log("call ++= is ok");
               // var tempPB = builder.build("Player.cPlayerConnect");
            };
            protobuf.loadProtoFile(tempProto,callfun,this.m_pbBuilder);
            this.MsgMapStr= {};
            this.MsgMapId = {};
            this.registerMsgByConfig();
            //this.registerMsg("Player.cPlayerInfo",10001);  
        }
        if(cc.LogicCmd == null)
        {
            cc.LogicCmd = new LogicCmd;
            cc.LogicCmd.initLogicCmd();
        }
        if(cc.ClientCmd == null)
        {
            cc.ClientCmd = new ClientCmd;
            cc.ClientCmd.initClientCmd();
        }
        if(cc.ClientGuiCmd === undefined){
            cc.ClientGuiCmd = new ClientGuiCmd;
            cc.ClientGuiCmd.initClientGuiCmd();
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

            //连接服务器
            cc.Net.initNet("192.168.214.64","10131");
            //cc.Net.initNet("127.0.0.1","1440");
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
        var pMsgData = recvData;
        var dataview = new DataView(recvData);
        var datalen = dataview.byteLength;
        var idView =  dataview.getUint32(0,true);
        pMsgData = pMsgData.slice(4);
        var pMSg = cc.MsgMgr.MsgToDecode(idView);
        if(idView == 100000)
        {
                var currentFram = new Uint32Array(pMsgData,0,1);
                pMsgData = pMsgData.slice(4);              
                var iMsgSize =new Uint32Array(pMsgData,0,1); 
                pMsgData = pMsgData.slice(4);                  
                cc.log("++++100000++  " + currentFram+ " "+iMsgSize);
                             
                for(let iloop=0;iloop<iMsgSize;iloop++)
                {
                        var iSubMsgLen = new Uint32Array(pMsgData,0,1);
                        var idtempView = new Uint32Array(pMsgData,4,1);
                        var pSubMsgData = new Uint8Array(pMsgData,8,parseInt(iSubMsgLen)-4);
                        pMsgData = pMsgData.slice(parseInt(iSubMsgLen)+4);                      

                        var pSubMSg = cc.MsgMgr.MsgToDecode(idtempView);
                        var tempMsg = pSubMSg.decode(pSubMsgData);   
                        var LogicMsg = {};
                        LogicMsg.msgname = this.getMsgStrByID(idtempView);
                        LogicMsg.msgcmd = tempMsg;
                        cc.LogicCmd.PushLogicMsg(LogicMsg);
                }
        }
        else
        {
                if(idView > 100000)
                {                                                            
                    var tempMsg = pMSg.decode(pMsgData);   
                    var ClientMsg = {};
                    ClientMsg.msgname = this.getMsgStrByID(idView);
                    ClientMsg.msgcmd = tempMsg;
                    cc.ClientCmd.PushClientMsg(ClientMsg);
                }
                else
                {                                                      
                    var tempMsg = pMSg.decode(pMsgData);   
                    var LogicMsg = {};
                    LogicMsg.msgname = this.getMsgStrByID(idView);
                    LogicMsg.msgcmd = tempMsg;
                    cc.LogicCmd.PushLogicMsg(LogicMsg);
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

    updateMsgMgr:function(dt){
        if(cc.ClientCmd != null)
        {
            cc.ClientCmd.updateClientCmd(dt);
        }   
        if(cc.ClientGuiCmd !== undefined){
            cc.ClientGuiCmd.updateClientGuiCmd(dt);
        }
        if(cc.LogicCmd != null)
        {
            cc.LogicCmd.updateLogicCmd(dt);
        }    

    }
});

module.exports = {MsgMgr};
