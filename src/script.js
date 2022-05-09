// import keyboardSubscribe from "./assets/components/keyboard-subcribe.js";
import createMainPage from './assets/components/create-page.js';
// import createKeyboard from "./assets/components/create-keyboard.js";
// import dataKeyList from "./assets/components/keyboard-list-data.js";
// import dataKeyRowList from "./assets/components/keyboard-list.js";

let lang = 'en';
const state = 'enStandart';
createMainPage(state);

const capsLock = document.querySelector('.CapsLock');
const shiftLeft = document.querySelector('.ShiftLeft');
const shiftRight = document.querySelector('.ShiftRight');
const controlLeft = document.querySelector('.ControlLeft');
const enStandart = [...document.querySelectorAll('.enStandart')];
const enShift = [...document.querySelectorAll('.enShift')];
const enCapsLock = [...document.querySelectorAll('.enCapsLock')];
const enShiftCapsLock = [...document.querySelectorAll('.enShiftCapsLock')];
const ruStandart = [...document.querySelectorAll('.ruStandart')];
const ruShift = [...document.querySelectorAll('.ruShift')];
const ruCapsLock = [...document.querySelectorAll('.ruCapsLock')];
const ruShiftCapsLock = [...document.querySelectorAll('.ruShiftCapsLock')];
const textarea = document.querySelector('.textarea');
const keyElement = [...document.querySelectorAll('.key')];
const arrKeySystem = ['Backspace', 'Tab', 'Del', 'CapsLock', 'Enter', 'Shift', 'Ctrl', 'Alt', 'Win', 'Space'];

function switchKey(e, renStandart, renShift, renCapsLock, renShiftCapsLock) {
  if ((shiftLeft.contains(e.target) || shiftRight.contains(e.target))
    && !(capsLock.classList.contains('active'))) {
    renStandart.forEach((el) => el.classList.toggle('hide'));
    renShift.forEach((el) => el.classList.toggle('hide'));
  }

  if ((capsLock.contains(e.currentTarget)) && (shiftLeft.classList.contains('active') || shiftRight.classList.contains('active'))) {
    renShift.forEach((el) => el.classList.toggle('hide'));
    renShiftCapsLock.forEach((el) => el.classList.toggle('hide'));
  }

  if ((shiftLeft.contains(e.target) || shiftRight.contains(e.target))
    && (capsLock.classList.contains('active'))) {
    renCapsLock.forEach((el) => el.classList.toggle('hide'));
    renShiftCapsLock.forEach((el) => el.classList.toggle('hide'));
  }

  if (capsLock.contains(e.target) && !(shiftLeft.classList.contains('active')) && !(shiftRight.classList.contains('active'))) {
    renStandart.forEach((el) => el.classList.toggle('hide'));
    renCapsLock.forEach((el) => el.classList.toggle('hide'));
  }
}

const switchKeyboard = (e) => {
  if (lang === 'en') {
    switchKey(e, enStandart, enShift, enCapsLock, enShiftCapsLock);
  }
  if (lang === 'ru') {
    switchKey(e, ruStandart, ruShift, ruCapsLock, ruShiftCapsLock);
  }
};

const useSystemKey = (keySystem) => {
  if (keySystem === 'Tab') {
    return '\t';
  }
  if (keySystem === 'Space') {
    return ' ';
  }
  if (keySystem === 'Enter') {
    return '\n';
  }
  if (keySystem === 'Del') {
    if (textarea.selectionStart === textarea.selectionEnd) {
      textarea.selectionEnd += 1;
      return '';
    }
  }
  if (keySystem === 'Backspace') {
    if (textarea.selectionStart === textarea.selectionEnd
      && textarea.selectionStart !== 0) {
      textarea.selectionStart -= 1;
      return '';
    }
  }
  return '';
};

function writeText(e) {
  textarea.focus();
  let symbol = '';
  const elCurrent = e.currentTarget.classList[1];

  if (arrKeySystem.indexOf(e.srcElement.outerText) === -1) {
    symbol = e.srcElement.outerText;
  } else {
    symbol = useSystemKey(e.srcElement.outerText);
  }
  switchKeyboard(e);

  textarea.setRangeText(symbol, textarea.selectionStart, textarea.selectionEnd, 'end');
  textarea.focus();

  if (elCurrent === 'CapsLock') {
    capsLock.classList.toggle('active');
  } else {
    keyElement.forEach((el) => {
      if (el.classList.contains(elCurrent)) {
        el.classList.add('active');
      }
    });
  }
}

