import React, { Component } from 'react';
import Form from '../UI/Form/Form';
import Joi from 'joi';
import _ from 'lodash';
import {getMovie} from '../../resources/fakeMovieService';
import {getGenres} from '../../resources/fakeGenreService';
class AddEditMovie extends Component {
    componentDidMount(){
 

        const movieId = this.props.match.params.id;
        if (movieId === "new") return;
        const movie = getMovie(movieId);
        if(!movie) return this.props.history.replace('/movie/movie-not-found');

        const genres = getGenres();
  
        const movieGenreId = movie.genre._id;
 
        const g = genres.findIndex(g=>g._id === movieGenreId)
        const genre = genres[g].name.toLowerCase();
        console.log(genre);
     
     
        
        this.setState({formData: this.mapToViewModel(movie,genre)})
    }
    state = {
        movieId: '',
        formType: '',
        formData:{
            title:{
                element:'input',
                value: '',
                label: true,
                labelText: 'Title',
                config: {
                    name: 'name_input',
                    placeholder:'',
                    type: 'text'
                }
            },
            genre:{
                element:'select',
                value: '',
                label: true,
                labelText: 'Genre',
                config: {
                    name: 'age_select',
                    options: [ 
                        { value: 'comedy', text: 'Comedy' },
                        { value: 'thriller', text: 'Thriller' },
                        { value: 'action', text: 'Action' }
                    ]
                }
            },
            numberInStock:{
                element:'input',
                value: '',
                label: true,
                labelText: 'Number In Stock',
                config: {
                    name: 'numberInStock_input',
                    placeholder:'',
                    type: 'number'
                }
            },
         
            dailyRentalRate:{
                element:'input',
                value: '',
                label: true,
                labelText: 'Rating',
                config: {
                    name: 'rating_input',
                    placeholder:'',
                    type: 'number'
                }
            }
        },
        errors: {}
    }
    schema = {
        title: Joi.string().min(2).required(),
        genre: Joi.any(),
        numberInStock: Joi.string().min(1),
        dailyRentalRate: Joi.string().min(1)
    }

    mapToViewModel = (movie,genre)=>{
      const formData = {...this.state.formData};
      const updatedForm = {
        _id : movie._id,
        title: movie.title,
        genre: genre,
        numberInStock:movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate

      }
      console.log(formData);
      for (let key in formData){
          for(let stuff in updatedForm){
              if(key === stuff){
                  formData[key].value = updatedForm[key]
              }
          }
      }
  
     return formData
    
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

export default AddEditMovie;