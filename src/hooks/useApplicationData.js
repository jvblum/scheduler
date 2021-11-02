import React, { useState } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  const updateSpots = (state, appointments, id) => {
    const updatedDays = [...state.days];
    const dayIndex = updatedDays.findIndex(d => d.name === state.day);
    let openSpots = 0;
  
    for (const appointmentIndex of updatedDays[dayIndex].appointments) {
      if (appointments[appointmentIndex].interview === null) {
        openSpots++;
      }
    };
  
    const updatedDay = {...updatedDays[dayIndex], spots: openSpots};
    const newDays = updatedDays.map(d => d.name === state.day ? updatedDay : d)
  
    return newDays;
  };

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
        setState(prev => {
          return {...prev, appointments }
        });
        updateSpots();
      })
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
      updateSpots();
    })
  };

  // Create an effect to make GET request using axios
  const getApi = () => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  };
  
  return { state, setDay, bookInterview, cancelInterview, getApi };
};