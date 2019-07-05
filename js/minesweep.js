var gridSize = 10;
var gameActive = false;
var gameMatrix = [];
var gameDifficulty = 0.1;

function setupMines() {
    for(var row=0;row<gridSize;row++) {
        var rowArray = []
        for(var col=0;col<gridSize;col++) {
            rndNum = Math.random();
            if(rndNum < gameDifficulty) {
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
    gameActive = true;
}

function cheat() {
    gameActive = false;
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
    $("#cheatBtn").css("display","inline-block");
    gridSize = parseInt($("#gridSize").val());
    gameDifficulty = $("#gameDifficulty").val();
    var gameDiv = $("#game");
    $("#gamesetup").hide();
    $("#game").empty();
    var gameTable = "<table align='center' id='gameTable' cols ='" + gridSize + "'>";
    for(var row=0;row<gridSize;row++) {
        gameTable += "<tr class='mineRow'>\n";
        for(var col=0;col<gridSize;col++) {
            gameTable += "<td class='mineCell'>";
            gameTable += "<img src='img/orange.png' onclick='cellClick(event,this)' class='gameIcon' id='" + row + "_" + col + "'>\n";
            gameTable += "</td>\n";
        }
        gameTable += "</tr>\n";
    }
    $("#game").append(gameTable);
    $("#game").show();
    setupMines();
    gameActive = true;
}

function detectWin() {
    // If any non-mines haven't been explored, the game hasn't been won
    for(var row=0;row<gridSize;row++) {
        for(var col=0;col<gridSize;col++) {
            var cellId = "#" + row + "_" + col;
            if(gameMatrix[row][col]==' ') {
                var cellIcon = $(cellId).attr("src");
                if((cellIcon=="img/orange.png")||(cellIcon=="img/flag.png")) {
                    return false;
                }
            }
        }
    }
    return true;
}

function clearEmptyNeighbors(row,col) {
    var clearedSomething = false;
    var cellId = "#" + row + "_" + col;
    var cellIcon = $(cellId).attr("src");
    if(cellIcon!="img/empty.png") {
        return false;
    }
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
                    if(gameMatrix[checkRow][checkCol]==' ') {
                        if(countNeighborMines(checkRow,checkCol)==0) {
                            var cellId = "#" + checkRow + "_" + checkCol;
                            cellIcon = $(cellId).attr("src");
                            if(cellIcon!="img/empty.png") {
                                $(cellId).attr("src","img/empty.png");
                                clearedSomething = true;
                            }
                        }
                    }
                }
            }
        }
    }
    return clearedSomething;
}

// Scans the board for cells that are already empty, and makes sure any
// that any cells touching other empty cells are cleared
function sweepForEmptyNeighbors() {
    for(var row=0;row<gridSize;row++) {
        for(var col=0;col<gridSize;col++) {
            var cellId = "#" + row + "_" + col;
            if(gameMatrix[row][col]==' ') {
                var cellIcon = $(cellId).attr("src");
                if(cellIcon=="img/empty.png") {
                    var neighborMineCount = countNeighborMines(row,col);
                    if(neighborMineCount==0) {
                        //If we clear something, we need to start at the beginning
                        var restart = clearEmptyNeighbors(row,col);
                        if(restart) {
                            //hack to restart the scan, we'll reset row to -1 and break out of the col loop
                            row = -1;
                            break;
                        }
                    }
                }
            }
        }
    }
}

function cellClick(event,img) {
    if(!gameActive) {
        return;
    }
    var elementId = $(img).attr("id");
    var parts = elementId.split("_");
    var row = parseInt(parts[0]);
    var col = parseInt(parts[1]);

    if (event.shiftKey) {
        console.log("Shift-clicked on " + $(img).attr("id"));
        if($(img).attr("src")=="img/flag.png") {
            $(img).attr("src","img/orange.png");
        } else {
            $(img).attr("src","img/flag.png");
        }
    }
    else {
        //Parse the row/col from the id       
        if(gameMatrix[row][col]=='x') {
            $("#gameStatus").empty();
            $("#gameStatus").append("<h2>You Lost!</h2>");
            $("#gameStatus").append("<button id='reloadBtn' onclick='location.reload()'>Play Another Game</button>");
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
        // Disable future clicks on this cell
        $(img).attr("onclick","none");        
    }
    sweepForEmptyNeighbors();
    if(detectWin()) {
        $("#gameStatus").empty();
        $("#gameStatus").append("<h2>You Won the Game!!</h2>");
        $("#gameStatus").append("<button id='reloadBtn' onclick='location.reload()'>Play Another Game</button>");
        gameActive = false;
    }
}