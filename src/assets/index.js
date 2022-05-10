import createMainPage from './assets/components/create-page';

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
const arrKeySystem = [
  'Backspace',
  'Tab',
  'Del',
  'CapsLock',
  'Enter',
  'Shift',
  'Ctrl',
  'Alt',
  'Win',
  'Space',
];

function switchKey(e, renStandart, renShift, renCapsLock, renShiftCapsLock) {
  let res;
  if (e.isTrusted) {
    res = e.currentTarget;
  } else {
    res = e;
  }

  if (
    capsLock.contains(res)
      && !capsLock.classList.contains('active')
      && !shiftLeft.classList.contains('active')
      && !shiftRight.classList.contains('active')
  ) {
    renStandart.forEach((el) => el.classList.add('hide'));
    renCapsLock.forEach((el) => el.classList.remove('hide'));
    renShift.forEach((el) => el.classList.add('hide'));
    renShiftCapsLock.forEach((el) => el.classList.add('hide'));
  } else if (
    capsLock.contains(res)
      && capsLock.classList.contains('active')
      && !shiftLeft.classList.contains('active')
      && !shiftRight.classList.contains('active')
  ) {
    renStandart.forEach((el) => el.classList.remove('hide'));
    renCapsLock.forEach((el) => el.classList.add('hide'));
    renShift.forEach((el) => el.classList.add('hide'));
    renShiftCapsLock.forEach((el) => el.classList.add('hide'));
  } else if (
    capsLock.contains(res)
      && !capsLock.classList.contains('active')
      && (shiftLeft.classList.contains('active')
      || shiftRight.classList.contains('active'))
  ) {
    renStandart.forEach((el) => el.classList.add('hide'));
    renCapsLock.forEach((el) => el.classList.add('hide'));
    renShift.forEach((el) => el.classList.add('hide'));
    renShiftCapsLock.forEach((el) => el.classList.remove('hide'));
  } else if (
    capsLock.contains(res)
      && capsLock.classList.contains('active')
      && (shiftLeft.classList.contains('active')
      || shiftRight.classList.contains('active'))
  ) {
    renStandart.forEach((el) => el.classList.add('hide'));
    renCapsLock.forEach((el) => el.classList.add('hide'));
    renShift.forEach((el) => el.classList.add('hide'));
    renShiftCapsLock.forEach((el) => el.classList.remove('hide'));
  }

  if (
    (shiftLeft.contains(res)
      || shiftRight.contains(res))
      && !shiftLeft.classList.contains('active')
      && !shiftRight.classList.contains('active')
      && !capsLock.classList.contains('active')
  ) {
    renStandart.forEach((el) => el.classList.add('hide'));
    renCapsLock.forEach((el) => el.classList.add('hide'));
    renShift.forEach((el) => el.classList.remove('hide'));
    renShiftCapsLock.forEach((el) => el.classList.add('hide'));
  } else if (
    (shiftLeft.contains(res)
      || shiftRight.contains(res))
      && (shiftLeft.classList.contains('active')
      || shiftRight.classList.contains('active'))
      && !capsLock.classList.contains('active')
  ) {
    renStandart.forEach((el) => el.classList.remove('hide'));
    renCapsLock.forEach((el) => el.classList.add('hide'));
    renShift.forEach((el) => el.classList.add('hide'));
    renShiftCapsLock.forEach((el) => el.classList.add('hide'));
  } else if (
    (shiftLeft.contains(res)
      || shiftRight.contains(res))
      && !shiftLeft.classList.contains('active')
      && !shiftRight.classList.contains('active')
      && capsLock.classList.contains('active')
  ) {
    renStandart.forEach((el) => el.classList.add('hide'));
    renCapsLock.forEach((el) => el.classList.add('hide'));
    renShift.forEach((el) => el.classList.add('hide'));
    renShiftCapsLock.forEach((el) => el.classList.remove('hide'));
  } else if (
    (shiftLeft.contains(res)
      || shiftRight.contains(res))
      && (shiftLeft.classList.contains('active')
      || shiftRight.classList.contains('active'))
      && capsLock.classList.contains('active')
  ) {
    renStandart.forEach((el) => el.classList.add('hide'));
    renCapsLock.forEach((el) => el.classList.remove('hide'));
    renShift.forEach((el) => el.classList.add('hide'));
    renShiftCapsLock.forEach((el) => el.classList.add('hide'));
  }
}

