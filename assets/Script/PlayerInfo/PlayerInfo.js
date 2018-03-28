
var PlayerInfo = cc.Class({
        properties: {
            PlayerId:null,
        },

        setPlayerId:function(playerID){
            this.PlayerId = playerID;
        },

        getMyPlayerID:function(){
            return this.PlayerId;
        }   
});

module.exports = {PlayerInfo};
