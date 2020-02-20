import React, { useReducer, useState, useEffect } from 'react';
const axios = require('axios');

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData() {
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  const [state, dispatch] = useReducer(reducer,
    {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });
    console.log(state);
  const setDay = day => dispatch({ type: SET_DAY, value: day });

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:{
        return {
          ...state,
          day: action.value
        }
      }
      case SET_APPLICATION_DATA:{
        return {
          ...state,
          days: action.value.days,
          appointments: action.value.appointments,
          interviewers: action.value.interviewers
        }
      }
      case SET_INTERVIEW:
        {
          const appointment = {
            ...state.appointments[action.value.id],
            interview: { ...action.value.interview }
          };

          const appointments = {
            ...state.appointments,
            [action.value.id]: appointment
          };
          return {
            ...state,
            appointments
          }
        }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  // const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
         dispatch({ type: SET_INTERVIEW, value: {id, interview} });
        // setState(prev => setState({ ...state, appointments }));
      });

  }

  const cancelInterview = (id, interview = null) => {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: {...interview}
    // };

    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        dispatch({ type: SET_INTERVIEW, value: {id, interview: null} });
        // setState(prev => setState({ ...state, appointments }));
      });

  }

  useEffect(() => {
    Promise.all([
      axios.get(`api/days`),
      axios.get(`api/appointments`),
      axios.get(`api/interviewers`)
    ]).then((all) => {
      dispatch({type: SET_APPLICATION_DATA, value:{days: all[0].data, appointments: all[1].data, interviewers: all[2].data }});
      // setState(prev => ({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}