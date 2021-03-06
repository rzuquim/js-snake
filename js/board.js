let createBoard = (document, size) => {
  let board = {
    size: size,
  };

  board.render = (score = 0) => {
    let rendered = "";
    for (let x = 0; x < size; x++) {
      rendered += "<tr>";
      for (let y = 0; y < size; y++) {
        rendered += `<td id="${y}:${x}"> </td>`;
      }
    }
    document.getElementById("board").innerHTML = rendered;
    document.getElementById("score").innerHTML = `score: ${score}`;
  };

  board.renderSnake = (snake) => {
    let headSquare = document.getElementById(
      `${snake.position.x}:${snake.position.y}`
    );
    headSquare.className = "snakeHead";

    //tail
    snake.tail.forEach((tail) => {
      let tailSquare = document.getElementById(`${tail.x}:${tail.y}`);
      tailSquare.className = "snakeTail";
    });
  };

  board.renderHelp = (keyBindings) => {
    document.getElementById("help").innerHTML = `
      <tr>
        <td></td>
        <td><span class="keyboardKey">${keyBindings.up}</span></td>
        <td></td>
      </tr>
      <tr>
        <td><span class="keyboardKey">${keyBindings.left}</span></td>
        <td><span class="keyboardKey">${keyBindings.down}</span></td>
        <td><span class="keyboardKey">${keyBindings.right}</span></td>
      </tr>`;
  };

  // food
  let food = { eaten: true };

  board.currentFood = () => {
    if (!food.eaten) return food;

    let notSnake = [];
    for (let i = 0; i < board.size; i++)
      for (let j = 0; j < board.size; j++) {
        const position = { x: i, y: j };
        if (!snake.isIn(position)) notSnake.push(position);
      }

    let validFoodPosition = notSnake[random.int(0, notSnake.length)];

    return (food = {
      x: validFoodPosition.x,
      y: validFoodPosition.y,
      eaten: false,
    });
  };

  board.renderFood = (food) => {
    let foodSquare = document.getElementById(`${food.x}:${food.y}`);
    foodSquare.className = "food";
  };

  return board;
};
