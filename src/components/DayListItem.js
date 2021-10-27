import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const {
    name,
    spots,
    setDay,
    selected
  } = props;

  const dayListClass = classNames('day-list__item', { 'day-list__item--selected': selected }, { 'day-list__item--full': !spots });

  // takes number and outputs different message according to the number
  const formatSpotsMessage = spots => {
    if (spots === 0) return 'no spots remaining';
    if (spots === 1) return `${spots} spot remaining`;
    return `${spots} spots remaining`;
  };

  const spotsMessage = formatSpotsMessage(spots);

  return (
    <li 
      onClick={setDay} 
      className={dayListClass}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{spotsMessage}</h3>
    </li>
  );
}
