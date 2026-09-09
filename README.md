# Portfolio — HTML / CSS / JS vanilla

Portfolio de développeur en HTML, CSS et JavaScript purs. Aucun framework, aucune dépendance, aucun build.

## Structure

```
.
├── index.html
├── css/
│   └── style.css
└── js/
    └── main.js
```

## Lancer le projet en local

Aucun serveur n'est strictement nécessaire (tu peux ouvrir `index.html` directement dans le navigateur), mais un petit serveur statique évite certains soucis :

```bash
# avec Python
python3 -m http.server 8080

# ou avec Node
npx serve .
```

Puis ouvrir `http://localhost:8080`.

## Personnalisation

- Le tableau `projects` dans `js/main.js` contient les projets affichés — à remplacer par les tiens.
- Le thème clair/sombre est géré par un attribut `data-theme` sur `<html>`, mémorisé dans `localStorage`.
- Le formulaire de contact valide les champs côté client mais n'envoie rien réellement : à brancher sur un service (Formspree, EmailJS...) ou une API perso dans `initContactForm()` (`js/main.js`) si besoin.
