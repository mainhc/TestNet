//控制角色移动的
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

    },





    
});

module.exports = {MoveAi};
