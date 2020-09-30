import React from 'react';
import {
  withRouter
} from 'react-router';
import { Redirect } from 'react-router-dom'
class Login extends React.Component {

  state = {
    username: '',
    password: ''
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      username: this.state.username,
      password: this.state.password
    }
    console.log({newUser})
    fetch('http://localhost:3000/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(res => res.json())
    .then(resp => {
        console.log('==> fetched token')
        console.log(resp)
        if (resp['auth_key']) {
            localStorage.setItem('auth_key',resp['auth_key'])
            this.props.handleLogin()
            this.props.history.push('/')
        }
    })
  }

  render(){
    // if (!localStorage.getItem("auth_key")) {
    //     return <Redirect to='/' />
    // }

    return (
      <span className={'form-outer'}>
        <h2> Login </h2>
        <form className={'add-book'} onSubmit={this.handleSubmit}>
          <input style={{marginRight: '10px'}} type="text" value={this.state.username} onChange={this.handleInputChange} name='username' placeholder="Username"  />
          <input style={{marginRight: '10px'}} type="password" value={this.state.password} onChange={this.handleInputChange} name='password' placeholder="Password"  />
          <input id="submit" type="submit" value="Submit" />
        </form>
      </span>
    )
  }
}

export default withRouter(Login);