



var gridSize = 10;

var gameMatrix = [];

function setupMines() {
    // 20% of the cells will have mines
    var pct = 0.1;
    for(var row=0;row<gridSize;row++) {
        var rowArray = []
        for(var col=0;col<gridSize;col++) {
            rndNum = Math.random();
            if(rndNum < pct) {
                rowArray.push('x');//'x' is a mine
            }
            else {
                rowArray.push(' ');//space is clear. 'f' is a flag
            }
        }
        gameMatrix.push(rowArray);
    }
}

function unCheat() {
    for(var row=0;row<gridSize;row++) {
        for(var col=0;col<gridSize;col++) {
            var cellId = "#" + row + "_" + col;
            if(gameMatrix[row][col]=='*') {
                $(cellId).attr("src","img/flag.png");
                gameMatrix[row][col] = 'x';
            }
            else if(gameMatrix[row][col]=='x') {
                $(cellId).attr("src","img/orange.png");
            }
        }
    }
    $("#cheatBtn").show();
}

function cheat() {
    $("#cheatBtn").hide();
    for(var row=0;row<gridSize;row++) {
        for(var col=0;col<gridSize;col++) {
            if(gameMatrix[row][col]=='x') {
                var cellId = "#" + row + "_" + col;
                //We're going to change the game matrix to an * for any mine that
                //the user flagged already, so we can switch it back to a flag after a timer pops
                if($(cellId).attr("src")=="img/flag.png") {
                    gameMatrix[row][col] = "*"
                }
                $(cellId).attr("src","img/mine.png");
            }
        }
    }
    setTimeout('unCheat()',2000);
}

function countNeighborMines(row, col) {
    //There are 8 possible neighbors with mines:
    /*
        123
        4X5
        678

        x is gameMatrix[row][col]
        we don't want to look for mines out of the grid
    */
    var neighborMineCount = 0;
    for(var checkRow = row-1; checkRow <= row+1; checkRow++) {
        //If x is on the top or bottom row, skip
        if(checkRow >= 0 && checkRow < gridSize) {            
            for(var checkCol = col-1; checkCol <= col+1; checkCol++) {
                //If x is on the left or right side, skip
                if(checkCol >= 0 && checkCol < gridSize) {
                    // Don't count the clicked on row
                    if(checkRow==row && checkCol==col) {
                        continue;
                    }
                    //Is it a flag?
                    if(gameMatrix[checkRow][checkCol]=='x') {
                        neighborMineCount++;
                    }
                }
            }
        }
    }
    return neighborMineCount;
}

function startGame() {
    $("#cheatBtn").css("display","block");
    gridSize = $("#gridSize").val();
    var gameDiv = $("#game");
    $("#gamesetup").hide();
    $("#game").empty();
    var gameTable = "<table cols ='" + gridSize + "'>";
    for(var row=0;row<gridSize;row++) {
        gameTable += "<tr>\n";
        for(var col=0;col<gridSize;col++) {
            gameTable += "<td>";
            gameTable += "<img src='img/orange.png' onclick='cellClick(event,this)' id='" + row + "_" + col + "'>\n";
            gameTable += "</td>\n";
        }
        gameTable += "</tr>\n";
    }
    $("#game").append(gameTable);
    $("#game").show();
    setupMines();
}

function cellClick(event,img) {
    var elementId = $(img).attr("id");
    var parts = elementId.split("_");
    var row = parseInt(parts[0]);
    var col = parseInt(parts[1]);

    if (event.shiftKey) {
        console.log("Shift-clicked on " + $(img).attr("id"));
        //if(gameMatrix[row][col]=='x') {
        if($(img).attr("src")=="img/flag.png") {
            $(img).attr("src","img/orange.png");
        } else {
            $(img).attr("src","img/flag.png");
        }
    }
    else {
        //Parse the row/col from the id

        //countNeighborMines(row,col);
        
        if(gameMatrix[row][col]=='x') {
            $("#gameStatus").empty();
            $("#gameStatus").append("<h2>You Lost!</h2>");
            $(img).attr("src","img/mine.png");
            return;
        }
        var numMines = countNeighborMines(row,col);
        if(numMines==0) {
            $(img).attr("src","img/empty.png");
        }
        else {
            $(img).attr("src","img/" + numMines + ".png");
        }
        $(img).attr("onclick","none");
        /*
        for(var i=0;i<parts.length;i++) {
            console.log("Clicked on " + $(img).attr("id"));
        }
        */
    }
}