function switchKeyboard(e) {
  if (lang === 'en') {
    switchKey(e, enStandart, enShift, enCapsLock, enShiftCapsLock);
  }
  if (lang === 'ru') {
    switchKey(e, ruStandart, ruShift, ruCapsLock, ruShiftCapsLock);
  }
}

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
    if (
      textarea.selectionStart === textarea.selectionEnd
        && textarea.selectionStart !== 0
    ) {
      textarea.selectionStart -= 1;
      return '';
    }
  }
  return '';
};

function upShift(e) {
  switchKeyboard(e);
  e.currentTarget.removeEventListener('mouseup', upShift);
  e.currentTarget.removeEventListener('mouseleave', upShift);
  e.currentTarget.classList.remove('active');
}
function downShift(e) {
  switchKeyboard(e);
  e.currentTarget.classList.add('active');
  e.currentTarget.addEventListener('mouseup', upShift);
  e.currentTarget.addEventListener('mouseleave', upShift);
}

function writeText(e) {
  textarea.focus();
  let symbol = '';
  const elCurrent = e.currentTarget.classList[1];

  if (elCurrent === 'ShiftLeft' || elCurrent === 'ShiftRight') {
    return;
  }
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
  }
}
shiftLeft.addEventListener('mousedown', downShift);
shiftRight.addEventListener('mousedown', downShift);
keyElement.forEach((el) => el.addEventListener('click', writeText));

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

function writeTextRealKeyboard(e) {
  textarea.focus();
  let symbol = '';
  const res = keyElement.find((el) => el.classList.contains(e.code));

  if (arrKeySystem.indexOf(res.outerText) === -1) {
    symbol = res.outerText;
  } else {
    symbol = useSystemKey(res.outerText);
  }
  textarea.setRangeText(symbol, textarea.selectionStart, textarea.selectionEnd, 'end');
  textarea.focus();

  switchKeyboard(res);
  if (e.code === 'CapsLock') {
    capsLock.classList.toggle('active');
  }
}

function realKeyboardDown(e) {
  e.preventDefault();
  const codeRealKeyboard = e.code;
  if (codeRealKeyboard === 'CapsLock' && e.repeat) {
    return;
  }
  if (codeRealKeyboard === 'ShiftLeft' && e.repeat) {
    return;
  }
  if (codeRealKeyboard === 'ShiftRight' && e.repeat) {
    return;
  }
  if (codeRealKeyboard === 'ControlLeft' && e.repeat) {
    return;
  }

  writeTextRealKeyboard(e);

  if (codeRealKeyboard !== 'CapsLock') {
    keyElement.forEach((el) => {
      if (el.classList.contains(codeRealKeyboard)) {
        el.classList.add('active');
      }
    });
  }
}

function realKeyboardUp(e) {
  e.preventDefault();
  const codeRealKeyboard = e.code;
  if (
    codeRealKeyboard === 'ShiftLeft'
      && controlLeft.classList.contains('active')
  ) {
    if (lang === 'en') {
      lang = 'ru';
    } else {
      lang = 'en';
    }
    switchLangKey(lang);
    return;
  }
  const res = keyElement.find((el) => el.classList.contains(e.code));

  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    switchKeyboard(res);
  }
  if (codeRealKeyboard !== 'CapsLock') {
    keyElement.forEach((el) => {
      if (el.classList.contains(codeRealKeyboard)) {
        el.classList.remove('active');
      }
    });
  }
}

window.addEventListener('keydown', realKeyboardDown);
window.addEventListener('keyup', realKeyboardUp);

function setLocalStorage() {
  localStorage.clear();
  localStorage.setItem('lang', JSON.stringify(lang));
  localStorage.setItem('stateTextarea', JSON.stringify(textarea.value));
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    lang = JSON.parse(localStorage.getItem('lang'));
    switchLangKey(lang);
  }
  if (localStorage.getItem('stateTextarea')) {
    textarea.value = JSON.parse(localStorage.getItem('stateTextarea'));
  }
}
window.addEventListener('load', getLocalStorage);
