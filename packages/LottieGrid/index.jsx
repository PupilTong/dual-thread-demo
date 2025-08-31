import './grid.css';

export function createLottieGrid(Container) {
  const LottieGrid = ({ size, render: Render }) => {
    const animationDelayMatrix = Array.from({ length: size }).map(() =>
      Array.from({ length: size }).fill(0)
    );
    // we count the edge elements from top-left to top-right to bottom-right to bottom-left to top-left
    for (let ii = 0; ii < size; ii++) {
      animationDelayMatrix[0][ii] = ii;
      animationDelayMatrix[ii][size - 1] = size - 1 + ii;
      animationDelayMatrix[size - 1][size - 1 - ii] = (size - 1) * 2 + ii;
      animationDelayMatrix[size - ii - 1][0] = (size - 1) * 3 + ii;
    }
    animationDelayMatrix[0][0] = 0;
    const offsetStep = 1 / ((size - 1) * 4);
    return (
      <Container
        className='lottie-grid'
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {new Array(size * size).fill(null).map((_, index) => {
          const row = Math.floor(index / size);
          const col = index % size;
          const isEdge = row === 0 || row === size - 1 || col === 0
            || col === size - 1;
          const delay = animationDelayMatrix[row][col] * offsetStep;
          return isEdge
            ? (
              <Container
                className='lottie-item-container'
                key={index}
                style={{
                  animation: isEdge ? undefined : 'none',
                  animationDelay: `${isEdge ? delay : 0}s`,
                }}
              >
                <Render i={index} />
              </Container>
            )
            : (
              <Container
                key={index}
                style={{ animation: 'none'}}
              >
              </Container>
            );
        })}
      </Container>
    );
  };
  return LottieGrid;
}
