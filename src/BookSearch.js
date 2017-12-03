import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import BookModal from './BookModal';

class BookSearch extends Component {
    state = {
		returnedBooks: '',
		query: ''
	}

	updateQuery = (query) => {
		this.setState({ query });
      
      	if (query.length > 3) {
        	BooksAPI.search(query,10).then((returnedBooks) => { 
              	let filteredBooks = [];
              	returnedBooks.forEach((book) => {
                  	const cover = book.hasOwnProperty("imageLinks") ? book.imageLinks.smallThumbnail.replace(/^http:\/\//i, 'https://') : 'https://via.placeholder.com/128x193?text=No%20Cover';
                  	filteredBooks.push({
                      id: book.id,
                      title: book.title,
                      authors: book.authors,
                      cover 
                    });
                });
              	this.setState({ returnedBooks: filteredBooks });            	
            });
        }
      
      if (query.length === 0) {
      	this.setState({ returnedBooks: '' });
      	}
  	}

	clearQuery = () => {
    	this.setState({ query: '' });
  	}

	changeShelf(bookID, newShelf) {
    	this.props.onChangeShelf(bookID, newShelf);
      	this.handleModalOpen(newShelf);
    }

	handleModalOpen = (newShelf) => {
      	let theShelf;
      	switch(newShelf) {
          case 'none':
            theShelf = 'removed from all shelves.';
            break;
            
          case 'wantToRead':
            theShelf = 'added to Want To Read shelf.';
            break;
            
          case 'read':
          	theShelf = 'added to Read shelf';
            break;
            
          case 'currentlyReading':
            theShelf = 'added to Currently Reading shelf';
            break;
            
          default:
            theShelf = 'unexpected'
        }
    	
    	this.setState(() => ({ modalContent: `The book was ${theShelf}` }));
  	}

  	handleModalClose = () => {
    	this.setState(() => ( { modalContent: undefined }));
  	}

	render() {
		const { books } = this.props;
		
		return(
        	<div className="search-books">
            	<div className="search-books-bar">
          			<Link to="/" className="close-search">Close</Link>
          		
					<div className="search-books-input-wrapper">
						<form>
                		<input type="text" name="searchTerm"  placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
						</form>
              		</div>
            	</div>
            	<div className="search-books-results">
              		<ol className="books-grid">
             		{
             		this.state.returnedBooks.length > 0 && this.state.returnedBooks.map((book) => (
                      	<Book
          					key={book.id}
							id={book.id}
          					title={book.title}
          					cover={ book.cover }
          					authors={book.authors}
							shelf={ books.filter((bookshelfBooks) => bookshelfBooks.id === book.id).map((bookshelfBook) => (bookshelfBook.shelf)) || 'none' }
							onChangeShelf={(bookID, newShelf) => {
                				this.changeShelf(bookID, newShelf)	
                			}}
          				/>
						))
             		}
					{ ( ( (this.state.returnedBooks.length === 0) || (this.state.returnedBooks.length === undefined) ) && ( this.state.query.length > 0 ) ) && `No results, please type at least 4 characters or try a different search term` }
					</ol>
				</div>
			<BookModal 
        		modalContent={this.state.modalContent}
        		handleModalClose={this.handleModalClose}
      		/>
			</div>
        	)
    	}
	}

export default BookSearch