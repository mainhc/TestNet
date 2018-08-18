//角色方向
//    2
//    |—— 0
//    一格64像素  
var eObjState = require("ClientDef").eObjState;

var UPDATEPATHTIME = 1.0;
var DISPIX =6.0;

var cObjAi = require("AiObj").AiObj;

var ObjLogic = cc.Class({

     properties: {
         m_iObjId:0,
         m_Pos:cc.Vec2(0,0),
         m_NextPos:cc.Vec2(0,0),
         m_GridOldIndex:0,
         m_Hp:0,
         m_MaxHp:0,
         m_Dir:0, //8方向
         m_fDir:0,//具体真实的弧度 
         m_iSpeed:1,//每秒移动3格
         m_pObjAi:null,
         m_objState:0,
         m_iType:0,
         m_pathPos:[],
         m_iCurtPathIndex:0,
         m_pathUpdateTime:1,
         
     },

     initLogicObj(objid,pos,charConfig,isSelf)
     {
         this.m_iObjId = objid;
         if(pos.x==0 && pos.y==0)
         {
            // var pathKey = charConfig.pathId;
         }
         else
         {
             this.m_Pos = pos;
         }        
         this.m_Hp = charConfig.currentHp;
         this.m_MaxHp =  charConfig.maxHp;
         this.m_iType = charConfig.objtype;
         this.m_pathKey = charConfig.pathId;
        // if(isSelf != true)
         {
            this.m_pObjAi = new cObjAi;
            this.m_pObjAi.initObjAi(this);
         }        
         var tempint = parseInt(100*Math.random());
         var iDir = tempint%8;
         this.m_Dir = iDir;
         var fdirhudu = 45 * iDir/180 * Math.PI;         
         this.m_fDir = fdirhudu;
     },

     setPathList:function(akPos)
     {
         this.m_pathPos = akPos;
         for(var iloop=0; iloop<this.m_pathPos.length;iloop++)
         {
             var tempPos = this.m_pathPos[iloop];
             cc.log("+++setPathList+++ " + tempPos.x + "  "+tempPos.y);
         }
         this.m_Pos = this.m_pathPos[0];
         this.m_NextPos = this.m_Pos;
         this.m_iCurtPathIndex = 0;
     },

     IsHaveAiPath()
     {
         return (this.m_pathPos.length>0);
     },

     getLogicPos()
     {
         return this.m_Pos;
     },

     getObjState()
     {
         return this.m_objState;
     },

     IsToNextPos()
     {
         let bRes = false;
         var nextPos = this.m_NextPos;
         var curtPos = this.m_Pos;
         var dist = (nextPos.x - curtPos.x) * (nextPos.x - curtPos.x) +
                    (nextPos.y - curtPos.y) * (nextPos.y - curtPos.y);
       
         if(dist<=DISPIX)
         {
             return true;
         }
         return false;
     },

     returnDir()
     {
         //this.m_Dir = (this.m_Dir + 4)%8;
         var tempint = parseInt(100*Math.random());
         this.m_Dir  = tempint%8;
         var fdirhudu = 45 * this.m_Dir/180 * Math.PI;         
         this.m_fDir = fdirhudu;

     },

     computeTurnDir()
     {
         let iPathSize = this.m_pathPos.length;
         if(iPathSize<= 0)
         {
             return;
         }
         if(this.m_iCurtPathIndex >=iPathSize-1)
         {
             this.updateState(eObjState.eObjStand);
             return;
         }
         cc.log("+++computeTurnDir+++  " + iPathSize + " "+ this.m_iCurtPathIndex);
         this.m_iCurtPathIndex++;
         let nextPos = this.m_pathPos[this.m_iCurtPathIndex];
         this.m_NextPos = nextPos;
         if(this.IsToNextPos())
         {
            this.updateState(eObjState.eObjStand);
         }
         else
         {
             let curtPos = this.m_Pos;
             var pvecDes = cc.pSub(nextPos,curtPos);
             var angle = cc.pToAngle(pvecDes);
             cc.log(" ++++computeTurnDir++++ " + angle +" "+curtPos.x+" "+curtPos.y+" "+nextPos.x+" "+nextPos.y);
             this.updateTurnDir(angle);
             this.updateState(eObjState.eObjWalk);

         }
         

     },

     huduToDir(fdir)
     {
         var jiaodu = fdir/Math.PI * 180;
         if(jiaodu>=-22.5 && jiaodu<22.5)
         {
             return 0;
         }
         else if(jiaodu>=22.5 && jiaodu<22.5*3)
         {
             return 1;
         }
         else if(jiaodu>=22.5*3 && jiaodu<22.5*5)
         {
             return 2;
         }
         else if(jiaodu>=22.5*5 && jiaodu<22.5*7)
         {
             return 3;
         }
         else if(jiaodu>=22.5*7 && jiaodu<22.5*8)
         {
             return 4;
         }
         else if(jiaodu>=-22.5*8 && jiaodu<-22.5*7)
         {
             return 4;
         }
         else if(jiaodu>=-22.5*7 && jiaodu<-22.5*5)
         {
             return 5;
         }
         else if(jiaodu>=-22.5*5 && jiaodu<-22.5*3)
         {
             return 6;
         }
        else if(jiaodu>=-22.5*3 && jiaodu<-22.5)
         {
             return 7;
         }
         else
         {
             return 0;
         }
     },

     updateTurnDir(fdir)
     {
         this.m_fDir = fdir;
         this.m_Dir =  this.huduToDir(fdir);
     },

     updateState(iState)
     {
         this.m_objState = iState;
     },

     updataAiPath(dt)
     {
        //  if(this.m_pathUpdateTime>= UPDATEPATHTIME)
        //  {
        //      this.m_pathUpdateTime = 0;
        //      this.computeTurnDir();
        //  }
        //  this.m_pathUpdateTime += dt;

         if(this.IsToNextPos())
         {
              this.computeTurnDir();
         }

     },

     updataLogicObj(dt)
     {
         if( this.m_pObjAi != null)
         {
             this.m_pObjAi.updateObjAi(dt);
         }
         if(this.IsHaveAiPath())
         {
            //Ai自己路径行走
            this.updataAiPath(dt);
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
