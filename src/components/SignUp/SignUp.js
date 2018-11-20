import React, { Component } from 'react';
import Form from '../UI/Form/Form';
import Joi from 'joi';
import _ from 'lodash';

class SignUp extends Component {
    state = {
        formData:{
            name:{
                element:'input',
                value: '',
                label: true,
                labelText: 'First Name',
                config: {
                    name: 'name_input',
                    placeholder:'Enter Name',
                    type: 'text'
                }
            },
            lastname:{
                element:'input',
                value: '',
                label: true,
                labelText: 'Last Name',
                config: {
                    name: 'lastname_input',
                    placeholder:'Enter Last Name',
                    type: 'text'
                }
            },
            age:{
                element:'select',
                value: '',
                label: true,
                labelText: 'Age',
                config: {
                    name: 'age_select',
                    options: [ 
                        { value: 1, text: 'under 18' },
                        { value: 2, text: '18-24' },
                        { value: 3, text: '25-44' },
                        { value: 4, text: '45-65' },
                        { value: 5, text: 'over 65' }
                    ]
                }
            },
            password:{
                element:'input',
                value: '',
                label: true,
                labelText: 'Password',
                config: {
                    name: 'password_input',
                    placeholder:'Your secret password',
                    type: 'password'
                }
            },
            comments:{
                element:'textarea',
                value: '',
                label: true,
                labelText: 'Additional Comments',
                config: {
                    name: 'comments_textarea',
                    rows: 4,
                    cols: 36
                }
            }
        },
        errors: {}
    }
    schema = {
        name: Joi.string().min(2).required(),
        lastname: Joi.string().min(1).required(),
        age: Joi.any(),
        password: Joi.string().min(5).required(),
        comments: Joi.string()
    }

    validate = () => {
        const errors = {};
        for (let field in this.state.formData) {
            const fieldValue = this.state.formData[field].value;
            const validation = Joi.validate(fieldValue,this.schema[field]);
            if(_.isNull(validation.error) || _.isUndefined(validation.error)){
                errors[field.name] = '';
             }
             else{
                 let message = validation.error.details[0].message
                     message = _.replace(message,'value',field.label);
                 errors[field] = message;
 
             }
        }
        //  const validation = Joi.validate(field.value,this.schema[field.name])
        return errors;
    }
    submitFormHandler = (e) =>{
        e.preventDefault();
       // console.log(this.state);
       let dataToSubmit = {};
       for (let key in this.state.formData){
           dataToSubmit[key] =  this.state.formData[key].value; //only need values of the form data.
       }
       // run validation
       const errors = this.validate();
       this.setState({errors: errors || {}  });

       for(let error in errors){
           if(errors[error] !== ''){
               console.log('there is at least one error');
               return;
           }
       }
       // axios to post data to server
       console.log(dataToSubmit);
    }

    updateForm = (formData)=>{
        this.setState({formData})
    }
    render() {
        return (
            <div className = "container">
              <Form
                  onSubmit = {this.submitFormHandler}
                  data = {this.state.formData}
                  buttonName = "submit form"
                  change = { (formData) => this.updateForm(formData)}
              />
            </div>
        );
    }
}

export default SignUp;