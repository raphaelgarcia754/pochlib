/******************************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement de l'application. 
 * 
 ******************************************************************************************/

/**
 * Cette fonction insère un formulaire de recherche à la place du contenu de la div bouton/formulaire au clic du bouton "Ajouter un livre"
 * Elle appelle ensuite une fonction insérant le bouton "Ajouter un livre" à la place du formulaire de recherche au clic du bouton "Annuler"
 */
function clickAddBookButtonToForm() {
    const addBookButtonListener = document.getElementById("add_book_button");
    addBookButtonListener.addEventListener("click", function () {
        const element = document.getElementById("search-button-or-form");
        element.innerHTML = form;
        clickSubmit();
        clickCancelButtonToAddBookButton();
    });
}

/**
 * Cette fonction insère un bouton "Ajouter un livre" à la place du formulaire de recherche au clic du bouton "Annuler" (si des résultats de recherche sont déja affichés, elle les efface)
 * Elle appelle ensuite une fonction insérant un formulaire de recherche à la place du contenu de la div bouton/formulaire au clic du bouton "Ajouter un livre"
 */
function clickCancelButtonToAddBookButton() {
    const cancelButtonListener = document.getElementById("cancel_button");
    cancelButtonListener.addEventListener("click", function () {
        const element = document.getElementById("search-button-or-form");
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

        const titleSearch = document.getElementById("title-input").value;
        const authorSearch = document.getElementById("author-input").value;

        let answer;

        if (titleSearch === '' && authorSearch === '') {
            $(function () {
                toastr.error("Renseignez au moins un des deux champs", "", {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "300",
                    "timeOut": 3000,
                    "extendedTimeOut": 3000,
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut",
                    "tapToDismiss": true
                });
            });
        } else if (authorSearch === '') {
            answer = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${titleSearch}&maxResults=40&key=`);
        } else if (authorSearch !== '') {
            answer = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${titleSearch}+inauthor:${authorSearch}&maxResults=40&key=`);
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
    const resultsTitleElement = document.createElement("h2");
    resultsTitleElement.innerText = `Résultats de recherche`;

    const currentElement = document.querySelector("#content");
    currentElement.insertAdjacentElement("afterbegin", resultsTitleElement);


    const resultsElement = document.createElement("div");
    resultsElement.classList.add("booklist-display");
    resultsElement.id = "results";

    resultsTitleElement.insertAdjacentElement("afterend", resultsElement);

    if (list.totalItems === 0) {
        resultsElement.innerHTML = "Aucun livre n'a été trouvé";
    } else {
        try {
            for (let i = 0; i < list.items.length; i++) {
                const book = list.items[i];

                const bookElement = document.createElement("div");
                bookElement.classList.add("book");
                bookElement.dataset.id = book.id;

                const headerElement = document.createElement("div")
                headerElement.classList.add("book-header");

                const titleElement = document.createElement("h2");
                titleElement.classList.add("book-title");
                titleElement.innerText = "Titre : " + book.volumeInfo.title;

                const buttonElement = document.createElement("button");
                buttonElement.classList.add("book-button");
                buttonElement.dataset.id = book.id;

                const bookmarkIcon = document.createElement('i');
                bookmarkIcon.classList.add("fa-sharp", "fa-solid", "fa-bookmark");
                bookmarkIcon.style.color = '#469388';

                buttonElement.appendChild(bookmarkIcon);

                const idElement = document.createElement("p");
                idElement.classList.add("book-id");
                idElement.innerText = "id : " + book.id;

                const authorElement = document.createElement("p");
                authorElement.classList.add("book-author");
                authorElement.innerHTML = `Auteur : ${book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Information manquante"}`;
     
                const descriptionElement = document.createElement("p");
                descriptionElement.classList.add("book-description");
                descriptionElement.innerHTML = `Description : ${book.volumeInfo.description ? book.volumeInfo.description.substring(0, 200) + "..." : "Information manquante"}`;

                const imageElement = document.createElement("img");
                imageElement.classList.add("book-thumbnail");
                imageElement.src = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "images/unavailable.png";

                resultsElement.appendChild(bookElement);

                bookElement.appendChild(headerElement);

                headerElement.appendChild(titleElement);
                headerElement.appendChild(buttonElement);

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
 * Elle appelle enfin la fonction qui permet de retirer un livre de la poche'liste au clic du bouton corbeille
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
                        $(function () {
                            toastr.error("Vous ne pouvez ajouter deux fois le même livre", "", {
                                "closeButton": false,
                                "debug": false,
                                "newestOnTop": false,
                                "progressBar": false,
                                "positionClass": "toast-top-center",
                                "preventDuplicates": false,
                                "onclick": null,
                                "showDuration": "300",
                                "hideDuration": "300",
                                "timeOut": 3000,
                                "extendedTimeOut": 3000,
                                "showEasing": "swing",
                                "hideEasing": "linear",
                                "showMethod": "fadeIn",
                                "hideMethod": "fadeOut",
                                "tapToDismiss": true
                            });
                        });
                        return bookAlreadyAdded = true;
                    }
                }
            }

            if (bookAlreadyAdded === false) {
                myBookListElement.appendChild(addedBook);
                const buttonElement = document.querySelector(`.added-book[data-id="${id}"] button`);
                const bookmarkIcon = buttonElement.querySelector('i');
                bookmarkIcon.remove();
                const trashIcon = document.createElement('i');
                trashIcon.classList.add("fa-sharp", "fa-solid", "fa-trash");
                buttonElement.appendChild(trashIcon);

                $(function () {
                    toastr.info("Le livre a été ajouté à votre poch\'liste au bas de la page", "", {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-center",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "300",
                        "timeOut": 3000,
                        "extendedTimeOut": 3000,
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut",
                        "tapToDismiss": true
                    });
                });

                updateSessionStorage();
            }
            clickTrashToRemoveBookFromList();
        });
    }
}

/**
 * Cette fonction retire un livre de la poch'liste et de la session au clic du bouton corbeille
 */
function clickTrashToRemoveBookFromList() {
    let trashButtons = document.querySelectorAll(".added-book .book-button");

    for (let i = 0; i < trashButtons.length; i++) {
        trashButtons[i].addEventListener("click", function (event) {
            const id = event.currentTarget.dataset.id;
            const bookToRemove = document.querySelector(`.added-book[data-id="${id}"]`);

            if (bookToRemove) {
                bookToRemove.remove();

                $(function () {
                    toastr.info("Le livre a été supprimé de votre poch\'liste", "", {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-center",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "300",
                        "timeOut": 3000,
                        "extendedTimeOut": 3000,
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut",
                        "tapToDismiss": true
                    });
                });

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

    const addedBooksArray = Array.from(addedBooks);

    let sessionBooks = addedBooksArray.map(addedBook => ({
        innerHTML: addedBook.innerHTML,
        id: addedBook.dataset.id
    }));

    sessionBooks = JSON.stringify(sessionBooks);

    window.sessionStorage.setItem("sessionBooks", sessionBooks);
}

/**
 * Cette fonction efface les résultats de recherche affichés
 */
function clearResults() {
    document.querySelector("#content h2").remove();
    document.querySelector("#results").remove();
}