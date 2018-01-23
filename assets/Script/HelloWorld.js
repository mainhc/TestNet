
var cClientNet = require("ClientNet").ClientNet;
var cMsgMgr = require("MsgMgr").MsgMgr;
var cGameInit = require("GameInit").GameInit;

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;        
        if(cc.Net == null)
        {
            cc.Net = new cClientNet;           
        }
        if(cc.MsgMgr == null)
        {
            cc.MsgMgr = new cMsgMgr;
        }
        if(cc.GameInit == null)
        {
            cc.GameInit = new cGameInit;
        }       

    },

    start:function()
    {
        if(cc.Net != null)
        {
            
            //cc.Net.initNet("127.0.0.1","9897");
            cc.Net.initNet("192.168.214.64","10131");
            //cc.Net.initNet("192.168.112.100","10131"); 
            cc.MsgMgr.init();           
        }
        var pCloseNetButton = this.node.getChildByName("button");
        if(pCloseNetButton != null)
        {
            pCloseNetButton.on(cc.Node.EventType.TOUCH_START, this.touchCloseNet,this);
        }
    },

    onDestroy:function()
    {
        cc.log("+++++++++++++++++++onDestroy");
        cc.Net = null;
        cc.MsgMgr = null;
        cc.GameInit = null;
    },

    touchCloseNet:function()
    {
        var pMSg = cc.MsgMgr.CreateMsgByID(10001);
        pMSg.id = 1000003;
        pMSg.name = "hahahaer";
        pMSg.enterTime = 222222;
        cc.MsgMgr.sendMsgToServer(pMSg);
       // cc.Net.CloseNet();
    },

    // called every frame
    update: function (dt) {

    },
});
