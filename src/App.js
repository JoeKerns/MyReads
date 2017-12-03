import React from 'react'
import { Switch, Route } from 'react-router-dom';
import './App.css'
import BookSearch from './BookSearch';
import BookList from './BookList';
import * as BooksAPI from './BooksAPI';
import NotFound from './NotFound';

class App extends React.Component {
  state = {
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
      	BooksAPI.getAll().then((books) => {
    		this.setState({books})
    	});		
    }

	render() {
    	return (
    	<div>
         	<Switch>
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
			<Route component={NotFound}/>
		</Switch>
		</div>
    )}
}

export default App
