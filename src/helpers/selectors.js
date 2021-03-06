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

//returns the full information for an interview with the interviewer's full info (i.e. name, avatar, and id)
export function getInterview(state, interview) {
  if (interview) {
    return { "student": interview.student, "interviewer": state.interviewers[interview.interviewer] };
  }
  return null;
}

//returns an array of the id's for interviewers available on a particular day
export function getInterviewersForDay(state, day) {
  const dayAppointments = state.days.filter(item => item.name === day);
  if (dayAppointments.length === 0) {
    return [];
  }
  let interviewers = [];
  let intArr = dayAppointments[0].interviewers;
  for (let i = 0; i < intArr.length; i++) {
    interviewers.push(state.interviewers[intArr[i]]);
  }
  return interviewers;
}