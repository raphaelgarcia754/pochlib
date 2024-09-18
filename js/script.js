// Création d'un bouton "Ajouter un livre"
const addBookButton = `
<button id="add_book_button">Ajouter un livre</button>
    `;

// Création d'une div avec l'id "search" et insertion du bouton dans celle-ci
const newElement = document.createElement("div");
newElement.id = "search";
newElement.innerHTML = addBookButton;

// Sélection de la balise sous-titre de la div myBooks et insertion de la div "search" après celle-ci
const currentElement = document.querySelector("#myBooks h2");
currentElement.insertAdjacentElement("afterend", newElement);

// Création d'un formulaire de recherche de livres
const form = `
<form>
    <label for="title">Titre du livre</label>
    <input type="text" id="title" name="title" required>
    <label for="author">Auteur</label>
    <input type="text" id="author" name="author">
    <input type="submit" id ="search_button" value="Rechercher">
    <input type="button" id="cancel_button" value="Annuler">
</form>
    `;

// Appel à une fonction insérant le formulaire à la place du contenu de la div "search" au clic du bouton "Ajouter un livre"
clickAddBookButtonToForm();

/**
 * Cette fonction insère un formulaire à la place du contenu de la div "search" au clic du bouton "Ajouter un livre"
 * Elle appelle ensuite une fonction insérant le bouton "Ajouter un livre" à la place du contenu de la div "search" au clic du bouton "Annuler"
 */
function clickAddBookButtonToForm() {
    const addBookButtonListener = document.getElementById("add_book_button");
    addBookButtonListener.addEventListener("click", function () {
        let element = document.getElementById("search");
        element.innerHTML = form;
        clickCancelButtonToAddBookButton();
    });
}

/**
 * Cette fonction insère un bouton "Ajouter un livre" à la place du contenu de la div "search" au clic du bouton "Annuler"
 * Elle appelle ensuite une fonction insérant un formulaire à la place du contenu de la div "search" au clic du bouton "Ajouter un livre"
 */
function clickCancelButtonToAddBookButton() {
    const cancelButtonListener = document.getElementById("cancel_button");
    cancelButtonListener.addEventListener("click", function () {
        let element = document.getElementById("search");
        element.innerHTML = addBookButton;
        clickAddBookButtonToForm();
    });
}