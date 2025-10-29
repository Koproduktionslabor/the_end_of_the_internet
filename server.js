//from https://www.youtube.com/watch?v=pXq8TTG5Ihs&ab_channel=ScottAllenVisualArt

const osc = require("osc"),
WebSocket = require("ws");

const udp = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 7400, // 待ち受ける時のポート番号
    remoteAddress: "127.0.0.1",
    remotePort: 8000 // Unityの待ち受けポート番号
});

udp.on("ready", function () {
    console.log("Listening for OSC over UDP.");
});

udp.on("message", (oscMsg, timeTag, info) => {
    console.log("📡 Forwarding to UDP:", oscMsg, "from", info);
  });

udp.open();

const wss = new WebSocket.Server({
    port: 9000 // p5.jsと接続する場合の接続先ポート番号
});

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    const socketPort = new osc.WebSocketPort({
        socket: socket
    });

    const relay = new osc.Relay(udp, socketPort, {
        raw: true
    });

    socketPort.on("message", (oscMsg) => {
        console.log("Message Received:", oscMsg);
      });
});