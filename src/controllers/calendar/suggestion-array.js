export class SuggestionArray extends Array {

  constructor(array) {
    super(...array);
    this.currentIndex = -1;
  }

  [Symbol.iterator]() {
    let index = -1;

    return {
      next: () => {
        const hasNextValue = index <= this.length - 1;

        if (hasNextValue) {
          index++;
        } else {
          index = 0;
        }

        return {
          value: this[index],
          done: false
        }
      }
    }
  }
}
