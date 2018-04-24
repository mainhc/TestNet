var ClientCmd = cc.Class({
     properties: {
           MsgHandle:null,
           akClientMsg:[],
     },

    initClientCmd:function()
    {
        this.MsgHandle = {};
        this.MsgHandle["Player.cPlayerConnect"] = this.onPlayerConnect;
        this.MsgHandle["Player.cPlayerCreator"] = this.onPlayerCreator;
        this.MsgHandle["Player.cUiMessage"] = this.onUiMessage;
        this.MsgHandle["Player.cGameRaceStart"] = this.onGameRaceStart;

    },

    updateClientCmd:function(dt){
        if(this.akClientMsg.length > 0)
        {
            var clientmsg = this.akClientMsg.shift();
            this.DoHandleMsg(clientmsg);
        }

    },

    PushClientMsg:function(logicMSg){
        this.akClientMsg.push(logicMSg)
    },

    DoHandleMsg:function(clientMSg)
    {
        var msgFun = this.MsgHandle[clientMSg.msgname];
        if(msgFun != null)
        {
            msgFun(clientMSg.msgcmd);
        }
    },

    onPlayerConnect:function(msgcmd)
    {
        cc.PlayerInfo.setPlayerId(msgcmd.Clinetid);
        cc.director.loadScene("zhunbeiGo");
        //cc.GameObjMgr.setClientID(msgcmd.Clinetid);
        //cc.GameObjMgr.createGameObj(msgcmd.Clinetid,10002,true);
    },

    onPlayerCreator:function(msgcmd)
    {
        var clientid = msgcmd.Clinetid;
        var myClientId = cc.PlayerInfo.getMyPlayerID();
        if(clientid != myClientId)
        {
           cc.GameObjMgr.createGameObj(clientid,10002,cc.p(400,300),false);
        }
        else
        {
            cc.GameObjMgr.createGameObj(myClientId,10002,cc.p(400,300),true);
        }
    },

    onUiMessage:function(msgcmd){
        if(cc.ClientGuiCmd !== undefined){
            cc.ClientGuiCmd.PushClientGuiMsg(msgcmd);
        }
    },

    onGameRaceStart:function(msgcmd){
         cc.director.loadScene("gameworld");
        // cc.GameObjMgr.createGameObj(msgcmd.Clinetid,10002,true);
    }

   
   
});
module.exports = {ClientCmd};
