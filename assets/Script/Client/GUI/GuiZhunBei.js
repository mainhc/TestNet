

cc.Class({
    extends: cc.Component,

    properties: {
        m_pPlayerID:cc.Label,
        m_pPlayerNum:cc.Label,
        m_pBeginTime:cc.Label,
        m_pMainLayout:null,      
    },


    start () {
        let myPlayerID =  cc.PlayerInfo.getMyPlayerID();
       // var plabel = this.m_pPlayerID.getComponent(cc.Label);
        this.m_pPlayerID.string = myPlayerID;
        this.m_pMainLayout = this.node.getChildByName("layout");
        cc.ClientGuiCmd.registerClientGuiMsg("updataZhunBei",this.onUpdataZhunBeiData,this);
        var pStartBtn = this.m_pMainLayout.getChildByName("gameStart");
        if(pStartBtn != null)
        {
            pStartBtn.on('click',this.onZhunBeiStart,this);
        }
    },

    OnDestroy(){
        cc.ClientGuiCmd.unregisterClientGuiMsg("updataZhunBei");
    },

    onUpdataZhunBeiData(msgdata,pSelf){

        cc.log("+++++++onUpdataZhunBeiData");
        if(pSelf == null){
            return;
        }
        if(msgdata.length == 2){
             var iNum = msgdata[0];
             var strTemp = "人数：" + iNum;
             pSelf.m_pPlayerNum.string = strTemp;
             var iTime = msgdata[1];
             strTemp = "倒计时：" + iTime;
             pSelf.m_pBeginTime.string = strTemp;
        }
    },

    onZhunBeiStart(event){
         cc.director.loadScene("gameworld");
    },

   
});
