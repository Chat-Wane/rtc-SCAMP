# SCAMPjs

<i>Keywords: SCAMP, scalable membership, gossip, epidemic dissemination,
WebRTC</i>

This project is an attempt to provide a full browser gossip protocol with
random peer sampling. More specifically, it implements the Scalable Membership
Protocol (SCAMP) [1] which is a gossip that automatically resizes its
neighbourhood tables in order to fit with the size of the network using local
knowledge only.

SCAMPjs uses [WebRTC](http://www.webrtc.org) which allows creating peer-to-peer
connections within the browser. To our knowledge, there do not exist any
implementations which do not rely on a central server to ease the
initialisation phase of the membership. Thus, this project aims to fill this
gap. Such implementation would allow building distributed network by only
manually sharing a piece of data (e.g. by mail).

## Usage

The module has been [browserified](http://browserify.org) and
[uglified](https://github.com/mishoo/UglifyJS). To include SCAMPjs within
your browser, put the following line in your html:

```html
<script src="./scampjs.bundle.js"></script>
```

Within your html, you can use this project as a node module:

```js
var Peer = require("scampjs");

// #1 initialise the peer with a unique site identifier
var peer42 = new Peer(42);

// #2 when you are ready to join a network, you must prepare a message. By
// calling the following function, an event "first" will be emitted from peer.
peer42.initiate();

// #3 the event is finally triggered. It contains the message to send to a
// peer within then network. It is the responsibility of the user to send it
// to this peer.
peer42.on("first", function(message){
  console.log(JSON.stringify(message)); // example: output in the console
});
```

```js
var Peer = require('scampjs');

var peer1337 = new Peer(1337);

// #A assuming that the user got the initiating message from the peer '42', the
// message is given to the following function. This function will eventually
// emit an event "contact" which will contain the message to give to the peer
// '42'.
peer1337.onContact(message.uid, message.counter, message.offer);

// #B the event has a message which must be signalled to the peer '42'. Once
// again, it is the responsibility of the user to send the message to
// the latter. Careful: the message must correspond to the offer (to be sure,
// check if the uid of the 'first' message correspond to this message.destUid).
peer1337.on("contact", function(message){
  console.log(JSON.stringify(message));
});
```

```js
// #4 back to the peer '42'. Assuming that the user received the message from
// peer '1337', he must call the following function that will finalise the
// connection with the rest of the network.
peer42.acceptContact(message.uid, message.destCounter, message.offer);

// #5 afterwards, peer '42' is able to broadcast its messages to the network.
peer42.broadcast("hello world");
```

```js
// #C the peer '1337' will eventually receive it.
peer1337.on('receive', function(message){
  console.log(message) // "hello world"
});
```

## Example

There is a small example in the eponymous folder. To start it, follow the
steps:
<ol>
  <li>Download or clone the project</li>
  <li>Open the index.html file with any WebRTC compatible web
  browser (e.g. Chrome)</li>
  <li>Click on "1. Make offer". 3 seconds later, a string appears in the
  text area. Copy the string.</li>
  <li>Open a new tab with the same html file and paste the string inside the
  empty textarea.</li>
  <li>Click on "2. Accept offer". 3 seconds later, the string in the text area
  changes. Copy the string.</li>
  <li>In the first tab, erase the text area and paste string.</li>
  <li>Click on "3. Confirm handshake"</li>
  <li>The connection has started between the two tabs</li>
</ol>

To connect more peers, follow the same process: create a new tab, generate the
offer, copy it to a tab which is already connected to the network and click on
"2. Accept offer". Few seconds later, the text changes. Copy it to the new tab
and "3. Handshake".  The peer is now connected to the network.

In this example, each peer regularly broadcasts their name. Also, when they
receive a broadcast message, they print it in the page. Normally, in each
connected tab, the name of every other peers should appear.

## References

[1] [Peer-to-Peer Membership Management for Gossip-Based Protocols](http://pages.saclay.inria.fr/laurent.massoulie/ieee_tocs.pdf)
