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