var main = function() {
"use strict";

var current;
var notes = [
{"title": "Note", "text": "Test", "color": "red"},
{"title": "Note again", "text": "Another note", "color": "blue"},
{"title": "Note more", "text": "One more note", "color": "yellow"}];

var note = function(){
this.title = "New note";
this.text = "Add text here";
this.color = "white";
}

var showNotes = function(){
  var output = "";
  for(var item in notes){
    output += "<li>";
    output += notes[item].title;
    output += "</li>";
  }
  document.getElementById("notelist").innerHTML = output;
  $("#notelist li").each(function(i){
    $(this).on("click",{x:i}, function(event){
      console.log("Item " + event.data.x + " selected");
      current = event.data.x;
      showNote();
    });
  });
};

var showNote = function(){
  var title = document.getElementById("title");
  title.value = notes[current].title;
  //$("#title").innerHTML = notes[current].title;
  document.getElementById("content").value = notes[current].text;
  document.getElementById("content").style.backgroundColor = notes[current].color;
  $("#note").show();
}

var clearNote = function(){
  $("#note").hide();
}
// Update title and content
$("#title").change(function(event) {
  notes[current].title = $(this).val();
  showNotes();
});
$("#content").on("keypress", function(event) {
  notes[current].text = $(this).val();
  console.log("note " + current + ": " + notes[current].text);
});

// Add button: add a new note
$("#add").on("click", function(event) {
notes.push(new note());
current = notes.length - 1;
console.log("New note added with index " + current);
showNotes();
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
showNotes();
clearNote();
}
$(document).ready(main);
