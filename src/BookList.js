import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class BookList extends Component {
  	changeShelf(bookID, newShelf) {
    	//alert(`the new shelf is ${newShelf} for bookID ${bookID}`);
      	this.props.onChangeShelf(bookID, newShelf);
    }
	render() {
        const { books } = this.props;
        let currentlyReading = books.filter((book) => book.shelf === 'currentlyReading');
        let wantToRead = books.filter((book) => book.shelf === 'wantToRead');
        let read = books.filter((book) => book.shelf === 'read');

        return(
			<div className="list-books">
				<div className="list-books-title">
              		<h1>MyReads</h1>
            	</div>
          
          		<div className="list-books-content">
          			<div className="bookshelf">
                  		<h2 className="bookshelf-title">Currently Reading</h2>
                  		<div className="bookshelf-books">
          					<ol className="books-grid">
                                {currentlyReading.map((book) => (
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
                    	</div>
                	</div>
          
          			<div className="bookshelf">
                  		<h2 className="bookshelf-title">Want to Read</h2>

                  		<div className="bookshelf-books">
                    		<ol className="books-grid">
                                {wantToRead.map((book) => (
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
                	</div>
          
          
          			<div className="bookshelf">
                  		<h2 className="bookshelf-title">Read</h2>
                  
							<div className="bookshelf-books">
                              <ol className="books-grid">
                                  {read.map((book) => (
                                      <Book
                                      key={book.id}
                                      id={book.id}
                                      title={book.title}
                                      cover={ book.imageLinks.smallThumbnail.replace(/^http:\/\//i, 'https://') }
                                      authors={book.authors}
                                      shelf={book.shelf}
                                      onChangeShelf={(bookID, newShelf) => {
                                          this.changeShelf(bookID, newShelf)	
                                      }}
                                      />
                                  ))}
                              </ol>
                  		</div>
                	</div>
					<div className="open-search">
						<Link to="/search">Add A Book</Link>
            		</div>
          
			</div>
        )
    }
}

export default BookList