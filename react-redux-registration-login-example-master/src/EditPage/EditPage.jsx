import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class EditPage extends React.Component {
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
                contact: contact,
            },
            submitted: false,
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
        this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log("items", items);

        if (!!items && this.newPassword === "" && this.newEmail === "" && this.newContact === "") {
            this.newPassword = items[0].password;
            this.newEmail = items[0].email;
            this.newContact = items[0].contact;
            this.refresh();
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

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { id } = this.props.user;

        if (user.firstName && user.lastName && user.username && (user.password || this.newPassword) && (user.email || this.newEmail) && (user.contact || this.newContact)) {
            const newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: this.newPassword,
                email: this.newEmail,
                contact: this.newContact,
                id: id
            }
            this.props.update(newUser);
        }
    }


    render() {
        const { user, updating } = this.props;
        const { submitted } = this.state;
        const { firstName, lastName, username, password, email, contact } = this.state.user;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Edit User Details</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
                        {submitted && !firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={lastName} onChange={this.handleChange} />
                        {submitted && !lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password && !this.newPassword ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password || this.newPassword} onChange={this.handleChange} />
                        {submitted && !password && !this.newPassword &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !email && !this.newEmail ? ' has-error' : '')}>
                        <label htmlFor="email">Email_Id</label>
                        <input type="email" className="form-control" name="email" value={email || this.newEmail} onChange={this.handleChange} />
                        {submitted && !email && !this.newEmail &&
                            <div className="help-block">Email Id is required</div>
                        }
                    </div>
                    <div className={'form-group' + submitted && (!contact && !this.newContact ? ' has-error' : '')}>
                        <label htmlFor="phone">Contact Number</label>
                        <input type="tel" className="form-control" pattern="[789][0-9]{9}" name="contact" value={contact || this.newContact} onChange={this.handleChange} placeholder={"9022211141"} />
                        {submitted && !contact && !this.newContact &&
                            <div className="help-block">Contact is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Save</button>
                        {updating &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication, updation } = state;
    const { updating } = updation;
    const { user } = authentication;
    return { user, users, updating };
}

const actionCreators = {
    getUsers: userActions.getAll,
    update: userActions.update
}

const connectedEditPage = connect(mapState, actionCreators)(EditPage);
export { connectedEditPage as EditPage };