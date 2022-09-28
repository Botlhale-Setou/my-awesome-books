/* eslint-disable require-jsdoc */
import Book from './Book.js';

export default class BookLibrary {
  constructor() {
    this.arrBooks = [];

    this.add = (title, author) => {
      const temp = new Book;
      temp.title = title;
      temp.author = author;
      this.arrBooks.push(temp);
    };

    this.remove = (index) => {
      this.arrBooks.splice(index, 1);
      console.log(this.arrBooks);
    };
  }
}
