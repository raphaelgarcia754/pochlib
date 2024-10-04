/*********************************************************
 * 
 * Point d'entrée, c'est lui qui initialise l'application. 
 * 
 *********************************************************/

// Vérification si au moins un livre est enregistré en session et ajout dans la poch'liste le cas échéant
let sessionBooks = sessionStorage.getItem("sessionBooks");
if (sessionBooks) {
    // Conversion de la chaîne de caractères JSON en tableau
    sessionBooks = JSON.parse(sessionBooks);

    // Insertion des éléments mappés du tableau pour chaque livre ajouté dans une div livre ajouté, puis chaque div dans la poch'liste
    for (let i = 0; i < sessionBooks.length; i++) {
        const sessionBook = sessionBooks[i];

        const addedBook = document.createElement("div");

        addedBook.innerHTML = sessionBook.innerHTML;
        addedBook.dataset.id = sessionBook.id;
        addedBook.classList.add("added-book");

        myBookListElement.appendChild(addedBook);
    }
}

// Appel à une fonction permettant de supprimer un livre de la poch'liste
clickTrashToRemoveBookFromList()

// Appel à une fonction insérant le formulaire de recherche à la place du contenu de la div "search" au clic du bouton "Ajouter un livre"
clickAddBookButtonToForm();