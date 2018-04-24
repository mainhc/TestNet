(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Client/TableMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ab7f6XzZjZB/Zs3N+ZJ95Vr', 'TableMgr', __filename);
// Script/Client/TableMgr.js

"use strict";

var tableMgr = cc.Class({

    properties: {
        m_akGameTabel: null
    },

    initTabel: function initTabel() {
        this.m_akGameTabel = {};
        var pSelf = this;
        cc.loader.loadResDir("table", function (err, objects, urls) {
            if (err) {
                cc.error(err);
                return;
            }

            for (var index = 0; index < objects.length; index++) {
                var table = objects[index];
                var tablename = urls[index];
                tablename = tablename.substr(tablename.lastIndexOf('/') + 1);
                pSelf.m_akGameTabel[tablename] = table;
            }
        });
    },
    getTabelConfigById: function getTabelConfigById(tabelname, idTable) {
        var pTempTable = this.m_akGameTabel[tabelname];
        if (pTempTable != null) {
            return pTempTable[idTable];
        }
        return null;
    }
});

module.exports = { tableMgr: tableMgr };

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
        //# sourceMappingURL=TableMgr.js.map
        