import createKeyboard from './create-keyboard';

function createMainPage(state) {
  document.body.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  document.body.prepend(wrapper);

  const header = document.createElement('div');
  header.classList.add('header');
  wrapper.append(header);

  const h1 = document.createElement('div');
  h1.classList.add('h1');
  h1.textContent = 'RSS Virtual Keyboard';
  header.append(h1);

  const main = document.createElement('div');
  main.classList.add('main');
  wrapper.append(main);

  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  textarea.rows = '7';
  textarea.cols = '42';
  textarea.placeholder = 'Hello, friend!';
  textarea.autofocus = 'on';
  main.append(textarea);

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  main.append(keyboard);

  const about = document.createElement('div');
  about.classList.add('about');
  main.append(about);

  const aboutText = document.createElement('p');
  aboutText.classList.add('about-text');
  aboutText.textContent = 'created in OS Windows';
  about.append(aboutText);

  const aboutText2 = document.createElement('p');
  aboutText2.classList.add('about-text');
  aboutText2.textContent = 'language switch: CtrlLeft + ShiftLeft';
  about.append(aboutText2);

  createKeyboard(state);
}
export default createMainPage;
