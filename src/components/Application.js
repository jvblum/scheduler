import React, { useState } from "react";

import "components/Application.scss";
import Button from "./Button";
import DayList from "./DayList";

export default function Application(props) {
  const [daySelect, setDaySelect] = useState('Monday');

  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={daySelect}
            setDay={setDaySelect}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        <Button confirm>hey</Button>
        <Button danger>you</Button>
        {/* <Button onClick={testEvent}>onClick</Button> */}
        <Button disabled>off</Button>
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
