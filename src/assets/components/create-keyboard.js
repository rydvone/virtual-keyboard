import dataKeyList from './keyboard-list-data.js';
import dataKeyRowList from './keyboard-list.js';

class ButtonContent {
  constructor(state, stateId, id, tagAppend, data) {
    this.state = state;
    this.stateId = stateId;
    this.id = id;
    this.tagAppend = tagAppend;
    this.data = data;
  }

  createKeyboardButton() {
    const tagSpan = document.createElement('span');
    tagSpan.classList.add(`${this.stateId}`);
    if (this.state !== `${this.stateId}`) {
      tagSpan.classList.add('hide');
    }
    tagSpan.innerHTML = this.data[this.stateId][this.id];
    this.tagAppend.append(tagSpan);
  }
}

const getKeyboardContainer = () => {
  const keyboardContainer = document.querySelector('.keyboard');
  keyboardContainer.innerHTML = '';
  return keyboardContainer;
};

function createKeyboard(state) {
  const keyboard = getKeyboardContainer();

  dataKeyRowList.forEach((el) => {
    const elRow = document.createElement('div');
    elRow.classList.add('row');
    keyboard.append(elRow);

    el.forEach((elInner) => {
      const elButton = document.createElement('div');
      elButton.classList.add('key');
      elButton.classList.add(`${elInner}`);
      elRow.append(elButton);

      const keys = Object.keys(dataKeyList);
      keys.forEach((key) => {
        const obj1 = new ButtonContent(state, key, elInner, elButton, dataKeyList);
        obj1.createKeyboardButton();
      });
    });
  });
}

export default createKeyboard;
