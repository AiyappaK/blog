import React, { useEffect } from "react";
import { connect } from "react-redux";
import AddForm from "../../components/form/addfrom";
import SelectedBlog from "../../components/selectedBlog/selectedblog";
// import FilterButton from "../../components/UI/ButtonsFilter/filterButton";
import Button from "../../components/UI/Button/Button"
import Post from "../../components/UI/posts/post";
import Spinner from "../../components/UI/spinner/Spinner";
import * as addActions from '../../store/actions/addaction';

import classes from './view.module.css';
const View = (props) => {
    const { onViewPost } = props;
    
    useEffect(()=>{
        onViewPost();
    },[onViewPost]); 
    
    let selectedBlog=<Spinner/>
    if (props.selected) {
    selectedBlog  = props.selected.map(order => (
        <AddForm 
        titlevalue={order.title} 
        Img={order.Image} 
        captionvalue={order.caption}
        Submitted={updated}/> 
       
    ))
    }
    const updated = ()=>{
        
    }
    const selectedEdit = (e) => {
       console.log("selected", e);
       props.onSelectedPost(e)
       console.log("reducer " , props.selected);
       {/*
            to get selected data add this url: 
            to update that selected url pull all into a state
            and then use put or patch eg {
                a: 123,
                c: efg
            }
            add a into respctive state values inside text box,
            then when you click update use same as post url like adding
            images and then update (put or patch)
            https://jasonwatmore.com/post/2021/04/22/react-axios-http-put-request-examples
            

    */}
    }
    const imageViewHandler = () =>{
    }

    console.log("this.is", props.selected);
    
    let posts = <Spinner/>
        if (!props.loading) {
            posts =props.blogs.map(order => (
                <div key={order.id}>
                <Post
                    
                    title={order.title}
                    caption={order.caption}
                    img={order.Image}
                    clicked={imageViewHandler}
                />
                <Button btnType="Success" clicked={()=>selectedEdit(order.id)}>Edit</Button>
                <Button btnType="Danger">Delete </Button>
                </div>
            ))
        }
    return (
        <div className={classes.spearate}>
            <div className={classes.left}>
                {posts}
            </div>
            <div className={classes.right}>
                <h5>Selected</h5>
                {selectedBlog}
    </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        blogs: state.blogs,
        loading: state.loading,
        selected: state.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onViewPost: () => dispatch(addActions.ViewBlog()),
        onSelectedPost: (SeId) => dispatch(addActions.selectedPost(SeId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)