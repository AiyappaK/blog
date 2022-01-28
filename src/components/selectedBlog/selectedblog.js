import React, { useState } from 'react';

import Input from "../form/addfrom";

const SelectedBlog = (props) => {
   {/*// const [orderForm, setOrderForm] = useState({
    //     title: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text',
    //             Label:'Title',
    //             placeholder: 'Your Title'
    //         },
    //         value: '',
            //   validation: {
            //     required: true
            //   },
            //   valid: false,
            //   touched: false
        // },
        /Caption: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Caption'
            },
            value: '',
            //   validation: {
            //     required: true
            //   },
            //   valid: false,
            //   touched: false
        },
        Album: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Album'
            },
            value: '',
            //   validation: {
            //     required: true,
            //     minLength: 5,
            //     maxLength: 5,
            //     isNumeric: true
            //   },
            //   valid: false,
            //   touched: false
        },
        File: {
            elementType: 'input',
            elementConfig: {
                type: 'file',
                placeholder: 'Select File'
            },
            value: '',
            //   validation: {
            //     required: true
            //   },
            //   valid: false,
            //   touched: false
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }
    console.log(formElementsArray);
    let form = (
        <form >
            {formElementsArray.map(formElement => (
                <Input
                    Label={formElement.config.Label}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                //   invalid={!formElement.config.valid}
                //   shouldValidate={formElement.config.validation}
                //   touched={formElement.config.touched}
                //   changed={event => inputChangedHandler(event, formElement.id)}
                />
            ))}
        </form>
    );
    return (
        <div>
          {form}
          </div>
    );*/}
   

    return (
        <Input
        
        />
    )
    }
export default SelectedBlog;
