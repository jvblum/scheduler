import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import Button from "./Button";
import DayList from "./DayList";
import Appointment from "./Appointment";

import appointments from "data/data";

export default function Application(props) {
  const [daySelect, setDaySelect] = useState('Monday');
  const [days, setDays] = useState([]);


  // Create an effect to make a GET request to /api/days using axios and update the days state with the response.
  useEffect(() => {
    axios.get('/api/days').then(res => {
      setDays(res.data);
    });
  }, []);

  const parsedappointments = appointments.map(appointment => <Appointment key={appointment.id} {...appointment}/>);

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
            value={daySelect}
            onChange={setDaySelect}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {parsedappointments}
        {/* <Button confirm>hey</Button>
        <Button danger>you</Button>
        {/* <Button onClick={testEvent}>onClick</Button> */}
        {/* <Button disabled>off</Button> */}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
