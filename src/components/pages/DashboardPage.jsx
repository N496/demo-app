import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage'
import { allBooksSelector } from '../../reducers/books';
import AddBookCtA from '../../ctas/AddBookCtA';
import { fetchBooks } from '../../actions/books'

class DashboardPage extends Component {
    componentDidMount = () => this.onInit(this.props);
    onInit = (props) => props.fetchBooks();
    render() {
        const {isConfirmed, books} = this.props;
        return (
            <div>
                {!isConfirmed && <ConfirmEmailMessage />}
                {books.length === 0 ? <AddBookCtA /> : <p>You have book!</p>}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        isConfirmed: !!state.user.isConfirmed,
        books: allBooksSelector(state)
    }
}
 
export default connect(mapStateToProps, { fetchBooks })(DashboardPage);