class ObserverList {
  constructor() {
    this.observerList = [];
  }

  add(obj) {
    this.observerList.push(obj);
  }

  count() {
    return this.observerList.length;
  }

  getObserver(index) {
    if (index > -1 && index < this.observerList.length) {
      return this.observerList[index];
    }
    return null;
  }

  indexOf(obj) {
    return this.ObserverList.indexOf(obj);
  }

  removeAt(index) {
    this.observerList.splice(index, 1);
  }
}

class Subject {
  constructor(node) {
    this.observers = new ObserverList();
    this.node = node;
  }

  addObserver(observer) {
    this.observers.add(observer);
  }

  removeObserver(observer) {
    this.observers.removeAt(this.observers.indexOf(observer));
  }

  notify(context) {
    this.observers.observerList.forEach((observer) => {
      observer.update(context);
    });
  }

  getNode() {
    return this.node;
  }
}

class Observer {
  constructor(node) {
    this.node = node;
  }

  getNode() {
    return this.node;
  }

  update(value) {
    this.getNode().checked = value;
  }
}

const runNewExample = () => {
  const controlCheckboxNode = document.getElementById('mainCheckbox');
  const addBtnNode = document.getElementById('addNewObserver');
  const containerNode = document.getElementById('observersContainer');

  // Concrete Subject

  // Extend the controlling checkbox with the Subject class
  const controlCheckbox = new Subject(controlCheckboxNode);

  // Clicking the checkbox will trigger notifications to its observers
  controlCheckbox.getNode().addEventListener('click', () => {
    controlCheckbox.notify(controlCheckbox.getNode().checked);
  });

  addBtnNode.addEventListener('click', addNewObserver);

  // Concrete Observer

  function addNewObserver() {
    // Create a new checkbox to be added
    let checkNode = document.createElement('input');
    checkNode.type = 'checkbox';

    // Extend the checkbox with the Observer class
    //extend(check, new Observer());
    let check = new Observer(checkNode);

    // Add the new observer to our list of observers
    // for our main subject
    controlCheckbox.addObserver(check);

    // Append the item to the container
    containerNode.appendChild(check.getNode());
  }
};

export { ObserverList, Subject, Observer, runNewExample };
