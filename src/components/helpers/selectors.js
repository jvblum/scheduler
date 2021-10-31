export default function getAppointmentsForDay(state, day) {
  const appointments = []; 
  for (const elm of state.days) {
    if (elm.name === day) {
      elm.appointments.forEach(appointment => {
        appointments.push(state.appointments[appointment]);
      });
    }
  }
  return appointments;
}

// takes states object and interview and fills in the correct interviewer object value from the given interview
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  };

  // copy interview
  const procInterview = {...interview};
  // change interviewer id to interviewer object
  procInterview.interviewer = state.interviewers[procInterview.interviewer];

  return procInterview;
};

export function getInterviewersForDay(state, day) {
  const interviewers = []; 
  console.log(state);
  for (const elm of state.days) {
    if (elm.name === day) {
      elm.interviewers.forEach(interviewer => {
        interviewers.push(state.interviewers[interviewer]);
      });
    }
  }
  return interviewers;
};