var GridPix = 64;

var eObjType = cc.Enum({
    eotNpc:0, 

});

var eObjState = cc.Enum({
    eObjNull:-1,
    eObjStand:0,
    eObjWalk:1,

});

module.exports = {GridPix,eObjType,eObjState};