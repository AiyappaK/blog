import React, { Component } from 'react';

import classes from './Modal.module.css';
// import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../backdrop/backdrop';

class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render () {
        return (
            <div >
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                
                     <button className={classes.Button} onClick={this.props.modalClosed}> X</button>
                   <img className={classes.Image} src={this.props.img}/>
                   </div>
                </div>
                
              
        )
    }
}

export default Modal;