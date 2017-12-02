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
		this.setState({ query: query.trim() });
      
      	if (query.length > 3) {
        	BooksAPI.search(query,10).then((returnedBooks) => { this.setState({ returnedBooks }) });
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
    	console.log('clicked Close Modal OK button');
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
                		{/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                      */}
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
          					cover={book.imageLinks.smallThumbnail.replace(/^http:\/\//i, 'https://')}
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