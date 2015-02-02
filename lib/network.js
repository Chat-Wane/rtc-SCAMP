var BoundedBroadcast = require("bounded-broadcast-definition").Def;
var SCAMP = require("rtc-scamp-mbr");
var Network = require("p2pnetwork");

module.exports = function(uid){
    return Network.init({broadcastDefinition:new BoundedBroadcast(500),
			 membership:new SCAMP(uid)});
};
