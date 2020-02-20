import React, { useState, useEffect} from 'react';
const axios = require('axios');

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

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
      .then(() => {
        setState(prev => setState({ ...state, appointments }));
      });

  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        setState(prev => setState({ ...state, appointments }));
      });

  }

  useEffect(() => {
    Promise.all([
      axios.get(`api/days`),
      axios.get(`api/appointments`),
      axios.get(`api/interviewers`)
    ]).then((all) => {
      setState(prev => ({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}