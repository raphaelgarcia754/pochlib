// Création d'un bouton "Ajouter un livre"
const addBookButton = `
<button id="add_book_button">Ajouter un livre</button>
    `;

// Création d'une div avec l'id "search" et insertion du bouton dans celle-ci
const newElement = document.createElement("div");
newElement.id = "search";
newElement.innerHTML = addBookButton;

// Sélection de la balise sous-titre de la div myBooks et insertion de la div "search" après celle-ci
let currentElement = document.querySelector("#myBooks h2");
currentElement.insertAdjacentElement("afterend", newElement);

// Création d'un formulaire de recherche de livres
const form = `
<form>
    <label for="title">Titre du livre</label>
    <input type="text" id="title" name="title">
    <label for="author">Auteur</label>
    <input type="text" id="author" name="author">
    <input type="submit" id ="search_button" value="Rechercher">
    <input type="button" id="cancel_button" value="Annuler">
</form>
    `;

// Création d'une balise d'affichage des livres pour la poch'liste
const myBookListElement = document.createElement("div")
myBookListElement.classList.add("booklist-display");
myBookListElement.id = "ma-poch-liste";

currentElement = document.querySelector("#content h2");
currentElement.insertAdjacentElement("afterend", myBookListElement);

// Appel à une fonction insérant le formulaire de recherche à la place du contenu de la div "search" au clic du bouton "Ajouter un livre"
clickAddBookButtonToForm();

/**
 * Cette fonction insère un formulaire de recherche à la place du contenu de la div "search" au clic du bouton "Ajouter un livre"
 * Elle appelle ensuite une fonction insérant le bouton "Ajouter un livre" à la place du formulaire de recherche au clic du bouton "Annuler"
 */
function clickAddBookButtonToForm() {
    const addBookButtonListener = document.getElementById("add_book_button");
    addBookButtonListener.addEventListener("click", function () {
        const element = document.getElementById("search");
        element.innerHTML = form;
        clickSubmit();
        clickCancelButtonToAddBookButton();
    });
}

/**
 * Cette fonction insère un bouton "Ajouter un livre" à la place du formulaire de recherche au clic du bouton "Annuler" (si des résultats de recherche sont déja affichés, elle les efface)
 * Elle appelle ensuite une fonction insérant un formulaire de recherche à la place du contenu de la div "search" au clic du bouton "Ajouter un livre"
 */
function clickCancelButtonToAddBookButton() {
    const cancelButtonListener = document.getElementById("cancel_button");
    cancelButtonListener.addEventListener("click", function () {
        const element = document.getElementById("search");
        element.innerHTML = addBookButton;
        if (document.querySelector("#results")) {
            clearResults();
            clickAddBookButtonToForm();
        } else {
            clickAddBookButtonToForm();
        }
    });
}

/**
 * Cette fonction récupère les informations du formulaire de recherche au clic du bouton "Rechercher"
 * Elle fait ensuite appel à l'API Google Books afin de générer une liste de résultats de recherche en fonction des éléments recherchés au format JSON
 * Enfin, elle appelle la fonction d'affichage des résultats de recherche (si des résultats de recherche sont déja affichés, elle les efface)
 */
function clickSubmit() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const titleSearch = document.getElementById("title").value;
        const authorSearch = document.getElementById("author").value;

        let answer;

        if (titleSearch === '' && authorSearch === '') {
            window.alert("Renseignez au moins un des deux champs");
        } else if (authorSearch === '') {
            answer = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${titleSearch}&maxResults=40&key=AIzaSyCuYVrzvyklLHTlPnVCmYmZ5Jeofck-rEo`);
        } else if (authorSearch !== '') {
            answer = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${titleSearch}+inauthor:${authorSearch}&maxResults=40&key=AIzaSyCuYVrzvyklLHTlPnVCmYmZ5Jeofck-rEo`);
        }

        if (answer) {
            const list = await answer.json();
            if (document.querySelector("#results")) {
                clearResults();
                showResults(list);
            } else {
                showResults(list);
            }
        }
    })
};

/**
 * Cette fonction affiche les résultats de recherche mis en forme
 * Elle appelle également la fonction permettant d'ajouter un livre à la poch'liste au clic du bouton bookmark
 * @param {json} list : la liste de résultats de recherche au format JSON obtenue à partir de la requête HTTP à l'API Google Books
 */
