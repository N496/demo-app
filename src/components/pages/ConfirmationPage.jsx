import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {confirm} from '../../actions/auth';

class ConfirmationPage extends Component {
    state = { 
        loading:true,
        success: false
    }

    componentDidMount() {
        this.props.confirm(this.props.location.search.split('=')[1])
        .then(() => this.setState({loading: false, success: true}))
        .catch(() => this.setState({loading: false, success: false}))
    }

    render() { 
        return (
            <div>
                {this.state.loading &&
                    <Message icon>
                        <Icon name="circle notched" loading />
                        <Message.Header>Validating your email</Message.Header>
                    </Message>
                }
                {!this.state.loading && this.state.success &&
                    <Message success icon>
                        <Icon name="checkmark"/>
                        <Message.Content>
                            <Message.Header>Thank you. Your account has been verified.</Message.Header>
                            <Link to='/dashboard'>Go to your dashboard</Link>
                        </Message.Content>
                    </Message>
                }

                {!this.state.loading && !this.state.success &&
                    <Message negative icon>
                        <Icon name="warning sign"/>
                        <Message.Content>
                            <Message.Header>Ooops. Invalid token it seems</Message.Header>
                        </Message.Content>
                    </Message>
                }
            </div>
        );
    }
}
 
export default connect(null, {confirm})(ConfirmationPage);