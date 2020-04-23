import { useReducer, useEffect } from 'react';
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

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
    let socket = new WebSocket("ws://localhost:8001");
    socket.onopen = () => {
      socket.send("ping!");
    }
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
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