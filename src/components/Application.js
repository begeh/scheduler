import React from "react";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

// const axios = require('axios');

export default function Application(props) {

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();



  // const setDay = day => setState({ ...state, day });

  // const bookInterview = (id, interview) => {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   return axios.put(`/api/appointments/${id}`, appointment)
  //     .then(() => {
  //       setState(prev => setState({ ...state, appointments }));
  //     });

  // }

  // const cancelInterview = (id) => {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   return axios.delete(`/api/appointments/${id}`)
  //     .then((response) => {
  //       setState(prev => setState({ ...state, appointments }));
  //     });

  // }

  // useEffect(() => {
  //   Promise.all([
  //     axios.get(`api/days`),
  //     axios.get(`api/appointments`),
  //     axios.get(`api/interviewers`)
  //   ]).then((all) => {
  //     setState(prev => ({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  //   });
  // }, [])

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        {...appointment}
        key={appointment.id}
        interviewers={interviewers}
        bookInterview={bookInterview}
        interview={interview}
        cancelInterview={cancelInterview}
      />
    );
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
            day={state.day}
            setDay={setDay}
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
