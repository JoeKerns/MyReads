import React, { Component } from 'react';

class Book extends Component {
    handleClick = (e, bookID) => {
		this.props.onChangeShelf(bookID, e.target.value);  
    }

	render() {
      	const author = this.props.authors.map((author,key) => (<div key={key}>{author}</div>))  
		let shelf = 'none';
		if (this.props.shelf.length !== 0) {
        	shelf = this.props.shelf;         	
        }
		
		return (
        <li>
			<div className="book">
          		<div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.cover})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => this.handleClick(event, this.props.id)}  value={shelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
				<div className="book-title">{ this.props.title }</div>
				<div className="book-authors">{ author }</div>					
			</div>
		</li>
        )
    }
}

export default Book;