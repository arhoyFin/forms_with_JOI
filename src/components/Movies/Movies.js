import React, { Component } from 'react';
import {getMovies} from '../../resources/fakeMovieService';
import {Link} from 'react-router-dom';

class Movies extends Component {
    state = {
        movies:[]
    }
    componentDidMount(){
        this.setState({
            movies:getMovies()
        })
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.movies.map( movie =>(
                        <li key = {movie._id}>
                            <Link  to = { `movie/${movie._id}`}key = {movie._id} >{movie.title}</Link>
                        </li>
                    
                    ))}
                </ul>
                <button> <Link to = '/movie/new'> Add New Movie</Link> </button>
            </div>

        );
    }
}

export default Movies;