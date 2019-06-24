import React from 'react';
import { Link } from "react-router-dom"
import { connect} from 'react-redux';
import { logout } from '../../actions/auth'

const HomePage = ({isAuthenticated, logout}) => (
    <div>
        <h1>Home Page</h1>
        {isAuthenticated ?
            <button onClick={() => logout()}>Log Out</button> :
            <div><Link to='/login'>Log In</Link> or <Link to='/signup'>Sign Up</Link> </div>}
    </div>
)
function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.auth_token
    }
}

export default connect(mapStateToProps, {logout })(HomePage);