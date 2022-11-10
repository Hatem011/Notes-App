var titleInput=document.getElementById("titleInput");
var descriptionInput=document.getElementById("descriptionInput");
var dateInput=document.getElementById("dateInput");
var addBtn=document.getElementById("addBtn");
var addEdit=document.getElementById("addEdit");
var resetBtn=document.getElementById("resetBtn");
var formInputs=document.getElementsByClassName("form-control");
var alertTitle=document.getElementById("alertTitle");
var alertdesc=document.getElementById("alertdesc");
var Notes=[];
var currentIndex=0;
if(localStorage.getItem("NotesList")!=null)
{
    var Notes=JSON.parse(localStorage.getItem("NotesList"));
    displayNote()
}
addBtn.onclick=function()
{
    addNote();
    displayNote();
    resetForm()
}
addEdit.onclick=function()
{
    EditNote();
    resetForm();
}
resetBtn.onclick=function()
{
    resetForm();
}

// function addNote
function addNote()
{
    var Note={
title:titleInput.value,
description:descriptionInput.value,
date:dateInput.value
    }

Notes.push(Note);
console.log(Notes);
localStorage.setItem("NotesList",JSON.stringify(Notes))
}

// function displayNote

function displayNote()
{
    var cartona=''
    for(var i=0;i<Notes.length;i++)
    {
cartona+=`
<div class="col-md-4">
<div class="note-item">
    <h1>${Notes[i].title}</h1>
    <p>${Notes[i].description}</p>
    <p>${Notes[i].date}</p>
    <button class="btn btn-outline-info" onclick="deleteNote(${i})">delete</button>
    <button class="btn btn-outline-danger"onclick="updateNote(${i})">update</button>
</div>
</div> 
`
    }
    document.getElementById("rowData").innerHTML=cartona;
}

// function deleteNote

function deleteNote(index)
{
Notes.splice(index,1)
localStorage.setItem("NotesList",JSON.stringify(Notes))
displayNote()
}

// function deleteNote
function updateNote(index)
{
    currentIndex=index
titleInput.value=Notes[index].title;
descriptionInput.value=Notes[index].description;
dateInput.value=Notes[index].date;
document.getElementById("addEdit").style.display="inline";
document.getElementById("addBtn").style.display="none";
}
// Function add Edit 

function EditNote()
{
Notes[currentIndex].title=titleInput.value;
Notes[currentIndex].description=descriptionInput.value;
Notes[currentIndex].date=dateInput.value;
document.getElementById("addEdit").style.display="none";
document.getElementById("addBtn").style.display="inline";
localStorage.setItem("NotesList",JSON.stringify(Notes))
displayNote();
}

// function resetForm

function resetForm()
{
    for(var i=0;i<formInputs.length;i++)
    {
        formInputs[i].value="";
    }
}

// validation for note title

titleInput.onkeyup=function()
{
    var titleRegex = /^[A-Z][a-z]{3,10}[0-9]?$/
    if(titleRegex.test(titleInput.value)==true)
    {
        document.getElementById("alertTitle").style.display="none"
    }
    else
    {
        document.getElementById("alertTitle").style.display="block"   
    }
}

// validation for note description

descriptionInput.onkeyup=function()
{
    var descRegex = /[a-z]{3,40}/
    if(descRegex.test(descriptionInput.value)==true)
    {
        document.getElementById("alertdesc").style.display="none"
    }
    else
    {
        document.getElementById("alertdesc").style.display="block"   
    }
}
