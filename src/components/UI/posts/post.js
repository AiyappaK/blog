import React from 'react';
import FilterButton from '../ButtonsFilter/filterButton';
import './post.css';
let mystyle = {
	fontSize: "15px",
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	color: "white",
	padding: "10px",
};

const posts = (props) => {
	const items = [];

	for (let ids in props.id) {
		items.push(
			{
				id: ids,
			}
		);
	}
	return (
		<div class="blog-card" key={items.id}>
			<img class="blog-img" src={props.img} alt="NEw IMages" onClick={props.clicked} />
			<div class="text-overlay">
				<h5>{props.title} </h5>
				<p class="blog-imgp">{props.caption} </p>
				<h5>{props.Album}</h5>
				
			</div>
{/*
	make a class and add setstate stament  and use below link
	https://codepen.io/kotomoika/pen/RVOKxR?editors=0010 code
	try yo access images
	https://www.youtube.com/watch?v=vUe91uOx7R0
<FilterButton style={mystyle} Btnname='Click' clicked={props.imageView}/>*/}
		</div>

	)
};
export default posts;