let oscPort;

oscPort = new osc.WebSocketPort({
  url: "ws://localhost:9000", // same as your Node.js server
  metadata: true
});
oscPort.open();

oscPort.on("ready", () => {
  console.log("Connected to OSC WebSocket!");
});

oscPort.on("open", () => {
  console.log("✅ WebSocket connected to Node.js server");
});

if (oscPort && oscPort.readyState === WebSocket.OPEN) {
  oscPort.send({
    address: "/address",
    args: [
      {
        type: "f", // float
        value: 123.4
      },
      {
        type: "s", // string
        value: "hello"
      }
    ]
  });
}



function sendOSC(address, values) {

const args = values.map((v) => {
if (typeof v === "number") {
  return { type: "f", value: v }; // float
} else if (typeof v === "string") {
  return { type: "s", value: v }; // string
} else {
  return { type: "s", value: String(v) };
}
});

oscPort.send({ address, args });
console.log("✅ Sent OSC:", address, args);
console.log("Sent OSC:", address, values);
}

const myButton = document.getElementById("btn")
  myButton.addEventListener("click", function (e) {
  console.log("Button clicked:", e.currentTarget.className);
sendOSC("/test", [25]);
});
