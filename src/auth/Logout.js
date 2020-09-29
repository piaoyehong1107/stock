import React, { Component } from 'react'
import {Redirect } from 'react-router-dom'

export default class Logout extends Component {

    handleLogout = () => {
        console.log('==> logging out')
        localStorage.clear();
        this.setState({ isLoggedIn: false });
        return <Redirect to="/login" />;
    }

    render() {
        return (
            <button onClick={this.handleLogout}>
                Log out
            </button>
        )
    }
}
