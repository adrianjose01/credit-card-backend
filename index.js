const express = require("express");
const app = express();
const admin = require("firebase-admin");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
  databaseURL: "https://credit-card-87c86-default-rtdb.firebaseio.com/",
});

const db = admin.database();
const cardsRef = db.ref("cards");

// POST CREDIT CARD
app.post("/create-card", async (req, res) => {
  try {
    const { id, cardName, cardNumber, expirationDate, cvvNumber } = req.body;
    await cardsRef
      .child(id)
      .set({ cardName, cardNumber, expirationDate, cvvNumber });
    res.status(201).json({ message: "Credit Card created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET CREDIT CARD BY ID
app.get("/get-card/:id", async (req, res) => {
  try {
    const snapshot = await cardsRef.child(req.params.id).once("value");
    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: "Credit Card not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL CREDIT CARDS
app.get("/get-cards", async (req, res) => {
  try {
    const snapshot = await cardsRef.once("value");
    if (snapshot.exists()) {
      const data = snapshot.val();
      const cards = Object.entries(data).map(([id, card]) => ({ id, ...card }));
      res.status(200).json(cards);
    } else {
      res.status(404).json({ message: "No Credit Cards found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT CREDIT CARD
app.post("/update-card/:id", async (req, res) => {
  try {
    const { cardName, cardNumber, expirationDate, cvvNumber } = req.body;
    await cardsRef
      .child(req.params.id)
      .update({ cardName, cardNumber, expirationDate, cvvNumber });
    res.status(200).json({ message: "Credit Card updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE CREDIT CARD
app.post("/delete-card/:id", async (req, res) => {
  try {
    await cardsRef.child(req.params.id).remove();
    res.status(200).json({ message: "Credit Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("App running in Port: 3001");
});
