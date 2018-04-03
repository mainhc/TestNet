

cc.Class({
    extends: cc.Component,

    properties: {
        m_pPlayerID:cc.Label,
      
    },


    start () {
        let myPlayerID =  cc.PlayerInfo.getMyPlayerID();
       // var plabel = this.m_pPlayerID.getComponent(cc.Label);
        this.m_pPlayerID.string = myPlayerID;

        cc.ClientGuiCmd.registerClientGuiMsg("updataZhunBei",this.onUpdataZhunBeiData)
    },


    onUpdataZhunBeiData(msgdata){

    }

   
});
