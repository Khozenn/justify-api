import express from "express";
import bodyParser from "body-parser"
import mongoose from "mongoose";
import { CronJob } from "cron";

const justifyRoutes = require('./routes/justify')

import { resetWordsLeft } from "./utils/utils";

const app = express();
const MONGODB_URI = "mongodb+srv://root:root@ocnode.imerpue.mongodb.net/?retryWrites=true&w=majority";
const cron = new CronJob("0 0 0 * * *", resetWordsLeft); // Event Cron : lancement de resetWorldsLeft tous les jours à minuit

// Connexion à la base de données
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(bodyParser.text()); // Send JSON responses

app.use("/api/justify", justifyRoutes)  // Routing justify

// Lancement du serveur
app.listen(3000, () => {
  console.log("Server is running on port 3000");
  cron.start() // Lancement du script au lancement du serveur 
});
