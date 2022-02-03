import * as actionTypes from '../actions/actiontypes';

const initialState = {
    posts: [],
    loading: false,
    isSignup: false,
    blogs: [],
    select: false,
    selected: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_POST:
            const newPost = {
                ...action.post,
                id: action.postid
            };
            return {
                ...state,
                posts: state.posts.concat(newPost),
                loading: true
                
            }
        case actionTypes.VIEW_POST_START:
            return {
                ...state,
                loading: true
            }
        // this can be used for ui designs
        case actionTypes.VIEW_POST_SUCCESS:
            return {
                ...state,
                posts: action.post,
                loading: false
            }
            case actionTypes.VIEW_SELECTED_BLOG_START:
                return {
                    ...state,
                    loading: true
                }
        case actionTypes.VIEW_SELECTED_BLOG_SUCCESS:
            return {
                ...state,
                 selected: action.select,
                 id: action.id,
                 select:true,
                loading: false
            }
            case actionTypes.UPDATED_SUCESS:
                return {
                    ...state,
                     selected: [],
                     id: '',
                     select:false,
                    loading: false
                }

        case actionTypes.VIEW_POST_FAIL:
            return {
                ...state
            }
        case actionTypes.IS_AUTH:
            return {
                ...state,
                isSignup: true
            } 
        case actionTypes.IS_NOTAUTH:
            return{
                ...state,
                isSignup:false
            }
        case actionTypes.VIEW_BLOG_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.VIEW_BLOG_SUCCESS:
            return {
                ...state,
                blogs: action.blog,
                loading: false
            }
        case actionTypes.VIEW_BLOG_FAIL:
            return {
                ...state
            }
        default:
            return state;

    }
};

export default reducer;