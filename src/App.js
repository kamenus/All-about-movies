import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import CardList from './CardList';
import Header from './Header';
import FilmCard from './FilmCard/FilmCard';
import Person from './PersonCard/Person'

export default class App extends Component {
  state = {
    cardlist: [],
    sessionCards: [],
    offset: 0,
    filteredOffset: 0,
    isSearchOn: false,
    searchValue: '',
    yearToFilter: '',
    isFilterOn: false,
    isComponent: false,
    yearForDiv: '',
  }

  addPanelDisabler = () =>
    this.setState({ isComponent: true })

  changeHandler = name => event => 
    this.setState({ [name]: event.target.value })

  increaseOffset = () => {
    const { offset } = this.state;
    if (offset < 380) { 
      this.setState({ offset: offset + 20 });
      this.fetchComp( offset + 20 );
    }  
  } 

  resetFilter = () => {
    this.setState({ 
      isSearchOn: false,
      searchValue: '', 
      isFilterOn: false,
      isComponent: false,
      offset: 0,
    })
    this.fetchComp( 0 )
  }

  yearFilter = dateToFilter =>{
    dateToFilter ? 
      this.setState({ 
        isFilterOn: true,
        yearToFilter: '', 
        yearForDiv: dateToFilter,
      }) :
      this.setState({
        isFilterOn: false
      })

    dateToFilter ?
      this.miniFetch('', [], dateToFilter, 0) :
      this.fetchComp( 0 )
  }

  miniFetch = ( 
    searchValue,
    filteredCards,
    dateToFilter,
    offset,
  ) => {
    let cards = [];
    let shouldFilter = true;

    fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json/?api-key=10b8fdb9313348298112b2e8e0e3e7b2&offset=${offset}`)
    .then(response => response.json())
    .then( ({ results }) => {
      cards = results.map(
        ({ 
          display_title: title, 
          multimedia: {src: poster},
          publication_date: date 
        }) => ({ 
          title,
          poster,
          date,
        }))
        
        cards.forEach( (card, id) => {
          fetch(`http://www.omdbapi.com/?t=${card.title.replace( / /g, "-")}&apikey=9be1e238`)
            .then(response => response.json())
            .then( 
              ({
                Director: director,
                Year: year,
                Actors: actors,
                Metascore: rating,
              }) => {
                if ((card.title.toLowerCase().indexOf(searchValue.toLowerCase()) != -1 || !searchValue) && 
                ( year == dateToFilter || !dateToFilter) ) {
                  card.director = director && director.split(', ');
                  card.year = year;
                  card.actors = actors && actors.split(', ');
                  card.rating = rating;
                  filteredCards.push(card)
                }
              } 
            )
            .then( () => (id === 19) && 
              this.setState({ cardlist: filteredCards }) )
        }
      )
    })  
    if (shouldFilter) {
      offset += 20;
      (offset < 300) && this.miniFetch(searchValue, filteredCards, dateToFilter, offset) 
    }  
  }

  fetchForSearch = offset => {
    const { 
      searchValue, 
    } = this.state;

    searchValue ?
      this.setState({ 
        searchValue: '',
        isSearchOn: true
      }) :
      this.setState({
         isSearchOn: false,
         offset: 0,
      })
    let filteredCards = []; 
    searchValue ?
      this.miniFetch(searchValue, filteredCards,'', offset) :
      this.fetchComp( 0 )
  
  }

  fetchComp = offset => {
    let cards = [];
    fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json/?api-key=10b8fdb9313348298112b2e8e0e3e7b2&offset=${offset}`)
    .then(response => response.json())
    .then( ({ results }) => {
      cards = results.map(
        ({ 
          display_title: title, 
          multimedia: {src: poster} 
        }) => ({ 
          title,
          poster,
        }))
        
      cards.forEach( (card, id) => {
        fetch(`http://www.omdbapi.com/?t=${card.title.replace( / /g, "-")}&apikey=9be1e238`)
          .then(response => response.json())
          .then( 
            ({
              Director: director,
              Year: year,
              Actors: actors,
              Metascore: rating,
            }) => {
              card.director = director && director.split(', ');
              card.year = year;
              card.actors = actors && actors.split(', ');
              card.rating = rating;
            }  
          )
          .then( () => offset  ? 
            ((id == 19) && this.setState({ cardlist: [...this.state.cardlist, ...cards] })) :
            this.setState({ cardlist: cards }) ) 
      })
    })
  }

  componentDidMount() {
    this.fetchComp( 0 );
  }    

  render() {
    const { 
      cardlist,
      searchValue,
      isFilterOn,
      yearToFilter,
      isComponent,
      yearForDiv,
    } = this.state;
    return (
      <div className='app'>
        <Header 
          changeHandler={this.changeHandler}
          searchValue={searchValue}
          fetchForSearch={this.fetchForSearch}
          resetFilter={this.resetFilter}
          isComponent={isComponent}
          yearToFilter={yearToFilter}
          yearFilter={this.yearFilter}
        />
        <section className="content">
          <Route exact path="/" render={ () => 
            ( <CardList 
                cards={cardlist} 
                increaseOffset={this.increaseOffset} 
                isSearchOn={this.state.isSearchOn} 
                isFilterOn={isFilterOn}
                yearFilter={this.yearFilter}
                addPanelDisabler={this.addPanelDisabler}
                yearForDiv={yearForDiv}
              />)}
          />
          <Route path="/movie/:title" render={ ({match}) => (<FilmCard match={match} yearFilter={this.yearFilter} />) }/>
          <Route path="/person" component={Person} />
        </section>
      </div>
    )
  }
} 