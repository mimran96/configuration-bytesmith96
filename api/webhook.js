export default function handler(req, res) {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "bytesmith123";

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified!");
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("Verification failed");
    }
  }

  if (req.method === "POST") {
    console.log("Webhook event:", req.body);
    return res.status(200).send("EVENT_RECEIVED");
  }

  return res.status(404).send("Not Found");
}
