import React, { Component } from 'react';
// import Navigation from './nav/nav';
import './navigationitems.css';
// import { Link, animateScroll as scroll } from "react-scroll";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
class navigationsItems extends Component {

    state = {
        color: 'white'
    }
    /*componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
    }*/

    listenScrollEvent = e => {
        if (window.scrollY > 400) {
            document.querySelector(".sticky").className = "sticky scroll";
        } else {
            document.querySelector(".sticky").className = "sticky";
        }
    }



    render() {
        return (
            <div className='sticky'>
                <nav className='NavigationItems'>
                    <div className='sitelogo'>Distubuted Photography  <span></span>
                        <i className="fas fa-camera-retro"></i>
                    </div>
                    <ul className='NaviItems'>
                        <li className='NavigationItem'>
                            <NavLink to="/" exact>Home</NavLink>
                        </li>
                        <li className='NavigationItem'>
                            <NavLink to="/Portpolio">PORTFOLIO</NavLink>
                        </li>
                        <li className='NavigationItem'>
                            <NavLink to="/Blog">Blog</NavLink>
                        </li>
                        <li className='NavigationItem'>
                            <NavLink to="/About" >About</NavLink>
                        </li>
                        <li className='NavigationItem'>
                            <NavLink to="">Contact</NavLink>
                        </li>
                        {this.props.isAuthenticated
                            ? <li className='NavigationItem'>
                                <NavLink to="/Addpost">Addpost</NavLink>
                            </li>
                            : null}
                        {this.props.isAuthenticated
                            ?
                            <li className='NavigationItem'>
                                <NavLink to="/">logout</NavLink>
                            </li> :
                            null}
                    </ul>
                </nav>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.isSignup === true
    };
};

export default connect(mapStateToProps)(navigationsItems);
