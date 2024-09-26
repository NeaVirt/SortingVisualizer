class SortingVisualizer {
  constructor(size, container) {
    this.container = container;
    this.size = size;
    this.array = this.generateRandomArray(this.size);
    this.generateBars(this.array, container);
    this.timeoutId = null;
    this.isAnimating = false;
    this.swapSound = new Audio("swoosh.mp3");
  }

  startSorting(type) {
    if (this.isAnimating) {
      this.stopAnimation();
    }
    this.array = this.generateRandomArray(this.size);
    this.generateBars(this.array, this.container);
    this.resetBars();

    const arrayCopy = [...this.array];
    let swaps;

    if (type === "bubble") {
      swaps = this.bubbleSort(arrayCopy);
    } else if (type === "insertion") {
      swaps = this.insertionSort(arrayCopy);
    }
    this.isAnimating = true;
    this.animate(swaps);
  }

  animate(swaps) {
    if (swaps.length == 0) {
      this.isAnimating = false;

      return;
    }
    const indices = swaps.shift();
    this.swapChildren(indices, this.container.children);

    this.timeoutId = setTimeout(() => {
      this.animate(swaps);
    }, 250);
  }

  swapChildren([left, right], children) {
    const barLeft = children[left];
    const barRight = children[right];

    this.container.insertBefore(barRight, barLeft);

    this.playSwapSound();
  }

  playSwapSound() {
    this.swapSound.currentTime = 0;
    this.swapSound.play();
  }

  bubbleSort(array) {
    const swaps = [];
    let somethingChanged;
    do {
      somethingChanged = false;
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
          [array[i - 1], array[i]] = [array[i], array[i - 1]];
          swaps.push([i - 1, i]);
          somethingChanged = true;
        }
      }
    } while (somethingChanged);
    return swaps;
  }

  insertionSort(array) {
    const swaps = [];

    for (let i = 1; i < array.length; i++) {
      let j = i;
      while (j > 0 && array[j - 1] > array[j]) {
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
        swaps.push([j - 1, j]);
        j--;
      }
    }
    return swaps;
  }

  generateRandomArray(size) {
    const array = new Array(size);
    for (let i = 0; i < size; i++) {
      array[i] = Math.random(); // between 0 and 1
    }
    return array;
  }

  generateBars(array, container) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = array[i] * 100 + "%";
      container.appendChild(bar);
    }
  }

  resetBars() {}

  stopAnimation() {
    clearTimeout(this.timeoutId);
    this.isAnimating = false;
  }
}
