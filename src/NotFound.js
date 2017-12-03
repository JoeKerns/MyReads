import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  	<div className="list-books">
		<div className="list-books-title">
			<h1>MyReads</h1>
		</div>
          
		<div className="notFound"><p>Whoa! We can find that resource. <Link to="/">Click here to go to the home page </Link></p></div>  
  	</div>
  
);

export default NotFound;