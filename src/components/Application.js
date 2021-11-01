import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
// import Button from "./Button";
import DayList from "./DayList";
import Appointment from "./Appointment";

import getAppointmentsForDay from "./helpers/selectors";
import { getInterviewersForDay, getInterview } from "components/helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Wednesday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(res => {
        console.log('rest', res);
        setState(prev => {
          return {...prev, appointments }
        });
      })
      .catch(err => console.log('put-appointments', err.message));
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, id)
    .then(res => {
      setState(prev => {
        return {...prev, appointments }
      });
    })
    .catch(err => console.log('delete-appointments', err.message));
  };
  

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
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  // const parsedAppointments = dailyAppointments.map(appointment => {
  //   return (
  //   <Appointment key={appointment.id} {...appointment}/>
  //   );
  // });
  
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
        {schedule}
        {/* {parsedAppointments} */}

        {/* <Button confirm>hey</Button>
        <Button danger>you</Button>
        <Button onClick={testEvent}>onClick</Button>
        <Button disabled>off</Button> */}
      </section>
    </main>
  );
}
