const ObjLogic = require("ObjLogic").ObjLogic;
var eObjState = require("ClientDef").eObjState;

var ObjView = cc.Class({
    extends: cc.Node,

    properties: {
       m_iObjId:0, 
       m_objlogic:ObjLogic,
       m_pAni:null,
      
    },

    initObj(iobjId,model,objlogic){

        this.m_iObjId = iobjId;
        this.m_objlogic = objlogic;
        var viewObj = cc.instantiate(model);
        viewObj.name = "ObjBody";
        this.addChild(viewObj);
        var pAni = viewObj.getComponent(cc.Animation);
        if(pAni != null)
        {
            pAni.play("stand_c");
            this.m_pAni = pAni;

        } 
    },

    getObjActionName(eState,iDir)
    {
        var strAction = "";
        switch(eState)
        {
            case eObjState.eObjWalk:
            {
                strAction = "walk_";
                break;
            }
            default:
            {
                break;
            }
        }
        if(iDir ==0 || iDir==4)
        {
            strAction += "b";
        }
        else if(iDir==1 || iDir==2 || iDir==3)
        {
            strAction += "a";
        }
        else
        {
            strAction += "c";
        }
        return strAction;
    },

    updateObjView(dt)
    {
        if(this.m_objlogic != null)
        {
            this.m_objlogic.updataLogicObj(dt);
            var pOpt = this.m_objlogic.getLogicPos();
            this.setPosition(pOpt);
        }
        this.updateAction();
    },



    updateAction()
    {
        var eState = this.m_objlogic.getObjState();
        var strActionName = this.getObjActionName(eState,this.m_objlogic.m_Dir);        
        var anistatetemp = this.m_pAni.getAnimationState(strActionName); 
        if(anistatetemp==null)
        {
            this.m_pAni.play(strActionName);
        }
        else
        {
            if(!anistatetemp.isPlaying)
            {
                this.m_pAni.play(strActionName);
            }
        }

    },
});

module.exports = {ObjView};
