var PrimitiveBroadcast = require("primitive-broadcast-definition").Def;
var SCAMP = require("rtc-scamp-mbr");
var Network = require("p2pnetwork");

module.exports = function(uid){
    return Network.init({broadcastDefinition:new PrimitiveBroadcast(),
			 membership:new SCAMP(uid)});
};
