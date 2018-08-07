var eObjType = require("ClientDef").eObjType;
var GridPix = require("ClientDef").GridPix;
var cObjView = require("ObjView").ObjView;
var cObjLogic = require("ObjLogic").ObjLogic;
var FunctionHelp = require("HelpFunction").FuncHelp;

//角色对象创建的初始位置
const startPos = cc.p(300,300);

var ObjGrid = cc.Class({
    properties:{
         m_Pos:cc.Vec2(0,0),
         m_objIndex:0,
         m_akObj:[],
    },
    addObjInGrid(idObj)
    {
        this.m_akObj.push(idObj);
    },
    deleObjInGrid(idObj)
    {
        for(var iloop=0;iloop<this.m_akObj.length;iloop++)
        {
            var idTempObj = this.m_akObj[iloop];        
            if(idTempObj == idObj)
            {
                 this.m_akObj.splice(iloop,1); 
            }
        }       
    },
});

var GameObjMgr = cc.Class({
    properties: {
        m_pGameWorld:null,
        m_pMap:null,
        m_akObjMap:null,
        m_akNetIdObjID:null,
        m_akObjIdNetID:null,
        m_kClientId:0,
        m_pMyObjView:null,
        m_akGrid:[],
        m_mapPixWidth:0,
        m_mapPixHeight:0,
        m_mapGridWidth:0,
        m_mapGridHeight:0,      
       
    },

    initGameObjMgr(gameWorld)
    {
        this.m_pGameWorld = gameWorld;
        this.m_pMap = gameWorld.m_pMap;
        this.m_akObjMap = {};
        this.m_akNetIdObjID = {};
        this.m_akObjIdNetID = {};
        this.m_akPath = {};
        this.initObjGrid();       
    },

    initObjGrid()
    {
        if(this.m_pMap == null)
        {
            return;
        }
        var pTitleMap = this.m_pMap.getComponent(cc.TiledMap);
        if(pTitleMap == null)
        {
            return;
        }
        var mapSize =  pTitleMap.getMapSize();
        this.m_mapGridWidth = mapSize.width;
        this.m_mapGridHeight = mapSize.height;
        this.m_mapPixWidth = this.m_mapGridWidth*GridPix;
        this.m_mapPixHeight = this.m_mapGridHeight*GridPix;
     
        for(var iLoop=0;iLoop<this.m_mapGridHeight;iLoop++)
        {
            for(var jLoop=0;jLoop<this.m_mapGridWidth;jLoop++)
            {
                var ptempGrid = new ObjGrid();
                ptempGrid.m_Pos = cc.p(jLoop,iLoop);
                ptempGrid.m_objIndex = iLoop * this.m_mapGridWidth + jLoop;
                this.m_akGrid.push(ptempGrid); 
            }
        } 
    },

    getMyObjView()
    {
        return this.m_pMyObjView;
    },

    getMyObjPos()
    {
        if(this.m_pMyObjView != null)
        {
            return this.m_pMyObjView.getPosition();
        }
        return cc.p(0,0);
    },

    setClientID:function(clientId)
    {
        this.m_kClientId = clientId;
    },

    getObjByObjID(objId)
    {
        return this.m_akObjMap[objId];
    },

    getObjNum()
    {
        return FunctionHelp.getObjectSize(this.m_akObjMap);
    },

    getMapPixWidth()
    {
        return this.m_mapPixWidth;
    },

    getMapPixHeight()
    {
        return this.m_mapPixHeight;
    },

    pixToGrid(pisPos)
    {
        var resPos = cc.p(0,0);
        if(pisPos.x < 0 || pisPos.x>this.m_mapPixWidth)
        {
            return resPos;
        }
        if(pisPos.y<0 || pisPos.y>this.m_mapPixHeight)
        {
            return resPos;
        }
        resPos.x = parseInt(pisPos.x/GridPix);
        resPos.y = parseInt(pisPos.y/GridPix);
        return resPos;
    },

    pixToIndex(pisPos)
    {
        var gridPos = this.pixToGrid(pisPos);
        var index = gridPos.y * this.m_mapGridWidth + gridPos.x;
        return index;
    },

    getGridByPos(gridPos)
    {
        var index = gridPos.y * this.m_mapGridWidth + gridPos.x;
        if(index<0 || index>this.m_akGrid.length)
        {
            return null;
        }
        return this.m_akGrid[index];
    },

    getGridByIndex(iIndex)
    {
        if(iIndex<0 || iIndex>this.m_akGrid.length)
        {
            return null;
        }
        return this.m_akGrid[iIndex];
    },

    ObjChangeGrid(objid,oldindex,nowindex)
    {
        var oldGrid = this.getGridByIndex(oldindex);
        var nowGrid = this.getGridByIndex(nowindex);
        oldGrid.deleObjInGrid(objid);
        nowGrid.addObjInGrid(objid);
    },

    computePath:function(pathKey,logicObj)
    {
        if(this.m_pGameWorld == null)
        {
            return;
        }
        var akPos = this.m_pGameWorld.getPathByKey(pathKey);
        if(akPos != null)
        {
            var iPosSize = akPos.length/2;
            var akPostemp = [];
            for(var iLoop=0;iLoop<iPosSize;iLoop++)
            {
                var posTemp = cc.p(akPos[iLoop*2],akPos[iLoop*2+1]);
                akPostemp.push(posTemp);
            }
            logicObj.setPathList(akPostemp);
        }
    },

    createGameObj(netID,objTableid,Pos,isSelf)
    {
        var pConfigdata = cc.TableMgr.getTabelConfigById("ObjData",objTableid);
        if(pConfigdata == null)
        {
            return;
        }
        var pConfig = cc.TableMgr.getTabelConfigById("ObjView",pConfigdata.objview);
        if(pConfig!= null)
        {
            var strChar = "char/" + pConfig.bodyview + '/' + pConfig.bodyview;
            var pSelf = this;
            cc.loader.loadRes(strChar,cc.Prefab,function (err, prefab)
            {
                if(err == null)
                {
                    var objId = cc.ObjIDMgr.getCanUseID();
                    var pObjview = new cObjView();
                    var pObjLogic = new cObjLogic();
                    var tempPos = Pos;
                    pObjLogic.initLogicObj(objId,tempPos,pConfigdata,isSelf);                                   
                    pObjview.initObj(objId,prefab,pObjLogic);
                                       
                    if(isSelf == true)
                    {
                       pSelf.m_pMyObjView =  pObjview;
                    }
                    else
                    {
                        pSelf.computePath(pConfigdata.pathId,pObjLogic);   
                    }
                    var logicpos = pObjLogic.getLogicPos();
                    pObjview.setPosition(logicpos);

                    pSelf.m_akObjMap[objId] = pObjview;
                    pSelf.m_akNetIdObjID[netID] = objId;
                    pSelf.m_akObjIdNetID[objId] = netID;

                    pSelf.m_pMap.addChild(pObjview);
                    var gridPos = pSelf.pixToGrid(startPos);
                    var gridtemp = pSelf.getGridByPos(gridPos); 
                    if(gridtemp != null)                    
                    {
                        gridtemp.addObjInGrid(objId);
                    }


                }
            });         
        }
    },

    playerObjTurn(objid,fTurn)
    {
        var pObj = this.getObjByObjID(objid);
        if(pObj != null)
        {
            pObj.toTurn(fTurn);
        }

    },

    playerobjState(objid,iState)
    {
         var pObj = this.getObjByObjID(objid);
        if(pObj != null)
        {
            pObj.setState(iState);
        }
    },

    updateGameObjMgr(dt)
    {
        for(var key in this.m_akObjMap)
        {
            var pObj = this.m_akObjMap[key];
            if(pObj != null)
            {
                pObj.updateObjView(dt);
            }
        }       

    },  
});


module.exports = {GameObjMgr};
