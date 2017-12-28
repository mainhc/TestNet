var ClientNet = cc.Class({

    

    properties: {
       m_strServerIp:"",
       m_strIpPort:"",
       m_pWebSocket:null,
    },

    initNet:function(svrIp,strPort)
    {
        if(svrIp=="" || svrIp==null)
        {
            return false;
        }
        if(strPort=="" || strPort==null)
        {
            return false;
        }
        this.m_strServerIp = svrIp;
        this.m_strIpPort = strPort;  
        var strWs = "ws://" + this.m_strServerIp + ":" + this.m_strIpPort;
        try
        {
            this.m_pWebSocket = new WebSocket(strWs);
            var pSelf = this;
            this.m_pWebSocket.onopen = function(evt)
            {
                cc.log("m_pWebSocket    onopen");
                pSelf.m_pWebSocket.send("my clinet go01");
                pSelf.m_pWebSocket.send("my clinet go02");
                pSelf.m_pWebSocket.send("my clinet go03");
                pSelf.m_pWebSocket.send("my clinet go04");
                pSelf.m_pWebSocket.send("my clinet go05");
               
            };
                
            this.m_pWebSocket.onclose = function(evt)
            {
                 cc.log("m_pWebSocket    onclose");
            };
            
            this.m_pWebSocket.onmessage = function(evt)
            {
                cc.log("m_pWebSocket    onmessage");
            };
            
            this.m_pWebSocket.onerror = function(evt)
            {
               cc.log("m_pWebSocket    onerror");
            };        

        }
        catch(e)
        {            
            cc.log(e.name + " NetError:" + e.message);
        };
        

        //this.m_pWebSocket.

    },

    sendData:function(strData)
    {
        if(this.m_pWebSocket != null)
        {
            this.m_pWebSocket.send(strData);
        }
    },


    CloseNet:function()
    {
        if(this.m_pWebSocket != null)
        {
            this.m_pWebSocket.close();
        }
    },

   

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

module.exports = {ClientNet};
