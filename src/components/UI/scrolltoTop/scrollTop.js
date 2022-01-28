import './scrollTop.css';
import { animateScroll as scroll } from "react-scroll";
import React, { Component } from 'react';

class Up extends Component {
  
    componentDidMount() {
        // Get the button
        let mybutton = document.getElementById("myBtn");
        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = () => {
            if (mybutton) {
                if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                    mybutton.style.display = "block";
                } else {
                    mybutton.style.display = "";
                }
            }
            // console.log(mybutton);
        }
    }
    scrollToTop = (smooth, offset, duration) => {
        scroll.scrollToTop(smooth = true, offset = -70, duration = 10);
    };
    render() {
        return (
            <button id="myBtn" onClick={this.scrollToTop}> ^ </button>
        );
    }
}

export default Up;

