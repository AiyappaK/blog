import React, { Component } from 'react';
import './bloging.css';
import axios from "./../../axios-orders";
import Post from "../../components/UI/posts/post.js";
import Modal from "../../components/UI/Modal/Modal";
import * as addActions from '../../store/actions/addaction';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/spinner/Spinner';
class Blog extends Component {
    state = {
        viewer: false,
        url: ''
    }
    componentDidMount() {
        this.props.onViewPost();

    }
    imageViewHandler = (url) => {
        this.setState({ url: url });
        this.setState({ viewer: true });
        console.log('this.state.viewer', this.state.viewer, 'url', this.state.url);
        console.log('this.state.viewer', this.state.viewer, 'url', this.state.url);

    }
    cancelHandler = () => {
        this.setState({ url: '' })
        this.setState({ viewer: false })
    }

    render() {
        
        let posts = <Spinner />
        if (!this.props.loading) {
            posts = this.props.posts.map(order => (
                
                <div>
                    <Post
                        key={order.id}
                        title={order.title}
                        caption={order.caption}
                        Album={order.Album}
                        img={order.Url}
                        clicked={() => this.imageViewHandler(order.Url)}
                    />

                </div>
            ))

        }
        let modal;

        if (this.state.viewer) {
            modal = <Modal
                img={this.state.url}

            />
        }

        return (
            <div>
                <div class="gallery">
                    {posts}
                </div>
                <Modal show={this.state.viewer} modalClosed={this.cancelHandler} img={this.state.url} />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        posts: state.posts,
        loading: state.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onViewPost: () => dispatch(addActions.viewPost())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);