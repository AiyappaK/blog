import './fullpost.css'
import React, { Component } from 'react';
import axios from "axios";

class Fullpost extends Component {
    state = {
        loadedPost: []
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
                axios.get('https://blog-3dcd5-default-rtdb.firebaseio.com/posts/' + this.props.match.params.id+'.json')
                    .then(res => {
                        console.log(res.data);
                                                
                        this.setState({ loadedPost: res.data });
                        console.log(this.state.loadedPost);
                    })
                    .catch(err => {
                        console.log(err);

                })
            }
        }
    }

    render() {
        let post;
        if (this.state.loadedPost) {
            post = (
                <div >
                <form className="form-horizontal" onSubmit={this.SubmitImage}>
                    <fieldset>
                        <div>
                            <label for="title">Title: </label>
                            <input type="text" id="title"
                                value={this.state.loadedPost.title}
                                onChange={this.handlechange}
                                name="title" />
                        </div>
                        <div>
                            <label for="caption">Caption :</label>
                            <input type="text" id="caption" value={this.state.loadedPost.caption}
                                onChange={this.handlechange}
                                name="caption" />
                            
                        </div>
                        <div>
                            <img src={this.state.loadedPost.Url} alt="new img"/>
                            <label for="myFile">Select File :</label>
                            <input type="file" id="myFile" name="filename"
                                onChange={(event) => this.setState({ imgaes: event.target.files[0] })}></input>
                            
                        </div>
                        <div>
                            <button type="Submit">Add Post</button>
                        </div>
                    </fieldset>
                </form>
            
                {/*<div class="fond"> 
                <span class="s1">blog </span>
                <span class="s2">card</span>
                </div>
                <div class="card">
                    <div class="thumbnail">
                    <img class="left" src="https://cdn2.hubspot.net/hubfs/322787/Mychefcom/images/BLOG/Header-Blog/photo-culinaire-pexels.jpg" />
                    </div>
                    <div class="right">
                        <h1>Why you Need More Magnesium in Your Daily Diet</h1>
                        <div class="author"><img src="https://randomuser.me/api/portraits/men/95.jpg" />
                            <h2>Igor MARTY</h2>
                        </div>
                        <div class="separator"></div>
                        <p>Magnesium is one of the six essential macro-minerals that is required by the body for energy production and synthesis of protein and enzymes. It contributes to the development of bones and most importantly it is responsible for synthesis of your DNA and RNA. A new report that has appeared in theBritish Journal of Cancer, gives you another reason to add more magnesium to your diet...</p>
                    </div>
                    <div class="fab"><i class="fa fa-arrow-down fa-3x"> </i></div>
                </div>*/}
                </div>

            );
        }
        return post;
    }
}

export default Fullpost;


