var LogicCmd = cc.Class({
     properties: {
           MsgHandle:null,
           akLogicMsg:[],
     },

    initLogicCmd:function()
    {
        this.MsgHandle = {};
        this.MsgHandle["Player.cPlayerTrun"] = this.onLogicPlayerTrun;

    },

    updateLogicCmd(dt){
        if(this.akLogicMsg.length > 0)
        {
            var logicmsg = this.akLogicMsg.shift();
            this.DoHandleMsg(logicmsg);
        }

    },

    PushLogicMsg:function(logicMSg){
        this.akLogicMsg.push(logicMSg)
    },

    DoHandleMsg:function(logicMSg)
    {
        var msgFun = this.MsgHandle[logicMSg.msgname];
        if(msgFun != null)
        {
            msgFun(logicMSg.msgcmd);
        }
    },

    onLogicPlayerTrun:function(msgcmd){

        cc.GameObjMgr.playerObjTurn(msgcmd.objLogicID, parseFloat(msgcmd.fDir));
    },
   
});
module.exports = {LogicCmd};