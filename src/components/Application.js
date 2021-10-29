import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import Button from "./Button";
import DayList from "./DayList";
import Appointment from "./Appointment";

import appointments from "data/data";
import getAppointmentsForDay from "./helpers/selectors";
import InterviewerList from "./InterviewerList";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Wednesday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  // Create an effect to make GET request using axios
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const parsedappointments = dailyAppointments.map(appointment => {
    return (
    <Appointment key={appointment.id} {...appointment}>
      <InterviewerList/>
    </Appointment>
    );
    // return <Appointment key={appointment.id} {...appointment}/>;
  });
  
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
            days={state.days}
            value={state.day}
            onChange={setDay}
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
        <Button onClick={testEvent}>onClick</Button>
        <Button disabled>off</Button> */}
      </section>
    </main>
  );
}
