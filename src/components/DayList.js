import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { 
    days,
    value,
    onChange
   } = props;

  if (days !== undefined) {
    console.log('days', days);
    console.log('value', value);
      const parsedDays = days.map(day => 
      <DayListItem 
      key={day.id} 
      selected={value === day.name} 
      setDay={() => onChange(day.name)} 
      {...day}
      />
    );
    return <ul>{parsedDays}</ul>;
  }
};