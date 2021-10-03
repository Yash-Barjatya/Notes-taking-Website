console.log("Up-2-Date ready to start")

//console.log(quote_num + 1)
displayNotes();
displayQuote();// this is called so that even if we refresh all the  already existing notes do show up
// add new notes to local storage

let add_note_btn = document.getElementById('add_note_btn');

add_note_btn.addEventListener("click", function (e) {
    // adding alert div again after removal from setTimeout function
    let main_card = document.getElementById('main_card')
    let success_div = document.createElement('div')
    main_card.appendChild(success_div)
    main_card.insertBefore(success_div, main_card.firstElementChild.nextElementSibling.nextElementSibling)
    success_div.id = "liveAlertPlaceholder"
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    //console.log(main_card)

    // funciton to  ALERT success
    function alert(message, type) {
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + '<i class="fa fa-check" aria-hidden="true"></i>' + " " + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

        alertPlaceholder.append(wrapper)
    }

    let add_note_text = document.getElementById('add_note_text');
    let add_note_title = document.getElementById('add_note_title');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let obj = {
        title: add_note_title.value,
        text: add_note_text.value,
    }
    notesObj.push(obj)// therefore notesObj is now array of object
    localStorage.setItem("notes", JSON.stringify(notesObj));
    add_note_text.value = "";// so that everytime after creation of new notes the texarea is set to blank
    add_note_title.value = "";// so that everytime after creation of new notes the texarea is set to blank
    //console.log(notesObj);

    alert('Your Note is successfully added !', 'success')
    displayNotes()
    // to remove the alert after 5 sec
    setTimeout(function () {
        alertPlaceholder.remove();
    }, 1500);
})


// function to display notes
function displayNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    }// notesObj is the array
    else notesObj = JSON.parse(notes);
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCards my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button  class="btn btn-primary" id="${index}" onclick="warning(this.id)">Delete Note</button>
                </div>
        </div>`// this on click part is done so that we can get index of the note to be deleted
    });
    let notes_element = document.getElementById('notes')
    if (notesObj.length != 0) {
        notes_element.innerHTML = html;
    }
    else {
        notes_element.innerHTML = "You have not added any Notes !!";
        notes_element.setAttribute("style", "color : aliceblue;font-size:20px; font-family: 'Roboto',sans-serif;");
    }
}

// warning message on clciking delete note
function warning(index) {
    let toastLiveExample = document.getElementById('liveToast')

    let toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
    console.log("entered warning function")
    let confirm_delete = document.getElementById('confirm_delete');
    confirm_delete.addEventListener('click', function () {
        console.log(index)
        deleteNote(index);
        console.log("clicked delete")
        document.getElementById("close_warning").click();
    })/*
    let close_warning = document.getElementById('close_warning');
    close_warning.addEventListener('click', function () {
        document.getElementById("close_warning").click();
        console.log(index)
    })*/
}




// function to delete notes
function deleteNote(index) {
    console.log("entered delete function")
    //let num = parseInt(index);
    //console.log(`Deleting note ${ num + 1 } `)
    // console.log("Deleting note", (num + 1))
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    }
    else notesObj = JSON.parse(notes);
    console.log(index)
    notesObj.splice(index, 1)// 1 element to be deleted whose index = index\
    localStorage.setItem("notes", JSON.stringify(notesObj));// updating local storage with this new notesObj array
    displayNotes();
}

// to sort notes by search
let search_textarea = document.getElementById('search_textarea');
search_textarea.addEventListener("input", function () {

    let searchVal = search_textarea.value;
    // console.log(`event triggered!! ${ searchVal } was searched`)
    let noteCards = document.getElementsByClassName('noteCards');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText// as for classnotesCard , the  elements like div etc has only one paragraph tag inside them but still we had addded 0 index
        // . innerText as else it would be just element and to use include funtion we need string

        //  console.log(cardTxt);
        if (cardTxt.toLowerCase().includes(searchVal.toLowerCase()) || cardTxt.toUpperCase().includes(searchVal.toUpperCase())) {// so that irrespective of the case the text is searched
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
let quote = document.getElementById('quote');
let author = document.getElementById('author');
// Fetch a random quote from the Quotable API
async function displayQuote() {
    let quote_num = Math.floor(Math.random() * 1643)
    const response = await fetch("https://type.fit/api/quotes")
    const data = await response.json();
    if (response.ok) {
        // Update DOM elements
        quote.innerHTML = `"${data[quote_num].text}"`
        author.innerHTML = `~${data[quote_num].author} `
    }
    else {
        fetch("http://api.quotable.io/random")
            .then(res => res.json())// to convert into json format
            .then(data => {
                quote.innerHTML = `"${data.content}"`
                author.innerHTML = `~${data.author} `
            })

    }
}

