import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import SearchBookForm from '../forms/SearchBookForm';
import BookForm from '../forms/BookForm';
import { connect } from 'react-redux';
import { createBook } from '../../actions/books';

class NewBookPage extends Component {
    state = { 
        book: null
    }

    onBookSelect = book => this.setState({ book })

    addBook = (book) => this.props.createBook(book).then(() => this.props.history.push('/dashboard'));
    render() { 
        return (
            <Segment>
                <h1>Add new book to your collection</h1>
                <SearchBookForm onBookSelect={this.onBookSelect} />
                {this.state.book && <BookForm submit={this.addBook} book={this.state.book} />}
            </Segment>
        );
    }
}
 
export default connect(null, {createBook})(NewBookPage);