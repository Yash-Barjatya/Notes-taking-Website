console.log("Up-2-Date ready to start")
displayNotes();// this is called so that even if we refresh all the  already existing notes do show up
// add new notes to local storage
let add_note_btn = document.getElementById('add_note_btn');
add_note_btn.addEventListener("click", function (e) {
    let add_note_text = document.getElementById('add_note_text');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(add_note_text.value)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    add_note_text.value = "";// so that everytime after creation of new notes the texarea is set to blank
    console.log(notesObj);
    displayNotes()

})
// function to display notes
function displayNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    }
    else notesObj = JSON.parse(notes);
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCards my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${element}</p>
                <button  class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
                </div>
        </div>`// this on click part is done so that we can get index of the note to be deleted
    });
    let notes_element = document.getElementById('notes')
    if (notesObj.length != 0) {
        notes_element.innerHTML = html;
    }
    else {
        notes_element.innerHTML = "You have not added any Notes !!";
        notes_element.setAttribute("style", "color : white; margin-left:36% ;font-size:20px");
    }
}
// function to delete notes
function deleteNote(index) {
    let num = parseInt(index);
    //console.log(`Deleting note ${num + 1}`)
    console.log("Deleting note", (num + 1))
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    }
    else notesObj = JSON.parse(notes);
    notesObj.splice(index, 1)// 1 element to be deleted whose index = index\
    localStorage.setItem("notes", JSON.stringify(notesObj));// updating local storage with this new notesObj array
    displayNotes();
}