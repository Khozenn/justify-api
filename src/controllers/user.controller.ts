import { Request, Response, NextFunction } from "express";
const User = require('../models/user.model')
import { justifyTheText } from "../utils/utils"

exports.createJustify = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.headers["x-email"]

    if (!email) {
        res.status(400).send({ error: "x-email header is required" });
        return;
    }

    const text = req.body
    const user = await User.findOne({ email: email}) // Vérification de l'existence de ce email dans la BDD

    if (user){
        if(user.wordsLeft < text.trim().split(/\s+/).length){
        res.status(402).json({message : "Paiement required"}) // Erreur 402 si plus assez de jetons
        }else{
            user.wordsLeft -= text.trim().split(/\s+/).length  // soustraction du nombre de mots aux nombres de mots restants pour cet email
            user.save()
        }
    }else{
        // Création d'un User avec ce mail et soustraction du nombres de mots
        const newUser = new User({
            email: "",
            worldsLeft: 80000 - text.trim().split(/\s+/).length  
        })
        newUser.email = email
        await newUser.save()
    }

    const justifiedText = justifyTheText(text); // Justification du texte

    res.status(200).send(justifiedText); // Renvoie du texte justifié en réponse
} 