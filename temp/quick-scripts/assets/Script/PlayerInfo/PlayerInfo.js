(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/PlayerInfo/PlayerInfo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ec00cOSzJdHipeMf6/S+uUO', 'PlayerInfo', __filename);
// Script/PlayerInfo/PlayerInfo.js

"use strict";

var PlayerInfo = cc.Class({
    properties: {
        PlayerId: null
    },

    setPlayerId: function setPlayerId(playerID) {
        this.PlayerId = playerID;
    },

    getMyPlayerID: function getMyPlayerID() {
        return this.PlayerId;
    }
});

module.exports = { PlayerInfo: PlayerInfo };

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
        //# sourceMappingURL=PlayerInfo.js.map
        