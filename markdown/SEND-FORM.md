Pour envoyer un formulaire sans recharger la page en utilisant JavaScript, vous pouvez utiliser l'API XMLHttpRequest (un peu obsolète) ou la nouvelle API Fetch. Je vais vous montrer comment le faire avec Fetch, car c'est la méthode recommandée et plus moderne. Voici un exemple de code :

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire sans rechargement de page</title>
</head>
<body>

    <form id="myForm">
        <!-- Vos champs de formulaire ici -->
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" name="username">
        
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" name="password">
        
        <input type="submit" value="Envoyer">
    </form>

    <script>
        document.getElementById("myForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Empêche le formulaire d'être soumis normalement

            // Récupération des données du formulaire
            var formData = new FormData(this);

            // Envoi des données à l'aide de l'API Fetch
            fetch('votre_url_de_traitement', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json()) // Vous pouvez utiliser .text() si la réponse est du texte plutôt que du JSON
            .then(data => {
                // Traitement de la réponse
                console.log(data);
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi du formulaire:', error);
            });
        });
    </script>

</body>
</html>
```

Assurez-vous de remplacer `'votre_url_de_traitement'` par l'URL vers laquelle vous souhaitez envoyer les données du formulaire. Vous devrez également ajouter des champs de formulaire appropriés en fonction de vos besoins.

Cette approche utilise l'API Fetch pour envoyer les données du formulaire en arrière-plan, puis traite la réponse comme vous le souhaitez.