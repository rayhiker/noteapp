var main = function() {
  "use strict";

  var current;
  var notes_default = [
    {"title": "Note", "text": "Test", "color": "red"},
    {"title": "Note again", "text": "Another note", "color": "blue"},
    {"title": "Note more", "text": "One more note", "color": "yellow"}];

  var notes = [];
  var note = function(){
    this.title = "New note";
    this.text = "Add text here";
    this.color = "white";
  };
  var init = function() {
    if (localStorage.getItem("notes")){
      notes = JSON.parse(localStorage.getItem("notes"));
    }
    showNotes();
    clearNote();
  };
  var showNotes = function(){
    var output = "";
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    } else {
      localStorage.removeItem("notes");
    }
    for(var item in notes){
      output += "<input type='text' value='" + notes[item].title + "'>";
    }
    document.getElementById("notelist").innerHTML = output;
    $("#notelist input").each(function(i){
      $(this).on("click",{x:i}, function(event){
        current = event.data.x;
        $("#notelist input").each(function(i){
          $(this).css("background-color", "gray");
        });
        $(this).css("background-color", "white");
        showNote();
      });
      $(this).on("keypress",function(event){
        notes[current].title = $(this).val() + String.fromCharCode(event.which);
      });

    });
  };

  var showNote = function(){
    document.getElementById("content").value = notes[current].text;
    document.getElementById("content").style.backgroundColor = notes[current].color;
    $("#note").show();
  }

  $("#clear").on("click", function(event) {
    notes = [];
    localStorage.removeItem("notes");
    showNotes();
    clearNote();
  });

  $("#default").on("click", function(event) {
    notes = notes_default;
    localStorage.removeItem("notes");
    showNotes();
  });

  var clearNote = function(){
    $("#note").hide();
  }

  $("#content").on("keypress", function(event) {
    notes[current].text = $(this).val() + String.fromCharCode(event.which);
    //console.log("note " + current + ": " + notes[current].text);
  });


  // Add button: add a new note
  $("#add").on("click", function(event) {
  notes.push(new note());
  current = notes.length - 1;
  //console.log("New note added with index " + current);
  showNotes();
  $("#notelist input:last").css("background-color", "white");
  showNote();
  });

  // Delete button
  $("#del").on("click", function(event) {
    notes.splice(current, 1);
    showNotes();
    clearNote();
  });

  var changeColor = function(c) {
    notes[current].color = c;
    showNote();
  }
  // Color buttons: change the note color
  $("#r").on("click", function(event) {
    changeColor("red");
  });
  $("#b").on("click", function(event) {
    changeColor("blue");
  });
  $("#y").on("click", function(event) {
    changeColor("yellow");
  });
  $("#w").on("click", function(event) {
    changeColor("white");
  });
  init();
}
$(document).ready(main);
