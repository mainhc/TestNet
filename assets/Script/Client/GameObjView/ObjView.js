const ObjLogic = require("ObjLogic").ObjLogic;

var ObjView = cc.Class({
    extends: cc.Node,

    properties: {
       m_iObjId:0, 
       m_objlogic:ObjLogic,
       //m_ObjView:null,
      
    },

    //  __ctor__: function(iId) 
    //  {
    //     this.m_iObjId = iId;
    //  },


    initObj(iobjId,model,objlogic){

        this.m_iObjId = iobjId;
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

    updateObjView(dt)
    {
        if(this.m_objlogic != null)
        {
            this.m_objlogic.updataLogicObj(dt);
            var pOpt = this.m_objlogic.getLogicPos();
            this.setPosition(pOpt);
        }
       


    },
});

module.exports = {ObjView};
