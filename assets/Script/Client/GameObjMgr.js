var eObjType = require("ClientDef").eObjType;
var GridPix = require("ClientDef").GridPix;
var cObjView = require("ObjView").ObjView;
var cObjLogic = require("ObjLogic").ObjLogic;

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
        m_pMap:null,
        m_akObjMap:null,
        m_akGrid:[],
        m_mapPixWidth:0,
        m_mapPixHeight:0,
        m_mapGridWidth:0,
        m_mapGridHeight:0,
       
    },

    initGameObjMgr(map)
    {
        this.m_pMap = map;
        this.m_akObjMap = {};
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
        this.m_mapPixWidth = mapSize.width;
        this.m_mapPixHeight = mapSize.height;
        this.m_mapGridWidth = this.m_mapPixWidth/GridPix;
        this.m_mapGridHeight = this.m_mapPixHeight/GridPix;
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
        var GridPos = this.pixToGrid(pisPos);
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

    createGameObj(objid)
    {
        var pConfig = cc.TableMgr.getTabelConfigById("ObjView",objid);
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
                    pObjLogic.initLogicObj(objId,startPos,pConfig);                    
                    pObjview.initObj(objId,prefab,pObjLogic);
                    var logicpos = pObjLogic.getLogicPos();
                    pObjview.setPosition(logicpos);
                    pSelf.m_akObjMap[objId] = pObjview;
                    pSelf.m_pMap.addChild(pObjview);
                    var gridPos = this.pixToGrid(startPos);
                    var gridtemp = this.getGridByPos(gridPos); 
                    if(gridtemp != null)                    
                    {
                        gridtemp.addObjInGrid(objId);
                    }
                }
            });         
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
