<!DOCTYPE html>
<html>
    <head>
        <title>Minesweep</title>
        <link  href="css/styles.css" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    <h1>Minesweep</h1>
    <h4>Click on a cell to explore it. Shift-click to mark a cell as potentially having a mine. You win the game when you explore all of the cells that don't have a mine, you lose if you click on a cell with a mine.
    </h4>
    <div id="gamesetup">
        &nbsp;<input type="number" id="gridSize" value=10> &nbsp;
        <select id="gameDifficulty">
            <option value="0.1">Easy</option>
            <option value="0.2">Medium</option>
            <option value="0.4">Hard</option>
            <option value="0.8">Impossible</option>
        </select>
        <button id="startGameBtn" onclick="startGame()">Start Game</button>
    </div>
    <div id="gameStatus"> 
        
    </div>
    <div display="none" id="game">

    </div>
    <button id="cheatBtn" onclick="cheat()" >Cheat</button>
    
    <script src="js/minesweep.js"> </script>
    </body>
</html>