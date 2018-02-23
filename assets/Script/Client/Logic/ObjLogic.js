//角色方向
//    0
//    |—— 2
//    一格64像素  
var cMoveAi = require("MoveAi").MoveAi;

var ObjLogic = cc.Class({

     properties: {
         m_Pos:cc.Vec2(0,0),
         m_Hp:0,
         m_MaxHp:0,
         m_Dir:4,
         m_iSpeed:1,
         m_pMoveAi:null,
     },

     initLogicObj(pos,charConfig)
     {
         this.m_Pos = pos;
         this.m_Hp = charConfig.currentHp;
         this.m_MaxHp =  charConfig.maxHp;
         this.m_pMoveAi = new cMoveAi;
         this.m_pMoveAi.initMoveAi(this);
     },

     getLogicPos()
     {
         return this.m_Pos;
     },

     
   
});


module.exports = {ObjLogic};
