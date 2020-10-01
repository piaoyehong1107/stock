import React from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import Favorites from "./container/Favorites";
import Market from "./container/Market";
import Detail from "./component/Detail";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import SignUp from "./auth/Signup";

const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLoggedIn
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  handleLogin = () => {
    if (localStorage.getItem("auth_key")) {
      this.setState({ isLoggedIn: true });
    }
  };


  handleLogout = () => {
    console.log('==> logging out')
    localStorage.clear();
    this.setState({ isLoggedIn: false });
    return <Redirect to="/login" />;
  }

  handleSignup = () => {
    console.log('==> sign up')
    // localStorage.clear();
    // this.setState({ isLoggedIn: false });
    this.props.history.push('/signup')
  }

  componentDidMount() {
    if (localStorage.auth_key) {
      this.setState({isLoggedIn: true})
      this.props.history.push('/favorites')
    }
  }

  render() {
    const routes = [
      {
        path: "/",
        exact: true,
        component: () => <Market />,
      },
      {
        path: "/favorites",
        exact: false,
        component: () => <Favorites />,
      },
      {
        path: "/detail/:ticker",
        exact: false,
        component: () => <Detail />,
      },
    ];
    
    const { isLoggedIn } = this.state

    return (
      // <Router>
      <div style={{ display: "flex" }}>
        {/* <BrowserRouter> */}
        {/* <Header isLoggedIn={this.state.isLoggedIn} /> */}
        <div
          style={{
            width: "10rem",
            height: "100vh",
            background: "#eeeeee",
            fontSize: "24px",
          }}
        >
          <ul style={{
            listStyleType: 'none',
            textDecoration: 'none',
            padding: "20px 30px",
          }}>
            <li
              style={{
                marginBottom: "12px",
              }}
            >
              <Link 
              onMouseOver="this.style.background='red'"
              style={{
                color: 'black',
                textDecoration: 'none',
              }} to="/">Market</Link>
            </li>
            <li style={{
              marginBottom: '700px'
            }}>
              <Link style={{
                color: 'black',
                textDecoration: 'none',
                
              }} to="/favorites">Favorites</Link>
            </li>
            <li>
              <button onClick={this.handleLogout}>Logout</button>
            </li>
            <li>
              <button onClick={this.handleSignup}>Signup</button>
            </li>
          </ul>
        </div>
        <div style={{margin: '30px'}}>
          <Switch>
            <Route 
              path="/signup"
              exact={true}
              component={() => <SignUp />}
            />
            <Route 
              path="/login"
              exact={true}
              component={() => <Login handleLogin={this.handleLogin} />}
            />
            {routes.map((r) => (
              <PrivateRoute path={r.path} exact={r.exact} component={r.component} isLoggedIn={isLoggedIn}/>
            ))}
          </Switch>
        </div>
        {/* </BrowserRouter> */}
      </div>
    );
  }
}
export default withRouter(App);
