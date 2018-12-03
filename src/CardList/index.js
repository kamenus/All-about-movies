import React from 'react';
import Card from '../Card';

export default ({ 
  cards,
  increaseOffset,
  isSearchOn,
  yearFilter,
  isFilterOn,
  addPanelDisabler,
  yearForDiv,
 }) => (
  <div>
    {isFilterOn && (
          <div>
            <h2>Фильмы за {yearForDiv} год</h2>
          </div>
        )}
    <div className="cardList">
    
      {cards && cards.map( card => (
      <Card 
        card={card}
        yearFilter={yearFilter}
        addPanelDisabler={addPanelDisabler}
      />))}
      <button 
        onClick={increaseOffset}
        style={{
          display:
            isSearchOn || isFilterOn ?
              'none':
              ''
        }}
        
      >
        Load more
      </button>
    </div>
  </div>
)
