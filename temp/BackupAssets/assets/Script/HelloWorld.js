let protobuf = require("protobufjs");
var cClientNet = require("ClientNet").ClientNet;

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
        let builder = protobuf.newBuilder();
        protobuf.protoFromFile(cc.url.raw('resources/msgconfig/Player.proto'),builder);
        
        let PB = builder.build('grace.proto.msg');
        
        var  temp = new PB.Player();

    },

    start:function()
    {
        if(cc.Net != null)
        {
            
            //cc.Net.initNet("127.0.0.1","9897");
            cc.Net.initNet("192.168.216.81","10131");
            //cc.Net.initNet("192.168.112.100","10131");            
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
    },

    touchCloseNet:function()
    {
        cc.Net.CloseNet();
    },

    // called every frame
    update: function (dt) {

    },
});
