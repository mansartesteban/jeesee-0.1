class Inputs {
  collector: string[] = [];

  constructor(context: Element) {
    context.addEventListener("keydown", (e) => {
      e.preventDefault();
      let key = (e as KeyboardEvent).key.toLowerCase();
      if (!this.collector.includes(key) && !["dead"].includes(key)) {
        this.collector.push(key);
      }
    });
    context.addEventListener("keyup", (e) => {
      e.preventDefault();
      let foundIndex = this.collector.findIndex(
        (key) => key === (e as KeyboardEvent).key.toLowerCase()
      );
      if (foundIndex >= 0) {
        this.collector.splice(foundIndex, 1);
      }
    });
  }
}

export default Inputs;
