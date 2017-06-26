var highlight = true; //if true, allow highlighting and movement, aka rest of this script

var start = document.getElementById('44');
start.focus();
start.style.backgroundColor = 'blue';
start.style.color = 'white';

function dotheneedful(sibling) {

    if (sibling != null && highlight) {
        start.focus();
        start.style.backgroundColor = '';
        start.style.color = '';
        sibling.focus();
        sibling.style.backgroundColor = 'blue';
        sibling.style.color = 'white';
        start = sibling;
    }
}
if (highlight) {
    document.onkeydown = checkKey;

}

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38' && start.id[0] != "0") {
        // up arrow
        var idx = start.cellIndex;
        var nextrow = start.parentElement.previousElementSibling;
        if (nextrow != null) {
            var sibling = nextrow.cells[idx];
            dotheneedful(sibling);
        }
    } else if (e.keyCode == '40') {
        // down arrow
        var idx = start.cellIndex;
        var nextrow = start.parentElement.nextElementSibling;
        if (nextrow != null) {
            var sibling = nextrow.cells[idx];
            dotheneedful(sibling);
        }
    } else if (e.keyCode == '37' && start.id[1] != "0") {
        // left arrow
        var sibling = start.previousElementSibling;
        dotheneedful(sibling);
    } else if (e.keyCode == '39') {
        // right arrow
        var sibling = start.nextElementSibling;
        dotheneedful(sibling);
    }
}

function deSelect() {
    highlight = false;
    start.focus();
    start.style.backgroundColor = '';
    start.style.color = '';
    var editable_elements = document.querySelectorAll("[contenteditable=true]");
    for (var i = 0; i < editable_elements.length; i++)
        editable_elements[i].setAttribute("contenteditable", false);
}

function resetSelect() {
    highlight = true;
    start.focus();
    start.style.backgroundColor = 'blue';
    start.style.color = 'white';
    var non_editable_elements = document.querySelectorAll("[contenteditable=false]");
    for (var i = 0; i < non_editable_elements.length; i++)
        non_editable_elements[i].setAttribute("contenteditable", true);
}