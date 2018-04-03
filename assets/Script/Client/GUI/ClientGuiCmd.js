var ClientGuiCmd = cc.Class({
     properties: {
           GuiMsgHandle:null,
           akClientGuiMsg:[],
     },

    initClientGuiCmd:function()
    {
        this.GuiMsgHandle = {};
        //this.GuiMsgHandle["ui.updatezhunbei"] = this.onPlayerConnect;


    },

    registerClientGuiMsg:function(msgname,func){
        this.GuiMsgHandle[msgname] = func;
    },

    updateClientGuiCmd:function(dt){
        if(this.akClientGuiMsg.length > 0)
        {
            var clientguimsg = this.akClientGuiMsg.shift();
            this.DoHandleGuiMsg(clientguimsg);
        }

    },

    PushClientGuiMsg:function(logicMSg){
        this.akClientMsg.push(logicMSg)
    },

    DoHandleGuiMsg:function(clientguiMSg)
    {
        var msgFun = this.GuiMsgHandle[clientguiMSg.msgname];
        if(msgFun != null)
        {
            msgFun(clientguiMSg.msgcmd);
        }
    },

    onPlayerConnect:function(msgcmd)
    {
        cc.PlayerInfo.setPlayerId(msgcmd.Clinetid);
        cc.director.loadScene("zhunbeiGo");
        //cc.GameObjMgr.setClientID(msgcmd.Clinetid);
        //cc.GameObjMgr.createGameObj(msgcmd.Clinetid,10002,true);
    }, 
   
   
});
module.exports = {ClientGuiCmd};
