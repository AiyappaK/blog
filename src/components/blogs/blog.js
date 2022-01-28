import React from 'react';

const Blog =(props)=>(
    <div>
        <img src={props.images}/>
        <p>{props.detalis}</p>
        <span>...</span>
    </div>
);

export default Blog