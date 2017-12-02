import React from 'react'
import { Route } from 'react-router-dom';
import './App.css'
import BookSearch from './BookSearch';
import BookList from './BookList';
import * as BooksAPI from './BooksAPI';

class App extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

	componentDidMount() {
    	BooksAPI.getAll().then((books) => {
    		this.setState({books})
    	})
    }

	changeShelf(bookID, newShelf) {
      	const book = { id: bookID } 
    	BooksAPI.update(book, newShelf);
      	//console.log(updateBook);
		BooksAPI.getAll().then((books) => {
    		this.setState({books})
    	});		
    }

	render() {
    	return (
    	<div>
			<Route exact path="/" render={() => (
    			<BookList
    			books={this.state.books}
				onChangeShelf={(bookID, newShelf) => {
                	this.changeShelf(bookID, newShelf)	
                }}
    			/>
    		)} />
			<Route path="/search" render={() => (
        		<BookSearch
                books={this.state.books}
                onChangeShelf={(bookID, newShelf) => {
                	this.changeShelf(bookID, newShelf)	
                }}
                />
			)} />
		</div>
    )}
}

export default App
