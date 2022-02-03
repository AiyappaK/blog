import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AddForm from "../../components/form/addfrom";
import SelectedBlog from "../../components/selectedBlog/selectedblog";
import firebase from '../../firebase';
import Button from "../../components/UI/Button/Button"
import Post from "../../components/UI/posts/post";
import Spinner from "../../components/UI/spinner/Spinner";
import * as addActions from '../../store/actions/addaction';

import classes from './view.module.css';
const View = (props) => {
    const { onViewPost , selected} = props;

    const [title, setTitle] = useState('');
    const [caption, setcaption] = useState('');
    const [Url, setUrl] = useState('');
    const [Image, setImage] = useState('');
    const [name, setname] = useState('');
    const [gsurl, setgsurl] = useState('');
   
    // console.log("this.is", props.selected);
    // console.log("this is", Image);

    useEffect(() => {
        props.selected.map(order => (
            setTitle(order.title),
            setUrl(order.Image),
            setcaption(order.caption),
            setgsurl(order.gsurl),
            setname(order.name)
        ))
        console.log(title, caption, Image, name, gsurl);
    },[selected]);

    useEffect(() => {
        onViewPost();
    }, [onViewPost]);

    const Submitted = (e) => {
        e.preventDefault();
        console.log(title, caption, Url);
        let storageRef = firebase.storage().ref();

        const file = storageRef.child(name);
        file.delete().then(() => {
            console.log('file deleted');
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });

        let metadata = {
            contentType: 'image/jpeg'
        };

        const i = Url;
        setname(i.name)
        console.log(i.name);
        const fileRef = storageRef.child(i.name)
        .put(i, metadata);
        fileRef.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                let progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error);
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                let fileRe = (`gs://blog-3dcd5.appspot.com/${i.name}`);
                setgsurl(fileRe);
                fileRef.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImage(downloadURL);
                    // update()
                });
            },
            
        );
    }

    useEffect(()=>{
        if (Image !== '') {
         update()
        }
     },[Image]);

   const update = () => {
        console.log("here");
        const I = {
            title: title,
            caption: caption,
            Image: Image,
            name: name,
            gsurl: gsurl
        }
        console.log(I);
        props.onUpdate(props.id, I);
        
        
        console.log('this is updated eith' , props.id,I);
    }
    let selectedBlog = <p>Please select to update </p>
    if (props.select) {
        selectedBlog =
            <div className={classes.Contaner}>
                <form className={classes.form_horizontal} autoComplete="off"
                    onSubmit={Submitted}>
                    <fieldset>
                        <div>
                            <label for="title">Title: </label>
                            <input type="text" id="title"
                                placeholder='Enter Title'
                                defaultValue={title}
                                onChange={event => setTitle(event.target.value)}

                                name="title" />
                            <span className="text-danger"></span>
                        </div>
                        <div>
                            <label for="caption">Caption :</label>
                            <input type="text" id="caption"
                                defaultValue={caption}
                                onChange={event => setcaption(event.target.value)}

                                placeholder='Enter Caption'
                                name="caption" />
                            <span className="text-danger"></span>
                        </div>

                        <div>
                            <label for="myFile">Select File :</label>
                            <input className={classes.file}
                                type="file" id="myFile"
                                name="filename"

                                onChange={(event) => setUrl(event.target.files[0])}

                            />
                            <span className="text-danger"></span>
                        </div>
                        <div>
                            <button className={classes.button} type="Submit">Add Post</button>
                        </div>
                    </fieldset>
                </form>
            </div>

    }


    const selectedEdit = (e) => {
        
        props.onSelectedPost(e)
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
    const Selecteddelete = (id, name) => {
        let storageRef = firebase.storage().ref();
        const file = storageRef.child(name);
        file.delete().then(() => {
            console.log('file deleted');
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
        props.onDelete(id)
    }


    let posts = <Spinner />
    if (!props.loading) {
        posts = props.blogs.map(order => (
            <div key={order.id}>
                <Post

                    title={order.title}
                    caption={order.caption}
                    img={order.Image}
                    
                />
                <Button btnType="Success" clicked={() => selectedEdit(order.id)}>Edit</Button>
                <Button btnType="Danger" clicked={() => Selecteddelete(order.id, order.name)}>Delete</Button>
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
        select: state.select,
        selected: state.selected,
        id:state.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onViewPost: () => dispatch(addActions.ViewBlog()),
        onSelectedPost: (SeId) => dispatch(addActions.selectedPost(SeId)),
        onDelete: (id) => dispatch(addActions.deleted(id)),
        onUpdate: (sId, data)=>dispatch(addActions.updated(sId, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)