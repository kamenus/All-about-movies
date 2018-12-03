import React from 'react';
import PropTypes from 'prop-types';
import './FilmCard.css';
import { Link } from 'react-router-dom'


const OMDB_KEY = '9be1e238';
const OMDB_BASE_URL = 'http://www.omdbapi.com/?t=';
const OMDB_PLOT = '&plot=full&apikey=';

const getPoster = src =>
  src === 'N/A' || !src
    ? 'https://place-hold.it/300x300?text=No%20Poster'
    : src;

const getOmdbApi = name => `${OMDB_BASE_URL}${name}${OMDB_PLOT}${OMDB_KEY}`;

export default class FilmCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.match.params.title,
      poster: '',
      director: '',
      actors: '',
      year: '',
      rating: '',
      description: '',
      error: null
    };
    this.api = getOmdbApi(this.props.title);
    this.yearFilter = this.props.yearFilter;
  }

  getData() {
    const {title} = this.state;
    fetch(`http://www.omdbapi.com/?t=${title.replace( / /g, "-")}&plot=full&apikey=9be1e238`)
      .then(response => response.json())
      .then(
        ({
          Poster: poster,
          Actors: actors,
          Director: director,
          Year: year,
          imdbRating: rating,
          Plot: description,
        }) => { 
        this.setState({
          poster: getPoster(poster),
          director,
          actors,
          year,
          rating,
          description
        });
      })
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const {
      title,
      poster,
      director,
      actors,
      year,
      rating,
      description,
      error
    } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    function renderActors() {
      if (!actors || actors === 'N/A') return ' no information';
      return actors
        .split(',')
        .slice(0, 3)
        .map(actor => <div><Link to={`/person/${director}`}>{actor}</Link></div>);
    }
    return (
      <div className="film-card">
        <div>
          <img src={poster} alt="poster" />
        </div>
        <div className="info-card">
          <h2>{title}</h2>
          <p>Director:<Link to={`/person/${director}`}>{director}</Link></p>
          <div>Actors: {renderActors()}</div>
          <p>Year: <Link to="/" onClick={ () => this.yearFilter(year)} >{year}</Link></p>
          <p>Rating: {rating}</p>
          <p className="description-film">Description: {description}</p>
        </div>
      </div>
    );
  }
}

