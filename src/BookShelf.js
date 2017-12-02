import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {
  changeShelf(bookID, newShelf) {
	//alert(`the new shelf is ${newShelf} for bookID ${bookID}`);
    this.props.onChangeShelf(bookID, newShelf);
  }
  
  render() {
    const thisShelf = this.props.booksOnShelf.length;
    return (
      
      <div className="bookshelf">
      
      { thisShelf && (
      <div className="bookshelf">
      	<h2 className="bookshelf-title">{ this.props.bookShelf }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              {this.props.booksOnShelf.map((book) => (
                  <Book
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  cover={book.imageLinks.smallThumbnail.replace(/^http:\/\//i, 'https://')}
                  authors={book.authors}
                  shelf={book.shelf}
                  onChangeShelf={(bookID, newShelf) => {
                      this.changeShelf(bookID, newShelf)	
                  }}
                  />
              ))}
          </ol>
        </div>
	</div>)}
		
      </div>
    )

  }
}

export default BookShelf;