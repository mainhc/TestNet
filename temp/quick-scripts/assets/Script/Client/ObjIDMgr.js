(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Client/ObjIDMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '925ccCsk4lEYKdAGWU66jB4', 'ObjIDMgr', __filename);
// Script/Client/ObjIDMgr.js

"use strict";

var ObjIDMgr = cc.Class({

    properties: {
        m_akNoUseID: [],
        m_iLastID: 10000
    },

    getCanUseID: function getCanUseID() {
        var iSize = this.m_akNoUseID.length;
        if (iSize > 0) {
            var resID = this.m_akNoUseID.pop();
            return resID;
        }
        this.m_iLastID += 1;
        return this.m_iLastID;
    }
});

module.exports = { ObjIDMgr: ObjIDMgr };

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
        //# sourceMappingURL=ObjIDMgr.js.map
        