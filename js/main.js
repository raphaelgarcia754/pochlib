/*********************************************************
 * 
 * Point d'entrée, c'est lui qui initialise l'application. 
 * 
 *********************************************************/

let sessionBooks = sessionStorage.getItem("sessionBooks");
if (sessionBooks) {
    sessionBooks = JSON.parse(sessionBooks);

    for (let i = 0; i < sessionBooks.length; i++) {
        const sessionBook = sessionBooks[i];

        const addedBook = document.createElement("div");

        addedBook.innerHTML = sessionBook.innerHTML;
        addedBook.dataset.id = sessionBook.id;
        addedBook.classList.add("added-book");

        myBookListElement.appendChild(addedBook);
    }
}

clickTrashToRemoveBookFromList()

clickAddBookButtonToForm();