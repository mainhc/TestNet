var FuncHelp = {
    getObjectSize:function(tempObj)
    {
         var iCount = 0;        
         var proNameA = Object.getOwnPropertyNames(tempObj);
         iCount = proNameA.length;
         return iCount;        
    },

    getObjectByIndex:function(tempObj,index)
    {
        var proNameA = Object.getOwnPropertyNames(tempObj);
        let iProNameSize = proNameA.length;        
        let resTemp = null;
        if(index<0 || index>=iProNameSize)
        {
            return resTemp;
        }
        var proName = proNameA[index];
        resTemp = tempObj[proName];
        return resTemp;
    },

  };

  module.exports = {FuncHelp};
