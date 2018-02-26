//角色方向
//    2
//    |—— 0
//    一格64像素  

var cMoveAi = require("MoveAi").MoveAi;

var ObjLogic = cc.Class({

     properties: {
         m_iObjId:0,
         m_Pos:cc.Vec2(0,0),
         m_GridOldIndex:0,
         m_Hp:0,
         m_MaxHp:0,
         m_Dir:6,
         m_iSpeed:0.3,
         m_pMoveAi:null,
         m_objState:0,
     },

     initLogicObj(objid,pos,charConfig)
     {
         this.m_iObjId = objid;
         this.m_Pos = pos;
         this.m_Hp = charConfig.currentHp;
         this.m_MaxHp =  charConfig.maxHp;
         this.m_pMoveAi = new cMoveAi;
         this.m_pMoveAi.initMoveAi(this);
         var tempint = parseInt(100*Math.random());
         var iDir = tempint%8;
         this.m_Dir = iDir;
     },

     getLogicPos()
     {
         return this.m_Pos;
     },

     getObjState()
     {
         return this.m_objState;
     },

     returnDir()
     {
         //this.m_Dir = (this.m_Dir + 4)%8;
         var tempint = parseInt(100*Math.random());
         this.m_Dir  = tempint%8;
     },

     updataLogicObj(dt)
     {
         if( this.m_pMoveAi != null)
         {
             this.m_pMoveAi.updateMoveAi(dt);
         }
         if(this.m_Pos.x <10 || this.m_Pos.x>=cc.GameObjMgr.getMapPixWidth()-10)
         {
             this.returnDir();
         }
         else if(this.m_Pos.y <10 || this.m_Pos.y>=cc.GameObjMgr.getMapPixHeight()-10)
         {
              this.returnDir();
         }
         var gridIndex = cc.GameObjMgr.pixToIndex(this.m_Pos);
         if(gridIndex != this.m_GridOldIndex)
         {
             cc.GameObjMgr.ObjChangeGrid(this.m_iObjId,this.m_GridOldIndex,gridIndex);
             this.m_GridOldIndex = gridIndex;
         }
     },     
   
});


module.exports = {ObjLogic};
