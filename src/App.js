import React, { Component } from 'react';
import Navigation from './components/UI/navigation/navgationItems';
import './App.css';
import Portpolio from './container/bloging/bloging';
import { Route, Switch } from 'react-router';
// import Blog from './container/bloging/bloging';
import Home from './container/home/home';
import test from './test';
import About from './components/about/about';
import Footer from './components/UI/footer/footer';
import Addpost from './container/addpost/addpost';
import FullPost from './components/UI/detailpost/Fullpost';
import Up from './components/UI/scrolltoTop/scrollTop';
import contact from './components/contact/contact';
import Layout from './hoc/Layout/layout';
import Blog from './components/blogs/blog';
import AddBlog from './container/blogs/blogs'
import viewBlog from './container/view/view';
import Login from './container/login/login';
import { connect } from 'react-redux';

class App extends Component {
  state = {}
  render() {
    let routes;
    if ( !this.props.isAuthenticated ) {
     routes = (
        <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={test} />
        <Route path='/Portpolio' component={Portpolio} />
        <Route path='/blog' component={Blog} />
        <Route path="/About" component={About} />
        <Route path="/contact" component={contact} />
      <Route path="/AddBlogs" component={AddBlog} />
      <Route path="/vBlogs" component={viewBlog} />
      <Route path="/Addpost" component={Addpost} />

      </Switch>
      )
    }
    else{
      routes=(
      <Switch>
      <Route path="/" exact component={test} />
      <Route path='/Portpolio' component={Portpolio} />
      <Route path='/blog' component={Blog} />
      <Route path="/About" component={About} />
      <Route path="/contact" component={contact} />
      <Route path="/Addpost" component={Addpost} />
      <Route path="/AddBlogs" component={AddBlog} />

      <Route path="/fullpost/:id" exact component={FullPost} />
      </Switch>
      )
    }
    return (
      <div className="images">
        <Layout>
        {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.isSignup === true
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch( actions.authCheckState() )
//   };
// };

export default connect(mapStateToProps)(App);