import React from 'react';

const AddForm = (props) =>(
    <form className="form-horizontal" onSubmit={props.submmited}>
    <fieldset>
        <div>
            <label for="title">Title: </label>
            <input type="text" id="title"
                value={this.state.title}
                onChange={this.handlechange}
                name="title" />
            <div>{this.state.iError}</div>
        </div>
        <div>
            <label for="caption">Caption :</label>
            <input type="text" id="caption" value={this.state.caption}
                onChange={this.handlechange}
                name="caption" />
            <div>{this.state.iError}</div>
        </div>
        <div>
            <label for="myFile">Select File :</label>
            <input type="file" id="myFile" name="filename"
                onChange={(event) => this.setState({ imgaes: event.target.files[0] })}></input>
        </div>
        <div>
            <button type="Submit">Add Post</button>
        </div>
    </fieldset>
</form>

);