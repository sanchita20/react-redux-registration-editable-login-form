import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        const { firstName, lastName, username, password, email, contact } = this.props.user;
        this.state = {
            user: {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                email: email,
                contact: contact
            },
            refresh: false
        }
        this.firstName = false;
        this.lastName = false;
        this.username = false;
        this.password = false;
        this.email = false;
        this.contact = false;

        this.newPassword = "";
        this.newEmail = "";
        this.newContact = "";


        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    refresh() {
        this.setState((prevState) => {
            return { refresh: !prevState };
        })
    }
    componentDidMount() {
        this.props.getUsers();
    }

    componentDidUpdate(prevProps) {
        const { items } = this.props.users;
        const { user } = this.state;

        if (!!items && this.newPassword === "" && this.newEmail === "" && this.newContact === "") {
            this.newPassword = items[0].password;
            this.newEmail = items[0].email;
            this.newContact = items[0].contact;
            this.refresh();
        }
    }

    handleEdit(id) {
        this.refresh();
        switch (id) {
            case "firstName":
                return this.firstName = true;
            case "lastName":
                return this.lastName = true;
            case "username":
                return this.username = true;
            case "password":
                return this.password = true;
            case "email":
                return this.email = true;
            case "contact":
                return this.contact = true;
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    render() {
        const { user, users } = this.props;
        const { firstName, lastName, username, password, email, contact } = this.state.user;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <div className={'form-group'}>
                    <Link to="/edit">
                        <img src="https://img.icons8.com/pastel-glyph/64/000000/edit.png" height="15px" width="15px" style={{ float: 'right' }} />
                    </Link>
                </div>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <div>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group'}>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" name="firstName" value={user.firstName} disabled={this.firstName ? false : true} />
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" name="lastName" value={user.lastName} disabled={this.lastName ? false : true} />
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" name="username" value={user.username} disabled={this.username ? false : true} />
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value={user.password || this.newPassword} disabled={this.password ? false : true} />
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="email">Email_Id</label>
                                <input type="email" className="form-control" name="email" value={user.email || this.newEmail} disabled={this.email ? false : true} />
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="phone">Contact Number</label>
                                <input type="tel" className="form-control" pattern="[789][0-9]{9}" name="contact" value={user.contact || this.newContact} disabled={this.contact ? false : true} placeholder={"9022211141"} />
                            </div>
                        </form>
                    </div>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };