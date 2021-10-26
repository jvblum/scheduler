import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { 
    days,
    day,
    setDay
   } = props;
  const parsedDays = days.map(elm => <DayListItem key={elm.id} selected={day === elm.name} setDay={ setDay } {...elm}/>
    // parsedDays.push(<DayListItem key={elm.id} selected={day === elm.name} setDay={ setDay } {...day}/>)
  );
  return <ul>{parsedDays}</ul>;
};