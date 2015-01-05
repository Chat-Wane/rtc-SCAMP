var SCAMP = require("rtc-scamp-mbr");
var IVVBroadcast = require("ivv-broadcast-definition");
var Network = require("p2pnetwork");

module.exports = function(uid){
    return Network.init({broadcastDefinition:new IVVBroadcast(uid),
			 membership:new SCAMP(uid)});
};
