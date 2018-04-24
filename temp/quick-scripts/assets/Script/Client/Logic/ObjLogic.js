(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Client/Logic/ObjLogic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1cdc2sME/pOW51yxK3nxr+a', 'ObjLogic', __filename);
// Script/Client/Logic/ObjLogic.js

"use strict";

//角色方向
//    2
//    |—— 0
//    一格64像素  

var cMoveAi = require("MoveAi").MoveAi;

var ObjLogic = cc.Class({

    properties: {
        m_iObjId: 0,
        m_Pos: cc.Vec2(0, 0),
        m_GridOldIndex: 0,
        m_Hp: 0,
        m_MaxHp: 0,
        m_Dir: 0, //8方向
        m_fDir: 0, //具体真实的弧度 
        m_iSpeed: 3,
        m_pMoveAi: null,
        m_objState: 0
    },

    initLogicObj: function initLogicObj(objid, pos, charConfig, isSelf) {
        this.m_iObjId = objid;
        this.m_Pos = pos;
        this.m_Hp = charConfig.currentHp;
        this.m_MaxHp = charConfig.maxHp;
        // if(isSelf != true)
        {
            this.m_pMoveAi = new cMoveAi();
            this.m_pMoveAi.initMoveAi(this);
        }
        var tempint = parseInt(100 * Math.random());
        var iDir = tempint % 8;
        this.m_Dir = iDir;
        var fdirhudu = 45 * iDir / 180 * Math.PI;
        this.m_fDir = fdirhudu;
    },
    getLogicPos: function getLogicPos() {
        return this.m_Pos;
    },
    getObjState: function getObjState() {
        return this.m_objState;
    },
    returnDir: function returnDir() {
        //this.m_Dir = (this.m_Dir + 4)%8;
        var tempint = parseInt(100 * Math.random());
        this.m_Dir = tempint % 8;
        var fdirhudu = 45 * this.m_Dir / 180 * Math.PI;
        this.m_fDir = fdirhudu;
    },
    huduToDir: function huduToDir(fdir) {
        var jiaodu = fdir / Math.PI * 180;
        if (jiaodu >= -22.5 && jiaodu < 22.5) {
            return 0;
        } else if (jiaodu >= 22.5 && jiaodu < 22.5 * 3) {
            return 1;
        } else if (jiaodu >= 22.5 * 3 && jiaodu < 22.5 * 5) {
            return 2;
        } else if (jiaodu >= 22.5 * 5 && jiaodu < 22.5 * 7) {
            return 3;
        } else if (jiaodu >= 22.5 * 7 && jiaodu < 22.5 * 8) {
            return 4;
        } else if (jiaodu >= -22.5 * 8 && jiaodu < -22.5 * 7) {
            return 4;
        } else if (jiaodu >= -22.5 * 7 && jiaodu < -22.5 * 5) {
            return 5;
        } else if (jiaodu >= -22.5 * 5 && jiaodu < -22.5 * 3) {
            return 6;
        } else if (jiaodu >= -22.5 * 3 && jiaodu < -22.5) {
            return 7;
        } else {
            return 0;
        }
    },
    updateTurnDir: function updateTurnDir(fdir) {
        this.m_fDir = fdir;
        this.m_Dir = this.huduToDir(fdir);
    },
    updateState: function updateState(iState) {
        this.m_objState = iState;
    },
    updataLogicObj: function updataLogicObj(dt) {
        if (this.m_pMoveAi != null) {
            this.m_pMoveAi.updateMoveAi(dt);
        }
        if (this.m_Pos.x < 10 || this.m_Pos.x >= cc.GameObjMgr.getMapPixWidth() - 10) {
            this.returnDir();
        } else if (this.m_Pos.y < 10 || this.m_Pos.y >= cc.GameObjMgr.getMapPixHeight() - 10) {
            this.returnDir();
        }
        var gridIndex = cc.GameObjMgr.pixToIndex(this.m_Pos);
        if (gridIndex != this.m_GridOldIndex) {
            cc.GameObjMgr.ObjChangeGrid(this.m_iObjId, this.m_GridOldIndex, gridIndex);
            this.m_GridOldIndex = gridIndex;
        }
    }
});

module.exports = { ObjLogic: ObjLogic };

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ObjLogic.js.map
        