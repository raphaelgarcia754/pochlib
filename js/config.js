/***********************************************************************
 * 
 * Ce fichier contient les modifications initiales du DOM nécessaires au
 * fonctionnement de l'application.
 * 
 ***********************************************************************/

const titleElement = document.querySelector(".title");
const headerElement = document.createElement("header");
headerElement.appendChild(titleElement);
let currentElement = document.querySelector("body");
currentElement.insertAdjacentElement("afterbegin", headerElement);

const logoElement = document.querySelector(".logo");
const footerElement = document.createElement("footer");
footerElement.appendChild(logoElement);
currentElement.appendChild(footerElement);

const searchTitleElement = document.querySelector("#myBooks h2");

const addBookButton = `
<button id="add_book_button">Ajouter un livre</button>
    `;
const buttonFormElement = document.createElement("div");
buttonFormElement.id = "search-button-or-form";
buttonFormElement.innerHTML = addBookButton;

searchElement = document.createElement("div");
searchElement.id = "search";
searchElement.insertAdjacentElement("afterbegin", searchTitleElement);
searchElement.insertAdjacentElement("beforeend", buttonFormElement);
currentElement = document.querySelector("#myBooks");
currentElement.insertAdjacentElement("afterbegin", searchElement);

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

const myBookListElement = document.createElement("div")
myBookListElement.classList.add("booklist-display");
myBookListElement.id = "ma-poch-liste";
currentElement = document.querySelector("#content h2");
currentElement.insertAdjacentElement("afterend", myBookListElement);