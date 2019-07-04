# cst336-hw2

Minesweep clone


Ask the user for the grid size (n)
Ask the user for how many mines there should be (m)

create a table of width/height n
- Use id='row_col' for each cell, with an onclick(this)
- initialize each cell to a blank image
- randomly distribute mines
- When the user clicks on a box, if it is a mine, game over
- Shift-click toggles a flag icon
- if not, count how many neighbor cells have a mine and display that number in the cell
- once all cells without a mine have been clicked, the player wins
