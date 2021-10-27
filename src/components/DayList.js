import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { 
    days,
    value,
    onChange
   } = props;
  const parsedDays = days.map(day => 
    <DayListItem 
      key={day.id} 
      selected={value === day.name} 
      setDay={() => onChange(day.name)} 
      {...day}
    />
  );
  return <ul>{parsedDays}</ul>;
};