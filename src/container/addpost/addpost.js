import React, { Component } from 'react';
import './addpost.css';
import firebase from '../../firebase';
import imageCompression from 'browser-image-compression';
import { connect } from 'react-redux';
import * as addActions from '../../store/actions/addaction';


// import Post from "../../components/UI/posts/post";
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import axios from "./../../../axios-orders";
const initalState = {
    title: '',
    Url: '',
    caption: '',
    Album: '',
    imgaes: '',
    name: '',
    gsurl:'',
    iError: "",
    captionError: "",
    imgaesError: "",
    selectedID: null
}

class Addpost extends Component {
    state = initalState;
    handlechange = (event) => {
        const name = [event.target.name]
        let value = event.target.value

        this.setState({
            [name]: value
        });
       
    }
    validate = (value) => {
        let iError = "";

        if ((!this.state.title) || (!this.state.caption || !this.state.Album || (!this.state.imgaes))) {
            iError = "cannot be blank"
        }
        if (iError) {
            this.setState({ iError });
            return false;
        }
        // if (!this.state.caption)   {
        //     captionError = "cannot be blank"
        // }
        // if (captionError) {
        //     this.setState({captionError});
        //     return false;
        // }
        return true;
    }


    SubmitImage = async (e) => {
        this.validate()
        e.preventDefault();
        const i = this.state.imgaes;
        console.log(i.name);
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
        this.setState({ name: i.name });

        // console.log(fileRef );
        console.log('i.statename', this.state.name);
        console.log( 'i', i);

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
                
                let storage = firebase.storage();
                let fileRe = (`gs://blog-3dcd5.appspot.com/${i.name}`);
                this.setState({ gsurl: fileRe });
                console.log("File in database before delete exists : "+ this.state.gsurl)


                fileRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    this.setState({ Url: downloadURL });
                    
                    // this.setState(prevState => ({
                        // ...prevState, to delete a file you have to save i.name and fileRe in datatbase link https://firebase.google.com/docs/storage/web/delete-files  
                    //         post:{
                    //             ...prevState.post,
                    //             Url : downloadURL
                    //     }
                                
                    // }))
                    this.posts()
                    // console.log(this.state.Url);
                });
                // setTimeout(() => {
                //     this.posts() if it takes long time then use this
                // }, 5000); 
            },
        );
    }

    posts = () => {

        const I = {
            title: this.state.title,
            caption: this.state.caption,
            Url: this.state.Url,
            Album: this.state.Album,
            gsurl: this.state.gsurl,
            name: this.state.name
        };
        console.log(I);

        this.props.onAddPost(I) 
        
    }
    postSelectedHandler = (id) => {
        this.setState({ selectedID: id });
        console.log('the', id);
        // this.props.history.push('/'); 
    }

    render() {
        return (
            <div className="Contaner">
                <form className="form-horizontal" onSubmit={this.SubmitImage}>
                    <fieldset>
                        <div>
                            <label for="title">Title: </label>
                            <input type="text" id="title"
                                value={this.state.title}
                                onChange={this.handlechange}
                                name="title" />
                                <span className="text-danger">{this.state.iError}</span>
                        </div>
                        <div>
                            <label for="caption">Caption :</label>
                            <input type="text" id="caption" value={this.state.caption}
                                onChange={this.handlechange}
                                name="caption" />
                                <span className="text-danger">{this.state.iError}</span>
                        </div>
                        <div>
                            <label for="Album">Album Name: </label>
                            <input type="text" id="Album"
                                value={this.state.Album}
                                onChange={this.handlechange}
                                name="Album" />
                                <span className="text-danger">{this.state.iError}</span>
                        </div>
                        <div>
                            <label for="myFile">Select File :</label>
                            <input type="file" id="myFile" name="filename"
                                onChange={(event) => this.setState({ imgaes: event.target.files[0] })}>
                            </input>
                            <span className="text-danger">{this.state.iError}</span>
                        </div>
                        <div>
                            <button type="Submit">Add Post</button>
                        </div>
                    </fieldset>
                </form>
                <div>
                    {/*this.state.posts.map(order => (
                        <Link to={'/fullpost/' + order.id} key={order.id} >
                            <Post key={order.id}
                                clicked={() => this.postSelectedHandler(order.id)}
                                title={order.title}
                                caption={order.caption}
                                img={order.Url}
                            />
                        </Link>
                    ))*/}
                </div>
                <div>
                </div>
               
            </div>

        );
    }
}
const mapStateToProps = state => {
    return {
        // posts: state.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: (post) => dispatch(addActions.initView(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Addpost);