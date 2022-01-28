import React, { Component } from 'react';
import './bloging.css';
import axios from "./../../axios-orders";
import Post from "../../components/UI/posts/post.js";
import Modal from '../../components/UI/modal/modal';
import * as addActions from '../../store/actions/addaction';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/spinner/Spinner';
class Blog extends Component {

    componentDidMount() {
        this.props.onViewPost();
        
    }
    // imageViewHandler = (event) =>{
    //    console.log(event);
    // }
    cancelHandler = () => {
        this.setState({ viewer: false })
    }
    
    render() {
        console.log(this.props.posts);
    let posts = <Spinner/>
        if (!this.props.loading) {
            posts =this.props.posts.map(order => (
                <div>
                <Post
                    key={order.id}
                    title={order.title}
                    caption={order.caption}
                    Album={order.Album}
                    img={order.Url}
                    // clicked={}
                />
                </div>
            ))
           
        }   
        return (
            <div>
                <div class="gallery">
                    {posts}
                </div>
                {/*<Modal show={this.state.viewer} modalClosed={this.cancelHandler}>
                        <img src={this.props.img}/>
                    </Modal>*/}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        posts: state.posts,
        loading: state.loading
    }
}
const mapDispatchToProps =  dispatch => {
    return{
        onViewPost: () => dispatch(addActions.viewPost())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);