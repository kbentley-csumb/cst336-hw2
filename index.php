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
        <div id="pageContainer">
    <main>
    <h1>Minesweep</h1>
    <h4>Your job is to clear the sea of underwater mines, so the ships can safely pass through. <br/><br/>
    Click on a cell to explore it. Shift-click to mark a cell as potentially having a mine. You win the game when you explore all of the cells that don't have a mine, you lose if you click on a cell with a mine.
        <br/>If a cell touches one or more mines, the number touching the cell will be shown. Diagnol/Corner mines are considered as touching.
    </h4>
    <div id="gamesetup">
        &nbsp;<input type="text" id="gridSize" value=10 max-width="30px"> &nbsp;
        <select id="gameDifficulty">
            <option value="0.1">Easy</option>
            <option value="0.2">Medium</option>
            <option value="0.4">Hard</option>
            <option value="0.8">Impossible</option>
        </select>
        &nbsp;
        <button id="startGameBtn" onclick="startGame()">Start Game</button>
    </div>
    <div id="gameStatus"> 
        
    </div>
    <br/>
    <div display="none" id="game">

    </div>
    <br/>
    <button id="cheatBtn" onclick="cheat()" >Cheat</button>
    </main>
    <script src="js/minesweep.js"> </script>

    <footer>
        <br/>
        <br/>
            <h3>CST336 Internet Programming.</h3> <br/>
            <details>
            <summary>Background Image</summary>
              Background image from <a href="https://www.pexels.com/photo/sea-boat-ship-high-dynamic-range-15810/">https://www.pexels.com/photo/sea-boat-ship-high-dynamic-range-15810/</a><br>
            </details>
            2019&copy; Kevin Bentley<br/>
            <strong>Disclaimer</strong> This information is only for academic purposes. The information herein, while accurate, may be incomplete.
                <br/>
                <br/>
                <img src="img/otter-small.jpg" alt="Otter Logo" />
        </footer>
    </div> <!--pageContainer-->
    </body>
</html>