function delActive(e) {
  const elCurrent = e.currentTarget.classList[1];
  if (e.currentTarget.classList[1] === 'CapsLock') {
    return;
  }
  switchKeyboard(e);
  keyElement.forEach((el) => {
    if (el.classList.contains(elCurrent)) {
      el.classList.remove('active');
    }
  });
}

keyElement.forEach((el) => el.addEventListener('mousedown', writeText));
keyElement.forEach((el) => el.addEventListener('mouseup', delActive));

const arrEn = [enStandart, enCapsLock, enShift, enShiftCapsLock];
const arrRu = [ruStandart, ruCapsLock, ruShift, ruShiftCapsLock];

const switchLangKey = (curLang) => {
  if (curLang === 'ru') {
    arrEn.forEach((el) => {
      el.forEach((elInner) => elInner.classList.add('hide'));
    });

    if (capsLock.classList.contains('active')) {
      ruCapsLock.forEach((el) => el.classList.remove('hide'));
    } else {
      ruStandart.forEach((el) => el.classList.remove('hide'));
    }
  } else {
    arrRu.forEach((el) => {
      el.forEach((elInner) => elInner.classList.add('hide'));
    });

    if (capsLock.classList.contains('active')) {
      enCapsLock.forEach((el) => el.classList.remove('hide'));
    } else {
      enStandart.forEach((el) => el.classList.remove('hide'));
    }
  }
  shiftLeft.classList.remove('active');
};

function realKeyboardDown(e) {
  e.preventDefault();
  const codeRealKeyboard = e.code;
  if (codeRealKeyboard === 'CapsLock' && (e.repeat)) {
    return;
  }
  if (codeRealKeyboard === 'ShiftLeft' && (e.repeat)) {
    return;
  }
  if (codeRealKeyboard === 'ShiftRight' && (e.repeat)) {
    return;
  }
  if (codeRealKeyboard === 'ControlLeft' && (e.repeat)) {
    return;
  }
  keyElement.forEach((el) => {
    if (el.classList.contains(codeRealKeyboard)) {
      const event = new MouseEvent('mousedown');
      el.dispatchEvent(event);
    }
  });
}

function realKeyboardUp(e) {
  e.preventDefault();
  const codeRealKeyboard = e.code;
  if ((codeRealKeyboard === 'ShiftLeft' && controlLeft.classList.contains('active'))) {
    if (lang === 'en') {
      lang = 'ru';
    } else {
      lang = 'en';
    }
    switchLangKey(lang);
    return;
  }
  keyElement.forEach((el) => {
    if (el.classList.contains(codeRealKeyboard)) {
      const event = new MouseEvent('mouseup');
      el.dispatchEvent(event);
    }
  });
}

window.addEventListener('keydown', realKeyboardDown);
window.addEventListener('keyup', realKeyboardUp);

// }

function setLocalStorage() {
  // state = `${lang}Standart`;
  let stateCaps = '';
  if (capsLock.classList.contains('active')) {
    stateCaps = 'active';
  }
  localStorage.clear();
  localStorage.setItem('lang', JSON.stringify(lang));
  localStorage.setItem('stateTextarea', JSON.stringify(textarea.value));
  localStorage.setItem('stateCaps', JSON.stringify(stateCaps));
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('stateCaps')) {
    const stateCaps = JSON.parse(localStorage.getItem('stateCaps'));
    if (stateCaps === 'active') {
      capsLock.classList.add('active');
    }
  }
  if (localStorage.getItem('lang')) {
    lang = JSON.parse(localStorage.getItem('lang'));
    switchLangKey(lang);
  }
  if (localStorage.getItem('stateTextarea')) {
    textarea.value = JSON.parse(localStorage.getItem('stateTextarea'));
  }
}
window.addEventListener('load', getLocalStorage);
