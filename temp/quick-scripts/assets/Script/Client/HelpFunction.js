(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Client/HelpFunction.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a2cc1Dw1sZDHYvGJzkJ4e2e', 'HelpFunction', __filename);
// Script/Client/HelpFunction.js

"use strict";

var FuncHelp = {
    getObjectSize: function getObjectSize(tempObj) {
        var iCount = 0;
        var proNameA = Object.getOwnPropertyNames(tempObj);
        iCount = proNameA.length;
        return iCount;
    },

    getObjectByIndex: function getObjectByIndex(tempObj, index) {
        var proNameA = Object.getOwnPropertyNames(tempObj);
        var iProNameSize = proNameA.length;
        var resTemp = null;
        if (index < 0 || index >= iProNameSize) {
            return resTemp;
        }
        var proName = proNameA[index];
        resTemp = tempObj[proName];
        return resTemp;
    }

};

module.exports = { FuncHelp: FuncHelp };

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
        //# sourceMappingURL=HelpFunction.js.map
        