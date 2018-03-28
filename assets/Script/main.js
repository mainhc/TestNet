
var cClientNet = require("ClientNet").ClientNet;
var cMsgMgr = require("MsgMgr").MsgMgr;
var cGameInit = require("GameInit").GameInit;
var cTableMgr = require("TableMgr").tableMgr;
var cPlayerInfo = require("PlayerInfo").PlayerInfo;

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        cc.game.setFrameRate(30);
        cc.game.addPersistRootNode(this.node);  
        if(cc.cPlayerInfo == null)
        {
            cc.PlayerInfo = new cPlayerInfo;
        }
        if(cc.Net == null)
        {
            cc.Net = new cClientNet;           
        }
        if(cc.MsgMgr == null)
        {
            cc.MsgMgr = new cMsgMgr;      
            cc.MsgMgr.init();  
        }
        if(cc.GameInit == null)
        {
            cc.GameInit = new cGameInit;
        }
        if(cc.TableMgr == null)
        {
            cc.TableMgr = new cTableMgr;
            cc.TableMgr.initTabel();
        }

    },

    update: function (dt) {

       if(cc.MsgMgr != null)
       {
             cc.MsgMgr.updateMsgMgr(dt);
       } 
      
    },

  
});
