var tableMgr = cc.Class({
  

    properties: {
        m_akGameTabel:null,    
    },
  
    initTabel() {
        this.m_akGameTabel = {};
        var pSelf = this;
        cc.loader.loadResDir("table",function(err, objects, urls)
        {
            if(err)
            {
                cc.error(err);
                return;
            }
            
            for(var index = 0; index < objects.length;index++)
            {
                var table = objects[index];
                var tablename = urls[index];
                tablename = tablename.substr(tablename.lastIndexOf('/')+1);
                pSelf.m_akGameTabel[tablename] = table;
            }            
        });     

    },   

    getTabelConfigById(tabelname,idTable)
    {
        var pTempTable = this.m_akGameTabel[tabelname];
        if(pTempTable != null)
        {
            return pTempTable[idTable];
        }
        return null;
    },
});

module.exports = {tableMgr};
