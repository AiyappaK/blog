import React, { useEffect, useLayoutEffect, useRef } from 'react';
import './test.css';
import { connect } from "react-redux";
import Spinner from './components/UI/spinner/Spinner';
import * as addActions from './store/actions/addaction';


const Test = (props) => {
    const i = useRef()
    

    const { onViewPost } = props;
    useLayoutEffect(()=>{
        // i.current
        // console.log(i);

    })
    useEffect(() => {
        onViewPost();
        // console.log("this.is", blogs);
    }, [onViewPost]);
    
    let posts = <Spinner />
    if (!props.loading) {
        posts = props.posts.map(order => (
            <div class="grid"  key={order.id} >
                <img   src={order.Url} />
                <div class="grid__body">
                    <div class="relative">
                        <a class="grid__link" target="_blank" href="/" ></a>
                        <h1 class="grid__title">{order.title}</h1>
                        <p class="grid__author">Mario Rossi</p>
                    </div>
                    <div class="mt-auto" >
                        <span class="grid__tag">#tag1</span>
                    </div>
                </div>
            </div>
        ))
    }
        return (
            <div class="masonry">
            
            {posts}
            </div>
        )
    
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

export default connect(mapStateToProps, mapDispatchToProps)(Test)
