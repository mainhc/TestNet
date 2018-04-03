var ClientGuiCmd = cc.Class({
     properties: {
           GuiMsgHandle:null,
           GuiMsgObjThis:null,
           akClientGuiMsg:[],
     },

    initClientGuiCmd:function()
    {
        this.GuiMsgHandle = {};
        this.GuiMsgObjThis = {};
    },

    registerClientGuiMsg:function(msgname,func,pObjThis){
        this.GuiMsgHandle[msgname] = func;
        this.GuiMsgObjThis[msgname] = pObjThis;
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
        var msgObjThis = this.GuiMsgObjThis[clientguiMSg.UiMsgName];
        if(msgFun != null)
        {
            msgFun(clientguiMSg.akMsgParame,msgObjThis);
        }
    },   
   
});
module.exports = {ClientGuiCmd};
