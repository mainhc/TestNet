var ObjIDMgr = cc.Class({


    properties: {
        m_akNoUseID:[],
        m_iLastID:10000,       
    },

    getCanUseID()
    {
        var iSize = this.m_akNoUseID.length;
        if(iSize > 0)
        {
            var resID = this.m_akNoUseID.pop(); 
            return resID;
        }
        this.m_iLastID +=1;
        return this.m_iLastID;
    },
   
});

module.exports = {ObjIDMgr};
