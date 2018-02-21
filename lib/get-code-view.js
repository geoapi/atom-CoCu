'use babel';

export default class GetCodeView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('get-code');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The GetCode package is working! It\'s working!';
    message.classList.add('message');
    this.element.appendChild(message);
  // CODE-ANNOTATION: testing
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  setCount(count) {
    const displayText = `you have selected ${count} `;
    this.element.children[0].textContent = displayText;
  }


}
