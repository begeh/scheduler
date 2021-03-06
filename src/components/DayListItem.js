import React from "react";

import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {

  const formatSpots = (spots) => {
    if(spots === 1){
      return `${spots} spot remaining`;
    } else if (spots > 0) {
      return `${spots} spots remaining`;
    } else{
      return `no spots remaining`;
    }
  };

  const dayClass = classNames(
    {
      'day-list__item': true,
      'day-list__item--selected': props.selected,
      'day-list__item--full': props.spots === 0
    }
  )
  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}