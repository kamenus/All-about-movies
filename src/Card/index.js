import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export default ({ 
  card,
  yearFilter,
  addPanelDisabler,
 }) => (
  <div className="card">
    <img 
      src={card.poster} 
      alt={card.title}
      className="cardImage"
    />
    <div className="cardInfo">
      { card.year  ?
       (<Link onClick={addPanelDisabler} to={`/movie/${card.title}`} ><h3> {card.title} </h3></Link>) :
       (<h3> {card.title} </h3>)}
      <table className="tableCard">
        <tbody>
          <tr>
            <td>Режиссёр: </td> 
            <td>
              {
                card.director == undefined || card.director == "N/A" ?
                  "N/A" :
                    card.director &&
                    (<Link to={`/person/${card.director[0]}`}>{card.director[0]}</Link>)
              }
            </td>
          </tr>
          <tr>
          <td>Актёры: </td> 
            <td>
              {
                card.actors == undefined || card.actors == "N/A" ?
                  'N/A' :
                  card.actors && 
                    (<Link to={`/person/${card.actors[0]}`}>{card.actors[0]}</Link>) 
              }
            </td>
          </tr>
          <tr>
          <td>Год издания: </td> 
            <td
              onClick={() => card.year != undefined && yearFilter(card.year)}
            >
              {
                card.year == undefined ?
                  "N/A" :
                  (<Link to="/">{card.year}</Link>)
              }
            </td>
          </tr>
        </tbody>    
      </table>
    </div>  
  </div> 
)