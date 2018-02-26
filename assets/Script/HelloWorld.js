
var cClientNet = require("ClientNet").ClientNet;
var cMsgMgr = require("MsgMgr").MsgMgr;
var cGameInit = require("GameInit").GameInit;
var cTableMgr = require("TableMgr").tableMgr;
var cGameObjMgr = require("GameObjMgr").GameObjMgr;
var cObjIDMgr = require("ObjIDMgr").ObjIDMgr;



cc.Class({
    extends: cc.Component,

    properties: {
  
        // defaults, set visually when attaching this script to the Canvas
        m_pMap:null,
        m_startPos:null,         
    },

    // use this for initialization
    onLoad: function () {       
        cc.game.setFrameRate(30);

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
        if(cc.TableMgr == null)
        {
            cc.TableMgr = new cTableMgr;
            cc.TableMgr.initTabel();
        }
       
        this.m_pMap = this.node.getChildByName("Map");  
        if(cc.GameObjMgr == null)
        {
            cc.GameObjMgr = new cGameObjMgr;
            cc.GameObjMgr.initGameObjMgr(this.m_pMap);
        }

        if(cc.ObjIDMgr == null)
        {
            cc.ObjIDMgr = new cObjIDMgr;
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

      

        this.initMapPos();
        this.m_pMap.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan,this);
        this.m_pMap.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved,this);
        this.m_pMap.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded,this);
        this.m_pMap.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelled,this);


    
    },

    onDestroy:function()
    {
        cc.log("+++++++++++++++++++onDestroy");
        cc.Net = null;
        cc.MsgMgr = null;
        cc.GameInit = null;
        cc.TableMgr = null;
        cc.GameObjMgr = null;
        cc.ObjIDMgr = null;

    },



    initMapPos()
    {
        var winsize = cc.director.getWinSize();
        this.m_pMap.setPosition(-winsize.width/2,-winsize.height/2);

        // this.schedule(function() {

        //     this.doSomething();
        // }, 0.1);

        // 以秒为单位的时间间隔
        var interval = 0.1;
        // 重复次数
        var repeat = 300;
        // 开始延时
        var delay = 1;
        this.schedule(function() {
            // 这里的 this 指向 component
            this.doSomething();
        }, interval, repeat, delay);

    },

    doSomething()
    {
         cc.GameObjMgr.createGameObj(10001); 
    },

    onTouchBegan:function(event)
    {     
        var touchPos = this.m_pMap.convertToNodeSpaceAR(event.getLocation());
        this.m_startPos = touchPos;
        cc.log("onTouchBegan" + "  "+touchPos.x+ "  "+touchPos.y);      

    },

    onTouchMoved:function(event)
    {
       
        var touchPos = this.m_pMap.convertToNodeSpaceAR(event.getLocation());
        //var touchPos = event.getLocation();
       // var touch = event.currentTouch;
        var touchStartPos = this.m_startPos;
        var movePos = cc.pSub(touchPos,touchStartPos);
        var pBeginPos = this.m_pMap.getPosition();
        var pDesPos = cc.pAdd(pBeginPos,movePos);
        this.m_pMap.setPosition(pDesPos);
        cc.log("onTouchMoved" + "  "+touchPos.x+ "  "+touchPos.y);       

    },

    onTouchEnded:function(event)
    {
       

    },

    onTouchCancelled:function(event)
    {
        cc.log("++++++++++++onTouchCancelled+++++++++");
        this.onTouchEnded(event);
    },

    touchCloseNet:function()
    {
        // var pMSg = cc.MsgMgr.CreateMsgByID(10001);
        // pMSg.id = 1000003;
        // pMSg.name = "hahahaer";
        // pMSg.enterTime = 222222;
        // cc.MsgMgr.sendMsgToServer(10001,pMSg);
       // cc.Net.CloseNet();
      
    },

    // called every frame
    update: function (dt) {
        if(cc.GameObjMgr != null)
        {
            cc.GameObjMgr.updateGameObjMgr(dt);
            var pObjNum = this.node.getChildByName("ObjNum");
            var pObjLabel = pObjNum.getComponent(cc.Label);
            var iNum = cc.GameObjMgr.getObjNum();
            pObjLabel.string = iNum;
            // if(iNum >=300)
            // {
            //     this.unschedule();
            // }

        }     
        
    },   

});
