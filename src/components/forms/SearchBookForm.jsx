import React, { Component } from 'react';
import axios from 'axios'
import { Form, Dropdown } from 'semantic-ui-react';

class SearchBookForm extends Component {
    state = {
        query: '',
        loading: false,
        options: [],
        books: {}
    }

    onSearchChange = (e, data) => {
        clearTimeout(this.timer);
        this.setState({
            query: e.target.value
        });
        this.timer = setTimeout(this.fetchOptions, 1000)
    }

    onChange = (e, data) => {
        this.setState({query: data.value})
        this.props.onBookSelect(this.state.books[data.value]);
    }

    fetchOptions = () => {
        if (!this.state.query) return;
        this.setState({ loading: true });
        axios.get(`http://localhost:3000/api/v1/search?q=${this.state.query}&&auth_token=${localStorage.ecommerceJWT}`)
        .then(res => res.data.books)
        .then(books => {
            const options = [];
            const booksHash = {};
            books.forEach(book => {
                booksHash[book.goodreadsId] = book;
                options.push({
                    key: book.goodreadsId,
                    value: book.goodreadsId,
                    text: book.title
                })
            })
            this.setState({ options: options, books: booksHash, loading: false})
        })
    }

    render() { 
        return (
            <Form>
                <Dropdown
                    search
                    fluid
                    placeholder='Seach for a bookby title'
                    value={this.state.query}
                    onSearchChange={this.onSearchChange}
                    options={this.state.options}
                    loading={this.state.loading}
                    onChange = {this.onChange}
                />
            </Form>
        );
    }
}
 
export default SearchBookForm;