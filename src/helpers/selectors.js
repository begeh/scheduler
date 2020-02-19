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

export function getInterview(state, interview) {
  if (interview) {
    return {"student" : interview.student, "interviewer": state.interviewers[interview.interviewer]};
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const dayAppointments = state.days.filter(item => item.name === day);
  if (dayAppointments.length === 0) {
    return [];
  }
  let interviewers = []
  let apptArr = dayAppointments[0].appointments;
  for (let i = 0; i < apptArr.length; i++) {
    if (state.appointments[apptArr[i]].interview) {
      interviewers.push(state.interviewers[state.appointments[apptArr[i]].interview.interviewer]);
    }
  }
  return interviewers;
}