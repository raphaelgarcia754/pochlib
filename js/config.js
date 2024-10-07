/***********************************************************************
 * 
 * Ce fichier contient les modifications initiales du DOM nécessaires au
 * fonctionnement de l'application.
 * 
 ***********************************************************************/

// Création d'un header et insertion du titre dans celui-ci
const titleElement = document.querySelector(".title");

const headerElement = document.createElement("header");
headerElement.appendChild(titleElement);

let currentElement = document.querySelector("body");
currentElement.insertAdjacentElement("afterbegin", headerElement);

// Création d'un footer et insertion du logo dans celui-ci
const logoElement = document.querySelector(".logo");

const footerElement = document.createElement("footer");
footerElement.appendChild(logoElement);

currentElement.appendChild(footerElement);

// Création d'un bouton "Ajouter un livre"
const addBookButton = `
<button id="add_book_button">Ajouter un livre</button>
    `;

// Création d'une div pour le bouton ou le formulaire et insertion du bouton dans celle-ci
const buttonFormElement = document.createElement("div");
buttonFormElement.id = "search-button-or-form";
buttonFormElement.innerHTML = addBookButton;

// Création d'une div pour la partie recherche et insertion du titre de la partie et de la div bouton/formulaire dans celle-ci
searchElement = document.createElement("div");
searchElement.id = "search";

const searchTitleElement = document.querySelector("#myBooks h2");

searchElement.insertAdjacentElement("afterbegin", searchTitleElement);
searchElement.insertAdjacentElement("beforeend", buttonFormElement);

currentElement = document.querySelector("#myBooks");
currentElement.insertAdjacentElement("afterbegin", searchElement);

// Création d'un formulaire de recherche de livres
const form = `
<form>
	<label for="title-input" id="title-label">Titre du livre</label>
	<input type="text" id="title-input" name="title-input">
	<label for="author-input" id="author-label">Auteur</label>
	<input type="text" id="author-input" name="author-input">
	<div class="form-button-container">
		<input type="submit" id="search_button" value="Rechercher">
		<input type="button" id="cancel_button" value="Annuler">
	</div>
</form>
    `;

// Création d'une div d'affichage des livres pour la poch'liste
const myBookListElement = document.createElement("div")
myBookListElement.classList.add("booklist-display");
myBookListElement.id = "ma-poch-liste";

currentElement = document.querySelector("#content h2");
currentElement.insertAdjacentElement("afterend", myBookListElement);