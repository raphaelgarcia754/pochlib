# Poch'Lib

Poch'Lib est une application web de recherche de livres en ligne.

Elle permet à l'utilisateur d'enregistrer les livres recherchés dans une "Poch'liste" pour lui permettre de venir les récupérer ensuite en librairie.

Elle est compatible avec les formats mobile, tablette et bureau.

## Pour commencer

On trouvera ici les instructions pour installer l'application en local afin de la tester.

En second lieu, des recommandations sont proposées pour le déploiement de l'application en ligne.

### Pré-requis

Il est nécessaire de posséder : 

- Une clé Google API (Google Books API doit être activé)
- Un logiciel permettant de décompresser un dossier ZIP
- Un éditeur de texte/code ou IDE
- Un navigateur Internet
- Une application de visionnage de fichiers html (terminaux mobiles et tablettes uniquement)
- Le logiciel Git (si clonage du projet)

### Installation

1/ Cliquer sur le bouton vert "<> Code"

2/ Dans le menu déroulant, cliquer sur "Download ZIP" (ou copier l'adresse URL pour cloner le projet avec Git)

3/ Extraire les fichiers du dossier compressé dans l'emplacement de son choix (ou naviguer dans le dossier du projet si cloné)

4/ Dans le dossier "js" à la racine du dossier "pochlib-main" ou "pochlib", ouvrir le fichier "script.js" avec l'éditeur de texte/code ou IDE de son choix

5/ Insérer la clé Google API aux lignes 76 et 78 après "key="

6/ Enregistrer les modifications et fermer l'éditeur de texte/code ou IDE

Mobile et tablette uniquement :

7/ Télécharger une application de visionnage de fichiers html

8/ Y copier l'intégralité du dossier "pochlib-main" ou "pochlib"

Note : dans un environnement bureau, il est également possible de visionner l'application en mode mobile ou tablette depuis la plupart des navigateurs Internet 

## Démarrage

Ouvrir le fichier "index.html" à la racine du dossier "pochlib-main" ou "pochlib" avec le navigateur Internet ou l'application de visionnage de fichiers html de son choix.

## Recommandations pour le déploiement

Avant tout déploiement, il faudra être vigilant à ce que la clé Google API ne puisse être rendue publique.

1/ Mettre l'application web en ligne via un hébergeur

2/ Accéder à l'application via son adresse URL avec un navigateur Internet depuis n'importe quel terminal mobile, tablette ou bureau

## Fabriqué avec :

* HTML5/CSS3
* SCSS
* Javascript
* JQuery
* Toastr JS (https://github.com/CodeSeven/toastr)
* Google Books API
* FontAwesome

## Auteur

* Raphaël Garcia