function showResults(list) {
    // Création d’une balise dédiée au titre des résultats de recherche
    const resultsTitleElement = document.createElement("div");
    resultsTitleElement.id = "results-title";
    resultsTitleElement.innerHTML = `<h2 class="h2">Résultats de recherche</h2>`;
    // Insertion dans le DOM (dans la balise de contenu, avant les résultats)
    const currentElement = document.querySelector("#content");
    currentElement.insertAdjacentElement("afterbegin", resultsTitleElement);

    // Création d’une balise dédiée aux résultats de recherche
    const resultsElement = document.createElement("div");
    resultsElement.classList.add("booklist-display");
    resultsElement.id = "results";
    // Insertion dans le DOM (dans la balise de contenu, avant la poch'liste)
    resultsTitleElement.insertAdjacentElement("afterend", resultsElement);

    // Message si la recherche ne retourne aucun résultat
    if (list.totalItems === 0) {
        resultsElement.innerHTML = "Aucun livre n'a été trouvé";
    } else {
        // Création des fiches livres
        try {
            for (let i = 0; i < list.items.length; i++) {

                const book = list.items[i];

                // Création d’une balise dédiée à un livre (ajout de l'id au besoin)
                const bookElement = document.createElement("div");
                bookElement.classList.add("book");
                bookElement.dataset.id = book.id;

                // Création des balises de contenu des livres

                // En-tête
                const headerElement = document.createElement("div")
                headerElement.classList.add("book-header");

                //Titre (sera contenu dans l'en-tête)
                const titleElement = document.createElement("h2");
                titleElement.classList.add("book-title");
                titleElement.innerText = "Titre : " + book.volumeInfo.title;

                //Bookmark (sera contenu dans l'en-tête, contient l'id du livre associé)
                const buttonElement = document.createElement("button");
                buttonElement.classList.add("book-button");
                buttonElement.dataset.id = book.id;

                const bookmarkIcon = document.createElement('i');
                bookmarkIcon.classList.add("fa-sharp", "fa-solid", "fa-bookmark");
                bookmarkIcon.style.color = '#469388';

                buttonElement.appendChild(bookmarkIcon);

                //id
                const idElement = document.createElement("p");
                idElement.classList.add("book-id");
                idElement.innerText = "id : " + book.id;

                //Auteur (uniquement le premier, indication si manquant)
                const authorElement = document.createElement("p");
                authorElement.classList.add("book-author");
                authorElement.innerHTML = `Auteur : ${book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Information manquante"}`;

                //Description (200 caractères max, indication si manquante)        
                const descriptionElement = document.createElement("p");
                descriptionElement.classList.add("book-description");
                descriptionElement.innerHTML = `Description : ${book.volumeInfo.description ? book.volumeInfo.description.substring(0, 200) + "..." : "Information manquante"}`;

                //Image (image alternative si manquante)
                const imageElement = document.createElement("img");
                imageElement.classList.add("book-thumbnail");
                imageElement.src = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "images/unavailable.png";


                // On rattache la balise dédiée à un livre à la balise résultats de recherche
                resultsElement.appendChild(bookElement);

                // On rattache la balise en-tête à la balise dédiée à un livre
                bookElement.appendChild(headerElement);

                // On rattache les balises de contenu de type en-tête à la balise en-tête
                headerElement.appendChild(titleElement);
                headerElement.appendChild(buttonElement);

                // On rattache les autres balises de contenu à la balise dédiée à un livre
                bookElement.appendChild(idElement);
                bookElement.appendChild(authorElement);
                bookElement.appendChild(descriptionElement);
                bookElement.appendChild(imageElement);
            }
        }
        catch (error) {
            console.log("Erreur dans l'affichage des résultats : " + error.message + i);
        }
        clickBookmarkToAddBookToList();
    }
}

/**
 * Cette fonction ajoute un livre à la poch'liste au clic du bouton bookmark et l'enregistre dans la session
 * Elle vérifie également si le livre n'a pas été déjà ajouté à la poch'liste
 */
function clickBookmarkToAddBookToList() {
    const bookmarkButtons = document.querySelectorAll(".book .book-button");

    for (let i = 0; i < bookmarkButtons.length; i++) {

        bookmarkButtons[i].addEventListener("click", function (event) {
            const id = event.currentTarget.dataset.id;

            const bookToAdd = document.querySelector(`.book[data-id="${id}"]`)

            let addedBook = bookToAdd.cloneNode(true);
            addedBook.classList.remove("book");
            addedBook.classList.add("added-book");

            let addedBooks = document.querySelectorAll("#ma-poch-liste .added-book");

            let bookAlreadyAdded = false;

            if (addedBooks.length === 0) {
                bookAlreadyAdded = false;
            } else if (addedBooks.length > 0) {
                for (let i = 0; i < addedBooks.length; i++) {
                    if (addedBooks[i].dataset.id === bookToAdd.dataset.id) {
                        window.alert("Vous ne pouvez ajouter deux fois le même livre");
                        return bookAlreadyAdded = true;
                    }
                }
            }

            if (bookAlreadyAdded === false) {
                myBookListElement.appendChild(addedBook);
                updateSessionStorage();
            }
        });
    }
}

/**
 * Cette fonction met à jour les livres enregistrés en session
 */
function updateSessionStorage() {
    const addedBooks = document.querySelectorAll("#ma-poch-liste .added-book");

    // Transformation de la nodelist comportant tous les livres ajoutés en tableau
    const addedBooksArray = Array.from(addedBooks);

    // Création d'un nouveau tableau avec mappage des données uniquement nécessaires pour chaque élément du tableau précédent
    let sessionBooks = addedBooksArray.map(addedBook => ({
        innerHTML: addedBook.innerHTML,
        id: addedBook.dataset.id
    }));

    // Conversion du tableau mappé en chaîne de caractères JSON
    sessionBooks = JSON.stringify(sessionBooks);

    // Enregistrement du tableau mappé sous forme de chaîne JSON dans la session
    window.sessionStorage.setItem("sessionBooks", sessionBooks);

    //Affichage dans la console du tableau enregistré dans la session
    console.log(window.sessionStorage.getItem("sessionBooks"));
}

/**
 * Cette fonction efface les résultats de recherche affichés
 */
function clearResults() {
    document.querySelector("#results-title").remove();
    document.querySelector("#results").remove();
}