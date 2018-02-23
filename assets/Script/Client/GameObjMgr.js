var eObjType = require("ClientDef").eObjType;
var cObjView = require("ObjView").ObjView;
var cObjLogic = require("ObjLogic").ObjLogic;

//
const startPos = cc.p(300,300);

var GameObjMgr = cc.Class({
    properties: {
        m_pMap:null,
        m_akObjMap:null,
       
    },

    initGameObjMgr(map)
    {
        this.m_pMap = map;
        this.m_akObjMap = {};
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
                    pObjLogic.initLogicObj(startPos,pConfig);                    
                    pObjview.initObj(objId,prefab,pObjLogic);
                    var logicpos = pObjLogic.getLogicPos();
                    pObjview.setPosition(logicpos);
                    pSelf.m_akObjMap[objId] = pObjview;
                    pSelf.m_pMap.addChild(pObjview); 
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
