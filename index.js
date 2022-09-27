/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */

import BookLibrary from './modules/BookLibrary.js';
import * as lux from './modules/luxon.js';

const listRadio = document.querySelector('#listLabel');
const addNewRadio = document.querySelector('#addNewLabel');
const contactRadio = document.querySelector('#contactLabel');
const listTab = document.querySelector('#listTab');
const addNewTab = document.querySelector('#addNewTab');
const contactTab = document.querySelector('#contactTab');
const libraryDiv = document.querySelector('#book');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const addBtn = document.querySelector('#addBtn');
const clock = document.querySelector('#clock');

const library = new BookLibrary();
let allRmvBtns = document.querySelectorAll('.remove-btn');

const refresh = (booksDiv) => {
  booksDiv.innerHTML = '';

  library.arrBooks.forEach((book) => {
    const bookDiv = document.createElement('div');
    const xText = document.createElement('p');
    const rmvBtn = document.createElement('button');

    xText.innerHTML = `"${book.title}" by ${book.author}`;
    rmvBtn.innerHTML = 'Remove';

    bookDiv.classList.add('book-container');
    xText.classList.add('book-title');
    rmvBtn.classList.add('remove-btn');

    bookDiv.append(xText);
    bookDiv.append(rmvBtn);
    booksDiv.append(bookDiv);
  });
};

const updateRMV = () => {
  allRmvBtns = document.querySelectorAll('.remove-btn');
  for (let i = 0; i < allRmvBtns.length; i += 1) {
    allRmvBtns[i].addEventListener('click', () => {
      library.remove(i);

      refresh(libraryDiv);
      updateRMV();

      window.localStorage.setItem('books', JSON.stringify(library.arrBooks));
    });
  }
};

window.setInterval(() => {
  const temp = lux.DateTime.now().toLocaleString(lux.DateTime.DATETIME_MED);
  clock.innerHTML = '';
  clock.innerHTML = temp;
}, 1000);

listRadio.addEventListener('click', () => {
  listTab.style.display = 'block';
  addNewTab.style.display = 'none';
  contactTab.style.display = 'none';
});

addNewRadio.addEventListener('click', () => {
  listTab.style.display = 'none';
  addNewTab.style.display = 'block';
  contactTab.style.display = 'none';
});

contactRadio.addEventListener('click', () => {
  listTab.style.display = 'none';
  addNewTab.style.display = 'none';
  contactTab.style.display = 'flex';
});

addBtn.addEventListener('click', () => {
  library.add(titleInput.value, authorInput.value);

  titleInput.value = '';
  authorInput.value = '';

  refresh(libraryDiv);
  updateRMV();

  window.localStorage.setItem('books', JSON.stringify(library.arrBooks));
});

window.addEventListener('load', () => {
  const localStorageItem = window.localStorage.getItem('books');
  if (localStorageItem) {
    library.arrBooks = JSON.parse(localStorageItem);

    refresh(libraryDiv);
    updateRMV();
  }
});
