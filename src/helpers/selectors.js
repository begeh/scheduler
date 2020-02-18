export function getAppointmentsForDay(state, day) {
  const dayAppointments = state.days.filter(item => item.name === day);
  if (dayAppointments.length === 0) {
    return [];
  }
  let appointments = []
  let apptArr = dayAppointments[0].appointments;
  for (let i = 0; i < apptArr.length; i++) {
    if (state.appointments[apptArr[i]]) {
      appointments.push(state.appointments[apptArr[i]]);
    }
  }
  return appointments;
}