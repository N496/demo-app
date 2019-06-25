import React, { Component } from 'react';
import {Form, Button, Segment, Grid, Image} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class BookForm extends Component {
    state = {
        data: {
            goodreadsId: this.props.book.goodreadsId,
            title: this.props.book.title,
            authors: this.props.book.authors,
            cover: this.props.book.covers[0],
            pages: this.props.book.pages,
            preview_book: this.props.book.preview_book
        },
        covers: this.props.book.covers,
        index: 0,
        loading: false,
        errors: {}
    }

    componentWillReceiveProps(props) {
        this.setState({ data: {
            goodreadsId: props.book.goodreadsId,
            title: props.book.title,
            authors: props.book.authors,
            cover: props.book.covers[0],
            pages: props.book.pages,
            preview_book: props.book.preview_book
        },
        covers: props.book.covers,
        })
    }

    onChange = (e) => {
        this.setState({...this.state, data: {...this.state.data, [e.target.name]: e.target.value}})
    }
    
    onChangeNumber = (e) => {
        this.setState({...this.state, data: {...this.state.data, [e.target.name]: parseInt(e.target.value, 10) }})
    }
    
    changeCover = () =>{
        const { index , covers} = this.state;
        const newIndex = index + 1 >= covers.length ? 0 : index + 1;
        this.setState({index: newIndex, data: {...this.state.data, cover: covers[newIndex]}})
    }

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data)
        this.setState({ errors });
        if( Object.keys(errors).length === 0 ){
            this.setState({loading: true})
            this.props.submit(this.state.data)
        }
    }

    validate = (data) => {
        const errors = {};
        if (!data.title) errors.title = "can't be blank";
        if (!data.authors) errors.authors = "can't be blank";
        if (!data.pages) errors.pages = "can't be blank";
        return errors;
    }

    render() { 
        return (
            <Segment>
                <Form onSubmit={this.onSubmit} loading={this.state.loading}>
                    <Grid columns={2} stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field error={!!this.state.errors.title}>
                                    <label htmlFor="title">Book Title</label>
                                    <input type="text" id="title" name="title"
                                            placeholder="Title"
                                            value={this.state.data.title}
                                            onChange={this.onChange} />
                                    {this.state.errors.title && <InlineError text={this.state.errors.title} />}
                                </Form.Field>
                                <Form.Field error={!!this.state.errors.authors}>
                                    <label htmlFor="authors">Book Authors</label>
                                    <input type="text" id="authors" name="authors"
                                            placeholder="Authors"
                                            value={this.state.data.authors}
                                            onChange={this.onChange} />
                                    {this.state.errors.authors && <InlineError text={this.state.errors.authors} />}
                                </Form.Field>

                                <Form.Field error={!!this.state.errors.pages}>
                                    <label htmlFor="pages">Pages</label>
                                    <input type="number" id="pages" name="pages"
                                            value={this.state.data.pages}
                                            onChange={this.onChangeNumber} />
                                    {this.state.errors.pages && <InlineError text={this.state.errors.pages} />}
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Image size="small" src={this.state.data.cover} />
                                {this.state.covers.length > 1 && (<a role="button" tabIndex={0}
                                onClick={this.changeCover}>Another Cover</a>)}
                                {this.state.data.preview_book && (<a href={this.state.data.preview_book} target="_blank" >Preview Book</a>)}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Button primary>Save</Button>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Segment>
        );
    }
}
 
export default BookForm;