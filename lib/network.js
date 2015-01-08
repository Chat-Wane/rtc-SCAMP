var SCAMP = require("rtc-scamp-mbr");
var IVVBroadcast = require("ivv-broadcast-definition");
var Network = require("p2pnetwork");
var PrimitiveBroadcast = require("p2pnetwork/lib/primitiveBroadcastDefinition.js").Def;


module.exports = function(uid){
    return Network.init({broadcastDefinition:new PrimitiveBroadcast(),
			 membership:new SCAMP(uid)});
};
