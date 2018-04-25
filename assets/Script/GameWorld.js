

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
        
         var pMSg = cc.MsgMgr.CreateMsgByID(200001);
         pMSg.myClientID = cc.PlayerInfo.getMyPlayerID();
         cc.MsgMgr.sendMsgToServer(200001,pMSg);
 
    },

    start:function()
    {
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
    },  

    onTouchBegan:function(event)
    {     
        //var touchPos = this.m_pMap.convertToNodeSpaceAR(event.getLocation());
       // this.m_startPos = touchPos;
        //cc.log("onTouchBegan" + "  "+touchPos.x+ "  "+touchPos.y);      

    },

    onTouchMoved:function(event)
    {
       
        var touchPos = this.m_pMap.convertToNodeSpaceAR(event.getLocation());
   
        // var touchStartPos = this.m_startPos;
        // var movePos = cc.pSub(touchPos,touchStartPos);
        // var pBeginPos = this.m_pMap.getPosition();
        // var pDesPos = cc.pAdd(pBeginPos,movePos);
       // this.m_pMap.setPosition(pDesPos);
        //cc.log("onTouchMoved" + "  "+touchPos.x+ "  "+touchPos.y);       

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
            var myPos = cc.GameObjMgr.getMyObjPos();
            if(myPos.x !=0 && myPos.y != 0)
            {
                 var winsize = cc.director.getWinSize();
                // cc.log("myPos ++  " + myPos.x +"  " + myPos.y);
                 this.m_pMap.setPosition(-myPos.x,-myPos.y);
            }
            //显示场上单位数
            var pObjNum = this.node.getChildByName("ObjNum");
            var pObjLabel = pObjNum.getComponent(cc.Label);
            var iNum = cc.GameObjMgr.getObjNum();
            pObjLabel.string = iNum;  

            cc.GameObjMgr.updateGameObjMgr(dt);          
        }     
        
    },   

});
