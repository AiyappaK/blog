import React from 'react';

import './filterButton.css';

const FilterButton = (props) => (
    
    <li className="btns btn-1" style={props.style} 
    onClick={props.clicked}>
    
    {props.Btnname}
     </li>

);

export default FilterButton;