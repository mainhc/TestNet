const ObjLogic = require("ObjLogic").ObjLogic;

var ObjView = cc.Class({
    extends: cc.Node,

    properties: {
       m_objlogic:ObjLogic,
      
    },

    initObj(model,objlogic){

        this.m_objlogic = objlogic;
        var viewObj = cc.instantiate(model);
        viewObj.name = "ObjBody";
        this.addChild(viewObj);
        var pAni = viewObj.getComponent(cc.Animation);
        if(pAni != null)
        {
            pAni.play("stand_c");

        } 
    },
});

module.exports = {ObjView};
