# Test technique backend Tictactrip!

Hello Tictactrip, voici mon code pour le test technique que vous m'avez donné.

Quelques petites précisions sur le code :

 1. J'ai choisi de faire une base de données afin que les résultats puissent être stockés de manière permanente. J'ai utilisé une base de données Atlas, la clé de connexion à la BDD est dans le code vous n'avez donc pas besoin de vous connecter vous même. Il ne faut évidemment jamais fournir une clé de manière publique mais pour le bien du test je me suis permis de le faire.

2. Le nombre de mots restants pour chaque mail est stocké dans la propriété "wordsLeft".

3. Afin de réinitialiser le nombre de mots restants chaque jour j'ai utilisé CRON afin de lancer une évènement tous les jours à minuit.

4. Lors de la compilation du code TS, il vous faudra lancer de le serveur depuis le dossier "dist" qui sera créée.

5. Les requêtes POST se font avec le endpoint suivant "/api/justify" avec en Headers de requête une propriété "x-email" contenant l'adresse mail voulue. Un utilisateur ne possédant plus que 2 mots existent dans la BDD afin de vérifier l'erreur 402, son adresse mail est la suivante : "test@gmail.com"
