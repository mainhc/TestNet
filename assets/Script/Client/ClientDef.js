var GridPix = 256;

var eObjType = cc.Enum({
    eotNpc:1,
});

var eObjState = cc.Enum({
    eObjNull:-1,
    eObjStand:1,
    eObjWalk:2,

});

module.exports = {GridPix,eObjType,eObjState};