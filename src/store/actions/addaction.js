import * as actionTypes from './actiontypes';
import axios from "../../axios-orders";

export const isAuth = () => {
    return{
        type: actionTypes.IS_AUTH,       
    }
}
export const isnotAuth = () => {
    return{
        type: actionTypes.IS_NOTAUTH,
    }
}

export const addPost = (id, posts) => {
    return{
        type: actionTypes.ADD_POST,
        postid:id,
        post:posts,
    }
}

export const viewPostSucess = (post) => {
    return {
        type: actionTypes.VIEW_POST_SUCCESS,
        post:post
        // payload
    }
}
export const viewPostFail = (error) => {
    return{
        type: actionTypes.VIEW_POST_FAIL,
        error: error
    }
}
export const viewPostStart = () => {
    return{
        type: actionTypes.VIEW_POST_START,
    }
}
export const addBlog = (id, posts) => {
    return{
        type: actionTypes.ADD_POST,
        postid:id,
        post:posts,
    }
}

export const viewPost = () =>{
    return dispatch => {
        dispatch(viewPostStart())
        axios.get('https://blog-3dcd5-default-rtdb.firebaseio.com/posts.json')
        .then(res => {
            const fetched = [];
            for (let key in res.data)
                fetched.push(
                    {
                        ...res.data[key],
                        id: key
                    }
                )
                fetched.reverse()
            dispatch(viewPostSucess(fetched))                    
        })
        .catch(err => {
           dispatch(viewPostFail(err))
        })
    }
}

export const initView = (posts) => {
    return dispatch => {
        axios.post('https://blog-3dcd5-default-rtdb.firebaseio.com/posts.json', posts)
            .then(response => {
                console.log(response.data);
                dispatch(addPost(response.data.name, posts))
            })
            .catch(error => console.log(error))
    }
}

export const initBlog = (blog) => {
    return dispatch => {
        axios.post('https://blog-3dcd5-default-rtdb.firebaseio.com/blog.json', blog)
            .then(response => {
                console.log(response.data);
                dispatch(addBlog(response.data.name, blog))
            })
            .catch(error => console.log(error))
    }
}

export const viewBlogSucess = (blog) => {
    return {
        type: actionTypes.VIEW_BLOG_SUCCESS,
        blog:blog
        // payload
    }
}
export const viewBlogFail = (error) => {
    return{
        type: actionTypes.VIEW_BLOG_FAIL,
        error: error
    }
}
export const viewBlogStart = () => {
    return{
        type: actionTypes.VIEW_BLOG_START,
    }
}
export const ViewBlog = () =>{
    return dispatch => {
        dispatch(viewBlogStart())
        axios.get('https://blog-3dcd5-default-rtdb.firebaseio.com/blog.json')
        .then(res => {
            const fetched = [];
            for (let key in res.data)
                fetched.push(
                    {
                        ...res.data[key],
                        id: key
                    }
                )
                fetched.reverse()
                console.log(fetched);
            dispatch(viewBlogSucess(fetched))                    
        })
        .catch(err => {
           dispatch(viewBlogFail(err))
        })
    }

}

export const selectedPost = (id) =>{
    return dispatch => {
        dispatch(selectedBlogStart())
        axios.get(`https://blog-3dcd5-default-rtdb.firebaseio.com/blog/${id}.json`)
        .then(res => {
            console.log(res.data ,id);
            const fetched = [res.data];
            console.log(fetched);
            //     fetched.reverse()
                // console.log('fetched',fetched);
                
            dispatch(selectedBlogSucess(fetched, id) )                   
        })
        .catch(err => {
            console.log(err);
        //    dispatch(viewBlogFail(err))
        })
    }
}
export const selectedBlogStart = () => {
    return {
        type: actionTypes.VIEW_SELECTED_BLOG_START,
    }
}

export const selectedBlogSucess = (blog , id) => {
    return {
        type: actionTypes.VIEW_SELECTED_BLOG_SUCCESS,
        select:blog,
        id: id
        // payload
    }
}
export const updatedSucess = () => {
    return {
        type: actionTypes.UPDATED_SUCESS,
        
    }
}
export const updated = (id, data) =>{
    return dispatch => {
        axios.put(`https://blog-3dcd5-default-rtdb.firebaseio.com/blog/${id}.json`,data)
        .then(response => {
            dispatch (updatedSucess())
            dispatch(ViewBlog())
            console.log(response)})
            // setTimeout(() => {
            // }, 5000);
    }
}
export const deleted = (id) =>{
    return dispatch => {
        axios.delete(`https://blog-3dcd5-default-rtdb.firebaseio.com/blog/${id}.json`)
        .then(response => {
            dispatch(ViewBlog())
            console.log(response)})
            // setTimeout(() => {
            // }, 5000);
    }
}