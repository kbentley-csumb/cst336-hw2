



var gridSize = 10;

var gameMatrix = [];


function startGame() {
    //Get the size
    gridSize = $("#gridSize").val();
    var gameDiv = $("#game");
    $("#gamesetup").hide();
    $("#game").empty();
    var gameTable = "<table cols ='" + gridSize + "'>";
    for(var row=0;row<gridSize;row++) {
        gameTable += "<tr>\n";
        for(var col=0;col<gridSize;col++) {
            gameTable += "<td>";
            gameTable += "<img src='img/empty.png' onclick='cellClick(event,this)' id='" + row + "_" + col + "'>\n";
            gameTable += "</td>\n";
        }
        gameTable += "</tr>\n";
    }
    $("#game").append(gameTable);
    $("#game").show();

}

function cellClick(event,img) {
    if (event.shiftKey) {
        console.log("Shift-clicked on " + $(img).attr("id"));
        $(img).attr("src","img/flag.png");
    }
    else {
        console.log("Clicked on " + $(img).attr("id"));
    }
}