//控制角色移动的
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
        cc.log("+++++++++updateMoveAi");
        var fDis = ONEGRIDPIX * this.m_pObj.m_iSpeed * dt;
        fDis = fDis.toFixed(2);
        var tempVec = cc.pForAngle(45);
        this.m_pObj.m_Pos.x = this.m_pObj.m_Pos.x + tempVec.x * fDis;
        this.m_pObj.m_Pos.y = this.m_pObj.m_Pos.x + tempVec.y * fDis;
    },





    
});

module.exports = {MoveAi};
