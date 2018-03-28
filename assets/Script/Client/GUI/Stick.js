var eObjState = require("ClientDef").eObjState;
cc.Class({
    extends: cc.Component,

    properties: {
        m_pMyBojView:null,
        stickBGR:0,   
        stickBGPosition:cc.Vec2(0,0),
        m_pArrow:null,
        pStickCenter:null,
        m_fAngle:0,    
        m_fOldAngle:0,
    },

    start () {
        var pStickBg = this.node;
        this.m_pArrow = pStickBg.getChildByName("StickArrow");
        this.m_pArrow.active = false;
        this.pStickCenter = pStickBg.getChildByName("StickCenter");
        this.stickBGR = pStickBg.width * 0.5;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved,this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelled,this);
        this.stickBGPosition = cc.p(0,0);
        this.m_pMyBojView = cc.GameObjMgr.getMyObjView();
    },
    getAnglePosition:function(r,angle)
    {
        return cc.p(r * Math.cos(angle),r * Math.sin(angle));
    },
    onTouchBegan:function(event)
    {      
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        // 得到摇杆与触屏点所形成的角度
        var pvecDes = cc.pSub(touchPos,this.stickBGPosition);       
        var angle = cc.pToAngle(pvecDes);
        var dist = (this.stickBGPosition.x - touchPos.x) * (this.stickBGPosition.x - touchPos.x) +
                    (this.stickBGPosition.y - touchPos.y) * (this.stickBGPosition.y - touchPos.y);
            
        var rad = this.stickBGR * this.stickBGR;
        if(dist >= rad)
        {
            this.pStickCenter.setPosition(cc.pAdd(this.getAnglePosition(this.stickBGR,angle),this.stickBGPosition));
        }else
        {
            this.pStickCenter.setPosition(touchPos);
        }
        this.m_fAngle = angle;
        this.m_pArrow.active = true;
        cc.log("this.m_fAngle begin+++   " + this.m_fAngle)
        this.updateArrow();
    },

    onTouchMoved:function(event)
    {         
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());       
         var pvecDes = cc.pSub(touchPos,this.stickBGPosition);
        var angle = cc.pToAngle(pvecDes);
        var dist = (this.stickBGPosition.x - touchPos.x) * (this.stickBGPosition.x - touchPos.x) +
                   (this.stickBGPosition.y - touchPos.y) * (this.stickBGPosition.y - touchPos.y);
            
        var rad = this.stickBGR * this.stickBGR;
        if(dist >= rad)
        {
            this.pStickCenter.setPosition(cc.pAdd(this.getAnglePosition(this.stickBGR,angle),this.stickBGPosition));

        }else
        {
            this.pStickCenter.setPosition(touchPos);
        }

        this.m_fAngle = angle;
        cc.log("this.m_fAngle move+++   " + this.m_fAngle);
        this.updateArrow();
        if(this.m_pMyBojView != null)
        {
            var eState = this.m_pMyBojView.m_objlogic.m_objState;
            if(eState != eObjState.eObjWalk)
            {
                var pMSg = cc.MsgMgr.CreateMsgByID(10004);
                pMSg.objLogicID = this.m_pMyBojView.m_iObjId;
                pMSg.ObjState = eObjState.eObjWalk;       
                cc.MsgMgr.sendMsgToServer(10004,pMSg);
            }           
        }        

    },

    onTouchEnded:function(event)
    {
       
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());       
        this.pStickCenter.stopAllActions();
        this.pStickCenter.runAction(cc.moveTo(0.08, this.stickBGPosition));
        //this.m_fAngle = 0.0;
        this.m_pArrow.active = false;      

         var pMSg = cc.MsgMgr.CreateMsgByID(10004);
         pMSg.objLogicID = this.m_pMyBojView.m_iObjId;
         pMSg.ObjState = eObjState.eObjStand;       
         cc.MsgMgr.sendMsgToServer(10004,pMSg);

    },

    onTouchCancelled:function(event)
    {
        //cc.log("++++++++++++onTouchCancelled+++++++++");
        this.onTouchEnded(event);
    },

    updateArrow:function()
    {
        if(this.m_pArrow)
        {
            this.m_pArrow.setPosition(cc.pAdd(this.getAnglePosition(this.stickBGR,this.m_fAngle),this.stickBGPosition));
            this.m_pArrow.rotation = (-this.m_fAngle / Math.PI * 180);
        }
    },

    update (dt) {
        if(this.m_pMyBojView == null)
        {
            this.m_pMyBojView = cc.GameObjMgr.getMyObjView();
        }
        if(this.m_pMyBojView == null)
        {
            return;
        }
        var nowAngle = this.m_fAngle.toFixed(2);
        if(this.m_fOldAngle != nowAngle)
        {
            this.m_fOldAngle = nowAngle;            
            var pMSg = cc.MsgMgr.CreateMsgByID(10003);
            pMSg.objLogicID = this.m_pMyBojView.m_iObjId;
            pMSg.fDir = this.m_fOldAngle;       
            cc.MsgMgr.sendMsgToServer(10003,pMSg);
        }      
    },
});
