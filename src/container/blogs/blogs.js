import React, { useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/spinner/Spinner';
import Addform from '../../components/form/addfrom';
import firebase from '../../firebase';
import imageCompression from 'browser-image-compression';
import * as addActions from '../../store/actions/addaction';

const Blog = (props) => {
    const [title, setTitle] = useState('');
    const [caption, setcaption] = useState('');
    const [Url, setUrl] = useState('');
    const [Image, setImage] = useState('');
    

    const SubmitImage = async (e) => {

        e.preventDefault();
        const i = Url;
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        const compressedFile = await imageCompression(i, options);
        let storageRef = firebase.storage().ref();
        let metadata = {
            contentType: 'image/jpeg'
        };

        const fileRef = storageRef.child(i.name).put(i, metadata);
        
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
                fileRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImage(downloadURL);
                    blog()
                    
                });
                // setTimeout(() => {
                    // blog()
                    // this.posts() if it takes long time then use this
                // }, 5000); 
            },
        );
    }
    const blog = () => {
        
        const I = {
            title: title,
            caption: caption,
            Image: Image,
        };
        props.onBlog(I)

    }

    return (
        <div>
        {props.loading ? <Spinner/>: null}
            <Addform/>
            <form className="form-horizontal" onSubmit={SubmitImage}>
                <fieldset>
                    <div>
                        <label for="title">Title: </label>
                        <input type="text" id="title"
                            value={props.title}
                            onChange={event => setTitle(event.target.value)}
                            name="title" />
                        <span className="text-danger">{props.iError}</span>
                    </div>
                    <div>
                        <label for="caption">Caption :</label>
                        <input type="text" id="caption" value={props.caption}
                            onChange={event => setcaption(event.target.value)}
                            name="caption" />
                        <span className="text-danger">{props.iError}</span>
                    </div>

                    <div>
                        <label for="myFile">Select File :</label>
                        <input type="file" id="myFile" name="filename"
                            onChange={(event) => setUrl(event.target.files[0])}>
                        </input>
                        <span className="text-danger">{props.iError}</span>
                    </div>
                    <div>
                        <button type="Submit">Add Post</button>
                    </div>
                </fieldset>
            </form>

        </div>
    )
}
const mapStateToProps = state => {
    return{
        
        loading: state.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onBlog: (a) => dispatch(addActions.initBlog(a))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog);