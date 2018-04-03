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
        this.akClientGuiMsg.push(logicMSg)
    },

    DoHandleGuiMsg:function(clientguiMSg)
    {
        var msgFun = this.GuiMsgHandle[clientguiMSg.UiMsgName];
        if(msgFun != null)
        {
            msgFun(clientguiMSg.akMsgParame);
        }
    },   
   
});
module.exports = {ClientGuiCmd};
