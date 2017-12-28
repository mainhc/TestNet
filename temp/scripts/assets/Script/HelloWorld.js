"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script/HelloWorld.js

"use strict";

var protobuf = require("protobufjs");
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
    onLoad: function onLoad() {
        this.label.string = this.text;
        if (cc.Net == null) {
            cc.Net = new cClientNet();
        }
        var builder = protobuf.newBuilder();
        protobuf.protoFromFile(cc.url.raw('resources/msgconfig/Player.proto'), builder);

        var PB = builder.build('grace.proto.msg');

        var temp = new PB.Player();
    },

    start: function start() {
        if (cc.Net != null) {

            //cc.Net.initNet("127.0.0.1","9897");
            cc.Net.initNet("192.168.216.81", "10131");
            //cc.Net.initNet("192.168.112.100","10131");            
        }
        var pCloseNetButton = this.node.getChildByName("button");
        if (pCloseNetButton != null) {
            pCloseNetButton.on(cc.Node.EventType.TOUCH_START, this.touchCloseNet, this);
        }
    },

    onDestroy: function onDestroy() {
        cc.log("+++++++++++++++++++onDestroy");
    },

    touchCloseNet: function touchCloseNet() {
        cc.Net.CloseNet();
    },

    // called every frame
    update: function update(dt) {}
});

cc._RF.pop();