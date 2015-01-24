# rtc-SCAMP

<i>Keywords: SCAMP, scalable membership, gossip, epidemic dissemination,
WebRTC</i>

This project is an attempt to provide a full browser gossip protocol with
random peer sampling. More specifically, it implements the Scalable Membership
Protocol (SCAMP) [1] which is a gossip that automatically resizes its
neighbourhood tables in order to fit with the size of the network using local
knowledge only.

The Project rtc-SCAMP uses [WebRTC](http://www.webrtc.org) which allows
creating peer-to-peer connections within the browser. To our knowledge, there
do not exist any implementations which do not rely on a central server to
ease the initialisation phase of the membership. Thus, this project aims to
fill this gap. Such implementation would allow building distributed network
by only manually sharing a piece of data (e.g. by mail).

## Installation (TODO)

You can get the module using the node packet manager: ``` $ npm install rtc-scamp```

Or using bower: ```$ bower install rtc-scamp```

## Usage

This module creates a network which implements the [p2pnetwork
API](https://github.com/justayak/network). It uses
[rtc-scamp-mbr](http://github.com/chat-wane/rtc-scamp-mbr) for the membership
part, i.e., how a peer can join the network. It uses
[simple-broadcast-definition](https://github.com/Chat-Wane/PrimitiveBroadcastDefinition.git)
for the epidemic dissemination of messages which collects the unique identifier
of each message so they are broadcast only once.

## Example

The example is hosted [here](http://chat-wane.github.io/rtc-SCAMP/). The code
can be found on the
[gh-branch](https://github.com/Chat-Wane/rtc-SCAMP/tree/gh-pages) of this
project. To use it, follow the steps:
<ol>
  <li>Open the link with any WebRTC compatible web browser (e.g. Chrome)</li>
  <li>Click on "1. Make offer". 3 seconds later, a string appears in the
  text area. Copy the string.</li>
  <li>Open a new tab with the same link and paste the string inside the
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
