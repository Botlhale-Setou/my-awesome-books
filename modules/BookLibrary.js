import Book from './Book.js';

export default class BookLibrary {
	arrBooks = [];

	add = (title, author) => {
		let temp = new Book;
		temp.title = title;
		temp.author = author;
		this.arrBooks.push(temp);
	}

	remove = (index) => {
		this.arrBooks.splice(index, 1);
		console.log(this.arrBooks);
	}
}