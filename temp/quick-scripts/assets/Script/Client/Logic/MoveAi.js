(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Client/Logic/MoveAi.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bf48aEfBiNBFqA7z+LqwdDS', 'MoveAi', __filename);
// Script/Client/Logic/MoveAi.js

"use strict";

//控制角色移动的
var eObjState = require("ClientDef").eObjState;
var ONEGRIDPIX = 64;

var MoveAi = cc.Class({

    properties: {

        m_pObj: null

    },

    initMoveAi: function initMoveAi(pObj) {
        this.m_pObj = pObj;
    },
    updateMoveAi: function updateMoveAi(dt) {
        if (this.m_pObj.m_objState == eObjState.eObjWalk) {
            var fDis = ONEGRIDPIX * this.m_pObj.m_iSpeed * dt;
            fDis = fDis.toFixed(2);
            //var fdirhudu = 45 * this.m_pObj.m_Dir/180 * Math.PI;
            var fdirhudu = this.m_pObj.m_fDir;

            cc.log("updateMoveAi fdirhudu" + fdirhudu);
            var tempVec = cc.pForAngle(fdirhudu);
            this.m_pObj.m_Pos.x = this.m_pObj.m_Pos.x + tempVec.x * fDis;
            this.m_pObj.m_Pos.y = this.m_pObj.m_Pos.y + tempVec.y * fDis;
            //this.m_pObj.m_objState = eObjState.eObjWalk;
        }
    }
});

module.exports = { MoveAi: MoveAi };

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
        //# sourceMappingURL=MoveAi.js.map
        