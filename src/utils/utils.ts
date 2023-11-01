const User = require("../models/user.model")

// Cette fonction prend un tableau de mots, un index de début, un index de fin et le nombre d'espaces à insérer entre ces mots.
function joinALineWithSpace(
  words: string[],
  start: number,
  end: number,
  numSpaces: number
): string {
  // Calcul du nombre de mots dans la ligne actuelle.
  let numWordsCurrLine = end - start + 1;
  // Initialisation d'une chaîne de caractères vide pour stocker la ligne.
  let line = '';

  // Itération sur les mots de 'start' à 'end'.
  for (let i = start; i < end; i++) {
      // Ajout du mot à la ligne.
      line += words[i];
      numWordsCurrLine--;

      // Calcul du nombre d'espaces à insérer entre les mots.
      const numCurrSpace = Math.ceil(numSpaces / numWordsCurrLine);
      line += ' '.repeat(numCurrSpace);
      numSpaces -= numCurrSpace;
  }

  // Ajout du dernier mot de la ligne.
  line += words[end];
  // Ajout des espaces restants à la fin de la ligne.
  line += ' '.repeat(numSpaces);

  // Renvoie la ligne justifiée.
  return line;
}

// Cette fonction justifie un texte en respectant une largeur de ligne maximale (L).
function justifyText(words: string[], L: number): string[] {
  // Variables pour suivre l'état de la ligne en cours.
  let currLineStart = 0;
  let numWordsCurrLine = 0;
  let currLineLength = 0;
  // Tableau pour stocker les lignes justifiées.
  const result: string[] = [];

  // Itération sur les mots dans 'words'.
  for (let i = 0; i < words.length; i++) {
      numWordsCurrLine++;

      // Calcul de la longueur de la ligne si on ajoutait le mot actuel.
      const lookaheadLineLength = currLineLength + words[i].length + (numWordsCurrLine - 1);

      // Si la ligne est complète.
      if (lookaheadLineLength === L) {
          // Appel de 'joinALineWithSpace' pour obtenir la ligne justifiée et l'ajout au résultat.
          const ans = joinALineWithSpace(words, currLineStart, i, i - currLineStart);
          result.push(ans);

          // Mise à jour des variables pour la ligne suivante.
          currLineStart = i + 1;
          numWordsCurrLine = 0;
          currLineLength = 0;
      }
      // Si le mot actuel ne peut pas être ajouté à la ligne sans dépasser la largeur maximale.
      else if (lookaheadLineLength > L) {
          // Appel de 'joinALineWithSpace' pour obtenir la ligne justifiée et l'ajout au résultat.
          const ans = joinALineWithSpace(words, currLineStart, i - 1, L - currLineLength);
          result.push(ans);

          // Mise à jour des variables pour la ligne suivante.
          currLineStart = i;
          numWordsCurrLine = 1;
          currLineLength = words[i].length;
      }
      // Sinon, la ligne actuelle peut contenir le mot sans dépasser la largeur maximale.
      else {
          currLineLength += words[i].length;
      }
  }

  // Si des mots restent à la fin du tableau 'words'.
  if (numWordsCurrLine > 0) {
      // Appel de 'joinALineWithSpace' pour obtenir la dernière ligne justifiée.
      var line = joinALineWithSpace(words, currLineStart, words.length - 1, numWordsCurrLine - 1);
      // Ajout des espaces restants à la fin de la ligne.
      line += ' '.repeat(L - currLineLength - (numWordsCurrLine - 1));
      // Ajout de la ligne au résultat.
      result.push(line);
  }

  // Renvoie un tableau de lignes justifiées.
  return result;
}

// Cette fonction divise une chaîne en mots en utilisant l'espace comme séparateur.
function splitWords(str: string): string[] {
  const words: string[] = [];
  let a: string = '';

  // Itération sur les caractères de la chaîne 'str'.
  for (let i = 0; i < str.length; i++) {
      // Accumulation de caractères pour former un mot.
      if (str[i] !== ' ') {
          a += str[i];
      } else {
          // Ajout du mot accumulé au tableau 'words' et réinitialisation de 'a'.
          words.push(a);
          a = '';
      }
  }

  // Ajout du dernier mot à 'words'.
  words.push(a);
  // Renvoie le tableau de mots.
  return words;
}

// Cette fonction justifie un texte en utilisant les fonctions précédentes.
export function justifyTheText(str: string): string {
  const L: number = 80; // Largeur maximale de la ligne.
  const words: string[] = splitWords(str); // Division de la chaîne en mots.
  const result: string[] = justifyText(words, L); // Justification du texte.

  // Joint les lignes en une seule chaîne avec des sauts de ligne.
  const joinedText: string = result.join('\n');

  // Affiche le texte justifié dans la console.
  console.log(joinedText);

  // Renvoie le texte justifié.
  return joinedText;
}

// Fonction pour mettre à jour la propriété wordsLeft de tous les utilisateurs
export async function resetWordsLeft() {
  // Récupérer tous les utilisateurs
  const users = await User.find();

  // Mettre à jour la propriété wordsLeft de tous les utilisateurs à 80 000
  for (const user of users) {
    user.wordsLeft = 80000;
    await user.save();
  }
}
