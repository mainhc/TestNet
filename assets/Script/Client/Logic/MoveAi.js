//控制角色移动的
var eObjState = require("ClientDef").eObjState;
const ONEGRIDPIX = 64;

var MoveAi = cc.Class({

    properties:{

        m_pObj:null,

    },

    initMoveAi(pObj)
    {
        this.m_pObj = pObj;
    },

    updateMoveAi(dt)
    {
        if(this.m_pObj.m_objState == eObjState.eObjWalk)
        {
            var fDis = ONEGRIDPIX * this.m_pObj.m_iSpeed * dt;
         
            fDis = fDis.toFixed(2);           
            //var fdirhudu = 45 * this.m_pObj.m_Dir/180 * Math.PI;
            var fdirhudu = this.m_pObj.m_fDir; 
           
            var tempVec = cc.pForAngle(fdirhudu);
            this.m_pObj.m_Pos.x = this.m_pObj.m_Pos.x + tempVec.x * fDis;
            this.m_pObj.m_Pos.y = this.m_pObj.m_Pos.y + tempVec.y * fDis;
            //this.m_pObj.m_objState = eObjState.eObjWalk;
        }
        
    },





    
});

module.exports = {MoveAi};
