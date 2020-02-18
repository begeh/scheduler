import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment";

import { getAppointmentsForDay } from "helpers/selectors";

const axios = require('axios');

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: "Sylvia Palmer"
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get(`api/days`),
      axios.get(`api/appointments`),
      axios.get(`api/interviewers`)
    ]).then((all) => {
      console.log(state.interviewers);
      console.log(all[2].data);
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  const appointments = getAppointmentsForDay(state, state.day);

  // const schedule = appointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interviews);

  //   return(
  //     <Appointment
  //     key={appointment.id}
  //     id={appointment.id}
  //     time={appointment.time}
  //     interview={interview}
  //   />
  //   );
  // });

  const list = appointments.map(appointment =>
    <Appointment key={appointment.id} {...appointment} />
  )

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
        {list}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
