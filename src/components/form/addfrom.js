import React from 'react';
import Aux from '../../hoc/Aux/aux';
import classes from './addform.module.css';

const addForm = (props) => (
    // {let inputElement, labels = null
    // const inputClasses = [classes.Contaner];

    // // if (props.invalid && props.shouldValidate && props.touched) {
    // //     inputClasses.push(classes.Invalid)
    // // }

    // switch(props.elementType){
    //     case('input'):
    //             labels = <label className={classes.Label}>{props.elementConfig.label}</label>;
    //             inputElement = <input 
    //             className={inputClasses.join(' ')} 
    //             {...props.elementConfig}
    //             value={props.value} onChange={props.changed} 
    //         />
    //         break;
    //     case('textarea'):
    //         inputElement = <textarea 
    //         className={inputClasses}  
    //         {...props.elementConfig}
    //         value={props.value} onChange={props.changed} />
    //         break;
    //     case('select'):
    //         inputElement = (
    //             <select
    //                 className={inputClasses}  
    //                 value={props.value}
    //                 onChange={props.changed} >
    //                 {props.elementConfig.options.map(option => (
    //                     <option key={option.value} value={option.value}>
    //                         {option.displayValue}
    //                     </option>
    //                 ))}

    //             </select>
    //         )
    //         break;
    //     default:
    //         inputElement = <input 
    //         className={inputClasses}  
    //         {...props.elementConfig}
    //         value={props.value} onChange={props.changed} />

    // }
    // return(
    //     <div className={classes.Contaner}>
    //     <label className={classes.Label}>{props.label}</label>
    //     {labels}
    //         {inputElement}
    // </div>

    // );}
    <Aux>
        <div className={classes.Contaner}>
            <form className={classes.form_horizontal} autocomplete="off" onSubmit={props.Submitted}>
                <fieldset>
                    <div>
                        <label for="title">Title: </label>
                        <input type="text" id="title"
                            placeholder='Enter Title'
                            value={props.titlevalue}
                            onChange={props.titlechanged}
                            name="title" />
                        <span className="text-danger"></span>
                    </div>
                    <div>
                        <label for="caption">Caption :</label>
                        <input type="text" id="caption"
                            value={props.captionvalue}
                            onChange={props.captionchanged}
                            placeholder='Enter Caption'
                            name="caption" />
                        <span className="text-danger"></span>
                    </div>
                    <div>
                        <label for="Album">Album Name: </label>
                        <input type="text" id="Album"
                            value={props.Albumvalue}
                            onChange={props.Albumchanged}
                            placeholder='Enter Album'
                            name="Album" />
                        <span className="text-danger"></span>
                    </div>
                    <div>
                        <label for="myFile">Select File :</label>
                        <img src={props.Img} width="300px" height="300px"/>
                        <input className={classes.file}
                            type="file" id="myFile"
                            name="filename"
                            value={props.myFilevalue}
                            onChange={props.fileChanged}
                        />
                        <span className="text-danger"></span>
                    </div>
                    <div>
                        <button className={classes.button} type="Submit">Add Post</button>
                    </div>
                </fieldset>
            </form>
        </div>
    </Aux>
)
export default addForm;