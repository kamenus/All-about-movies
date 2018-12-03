import React from 'react';
import getOmdbApi from './omdbApi';
import './index.css';

export default class FilmCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.match.params.title,
      Poster: '',
      Director: '',
      Actors: '',
      Year: '',
      Ratings: '',
      Description: '',
      error: null,
    };

    this.api = getOmdbApi(this.state.title);
  }

  getPoster = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result => result.Poster && this.setState({ Poster: result.Poster }));
  };

  getDirector = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result => this.setState({ Director: result.Director }));
  };

  getActors = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result => this.setState({ Actors: result.Actors }));
  };

  getYear = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result => this.setState({ Year: result.Year }));
  };

  getDescription = () => {
    fetch(this.api)
      .then(response => response.json())
      .then(result => this.setState({ Description: result.Plot }));
  };

  componentDidMount() {
    this.getPoster();
    this.getDirector();
    this.getActors();
    this.getYear();
    this.getDescription();
  }

  render() {
    const { Title } = this.props;

    const {
      Poster,
      Director,
      Actors,
      Year,
      Description,
      title
    } = this.state;

    return (
      <div className="film-card">
        <img src={Poster} alt="poster" />
        <div className="info-card">
          <h2>{title}</h2>
          <p>Director: {Director}</p>
          <p>Actors: {Actors}</p>
          <p>Year: {Year}</p>
          <p className="description-film">Description: {Description}</p>
          <p>Review: </p>
        </div>
      </div>
    );
  }
}