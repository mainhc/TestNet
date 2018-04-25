var LogicCmd = cc.Class({
     properties: {
           MsgHandle:null,
           akLogicMsg:[],
     },

    initLogicCmd:function()
    {
        this.MsgHandle = {};
        this.MsgHandle["Player.cPlayerTrun"] = this.onLogicPlayerTrun;
        this.MsgHandle["Player.cPlayerState"] = this.onLogicPlayerState;


    },

    updateLogicCmd(dt){
        if(this.akLogicMsg.length > 0)
        {
           // cc.log("+++updateLogicCmd+++" + this.akLogicMsg.length);
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

    onLogicPlayerState:function(msgcmd){
        cc.GameObjMgr.playerobjState(msgcmd.objLogicID, msgcmd.ObjState);
        
    },
   
});
module.exports = {LogicCmd};