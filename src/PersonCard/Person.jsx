import React, { Component } from "react";
import "./Person.css";

const baseApiUrl = "https://api.themoviedb.org/3/person/";
const apiFullEnd = "?api_key=f250a184a6e21e892f5241a44eddc765&language=en-US";
const imgBaseUrl = "https://image.tmdb.org/t/p/w500";
const imgPlaceholder = "https://place-hold.it/300x300?text=No%20Poster";
const uniqueId = () => Math.floor(Math.random() * 10000);

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: undefined,
      active: true,
    };
    this.togglePop = this.togglePop.bind(this);
    this.getPerson = this.getPerson.bind(this);
  }

  componentDidMount() {
    this.getPerson();
  }

  getPerson() {
    const id = uniqueId();

    const fetch1 = fetch(`${baseApiUrl}${id}${apiFullEnd}`)
      .then(response => response.json())
      .then(res =>
        this.setState({
          person: {
            name: res.name,
            affiliation: res.known_for_department,
            bio: res.biography,
            img: `${imgBaseUrl}${res.profile_path}`
          }
        })
      );

    const fetch2 = fetch(`${baseApiUrl}${id}/movie_credits${apiFullEnd}`)
      .then(response => response.json())
      .then(res => {
        let movies = [];

        if (res.cast && res.cast.length !== 0) {
          movies = res.cast.map((m, i) => {
            if (i <= 3) {
              return m.title;
            } else return m;
          });

          this.setState(
            {
              person: {
                ...this.state.person,
                movies: movies.slice(0, 3)
              }
            },
          );
        } else if (res.crew && res.crew.length !== 0) {
          movies = res.crew.map((m, i) => {
            if (i <= 3) {
              return m.title;
            } else return m;
          });

          this.setState(
            {
              person: {
                ...this.state.person,
                movies: movies.slice(0, 3)
              }
            },
          );
        } else {
          this.setState(
            {
              person: {
                ...this.state.person,
                movies
              }
            },
          );
        }
      });
    Promise.all([fetch1, fetch2]);
  }
  render() {
    const { active } = this.state;

    if (this.state["person"] !== undefined) {
      const { affiliation, name, bio, img, movies } = this.state.person; 
      return (
        <div>
          <div className={"person-pop " + (active ? "person-pop-active" : "")}>
            <aside>
              PERSON <br /> REVIEW
            </aside>
            <div className="image-container">
              {img !== `${imgBaseUrl}null` &&
              img !== `${imgBaseUrl}undefined` ? (
                <img className="img-person" src={img} alt=" PERSON IMAGE" />
              ) : (
                <img className="img-person" src={imgPlaceholder} alt=" IMAGE NOT PROVIDED" />
              )}
            </div>
            <div className="person-info">
              <div className="col1">
                {name ? (
                  <div id="name">
                    <strong>NAME | </strong>
                    {name.toUpperCase()} ||
                  </div>
                ) : (
                  <div>
                    <strong>NAME | </strong> N/A{" "}
                  </div>
                )}
                {affiliation ? (
                  <div id="affiliation">
                    <strong>AFFILIATION | </strong>
                    {affiliation.toUpperCase()} ||
                  </div>
                ) : (
                  <div>
                    <strong>AFFILIATION | </strong> N/A{" "}
                  </div>
                )}
                <div id="movies">
                  <strong>MOVIES | </strong>
                  {movies && movies.length !== 0
                    ? movies.map((movie, i) =>
                        i !== movies.length - 1
                          ? `${movie.toUpperCase()} || `
                          : `${movie.toUpperCase()} `
                      )
                    : "N/A"}
                </div>
              </div>
              <div className="col2">
                {bio ? (
                  <div id="bio">
                    <strong>BIO | </strong>
                    {bio.substring(0, 290).toUpperCase() + " ..."}
                  </div>
                ) : (
                  <div>
                    <strong>BIO | </strong> N/A{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
          {!active ? (
            <button id="closed" onClick={this.togglePop}>
              +
            </button>
          ) : null}
        </div>
      );
    } else {
      return (
        <div>
          <div className={"person-pop " + (active ? "person-pop-active" : "")}>
            <aside>
              PERSON <br /> REVIEW
            </aside>
            <div>Loading</div>
            <button id="close" onClick={this.togglePop}>
              +
            </button>
          </div>
          {!active ? (
            <button id="closed" onClick={this.togglePop}>
              +
            </button>
          ) : null}
        </div>
      );
    }
  }
  togglePop() {
    if (this.state.active) this.getPerson();
    this.setState({
      active: !this.state.active
    });
  }
}

export default Person;
