import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
//import Book from './Book';

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

        //console.log('Currently Reading',currentlyReading);

        return(
			<div className="list-books">
				<div className="list-books-title">
              		<h1>MyReads</h1>
            	</div>
          
          		<div className="list-books-content">
                      
          		{ currentlyReading.length > 0 && 
          			<BookShelf 
          				bookShelf="Currently Reading" 
          				booksOnShelf={ currentlyReading }
          				onChangeShelf={(bookID, newShelf) => {
                			this.changeShelf(bookID, newShelf)	
                		}}
          			/> }
          
          		{ wantToRead.length > 0 && 
					<BookShelf 
                 		bookShelf="Want To Read" 
                 		booksOnShelf={ wantToRead } 
						onChangeShelf={(bookID, newShelf) => {
                			this.changeShelf(bookID, newShelf)	
                		}}
					/> }
                      
                { read.length > 0 && 
					<BookShelf 
                 		bookShelf="Read" 
                 		booksOnShelf={ read } 
						onChangeShelf={(bookID, newShelf) => {
                			this.changeShelf(bookID, newShelf)	
                		}}
					/> }    
          
          
          			
					<div className="open-search">
						<Link to="/search">Add A Book</Link>
                    </div>
                </div>
          
			</div>
        )
    }
}

export default BookList