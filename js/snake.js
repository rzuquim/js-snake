let createSnake = (board, startSize = 3) => {
  let snake = {
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    tail: [],
    size: startSize,
  };

  snake.spawn = () => {
    let startPosition = {
      x: random.int(snake.size, board.size - snake.size),
      y: random.int(snake.size, board.size - snake.size),
    };
    snake.position = startPosition;

    //velocity
    let randomAxis = random.coinFlip("x", "y");
    let distanceFromAxis = startPosition[randomAxis];
    let distanceToAxisEnd = board.size - startPosition[randomAxis];

    snake.velocity[randomAxis] = distanceFromAxis < distanceToAxisEnd ? 1 : -1;

    //set tail
    let stillAxis = randomAxis == "x" ? "y" : "x";
    for (let i = 1; i < snake.size + 1; i++) {
      let tailSegment = {};
      tailSegment[randomAxis] =
        startPosition[randomAxis] + i * -snake.velocity[randomAxis];
      tailSegment[stillAxis] = startPosition[stillAxis];
      snake.tail.push(tailSegment);
    }

    board.renderSnake(snake);
  };

  return snake;
};
