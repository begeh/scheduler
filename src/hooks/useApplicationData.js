import { useReducer, useEffect } from 'react';
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer,
    {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });

  //Sets day when selected in DaysList
  const setDay = day => dispatch({ type: SET_DAY, value: day });


  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY: {
        return {
          ...state,
          day: action.value
        }
      }
      case SET_APPLICATION_DATA: {
        return {
          ...state,
          days: action.value.days,
          appointments: action.value.appointments,
          interviewers: action.value.interviewers
        }
      }
      case SET_INTERVIEW:
        {

          //spotChange sets and increment value for updating days.spots based on the action (i.e. Create, Edit, Delete)
          let spotChange;
          if (action.value.interview && !state.appointments[action.value.id].interview) {
            spotChange = -1;
          }
          if (state.appointments[action.value.id].interview && !action.value.interview) {
            spotChange = 1;
          }
          if (state.appointments[action.value.id].interview && action.value.interview) {
            spotChange = 0;
          }

          //creates an array of days (newDays) that includes the updated number of spots for the day in the current state
          let newDays = state.days.map(item => {
            if (item.name !== state.day) {
              return item;
            }
            return {
              ...item,
              spots: (item.spots + spotChange)
            }
          })

          const appointment = {
            ...state.appointments[action.value.id],
            interview: { ...action.value.interview }
          };

          const appointments = {
            ...state.appointments,
            [action.value.id]: appointment
          };

          //interview is set, appointments are updated and state.days is overriden with newDays, which has the updated number of spots
          return {
            ...state,
            appointments,
            days: newDays
          }
        }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  //Books/edits an interview when called. Update is rendered locally and api endpoint (.../api/appointments) is updated
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: { id, interview } });
      });

  }

  //Cancels an inteview when called
  const cancelInterview = (id, interview = false) => {
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        dispatch({ type: SET_INTERVIEW, value: { id, interview: null } });
      });

  }

  //useEffect updates state when state is changed
  useEffect(() => {
    Promise.all([
      axios.get(`api/days`),
      axios.get(`api/appointments`),
      axios.get(`api/interviewers`)
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data } });
    });
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}