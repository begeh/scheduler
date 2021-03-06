export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {

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

        //spotChange sets and increment value for updating days.spots based on the action (i.e. Create, Edit, Delete). Default at 0 for 'Edit' action.
        let spotChange = 0;

        if (action.value.interview && !state.appointments[action.value.id].interview){
          spotChange = -1;
        }
        if (state.appointments[action.value.id].interview && !action.value.interview) {
          spotChange = 1;
        }
        
        const changedInterviewDay = state.days.filter(day => day.appointments.includes(action.value.id))[0].name;
        

        //creates an array of days (newDays) that includes the updated number of spots for the day in the current state
        const newDays = state.days.map(item => {
          if (item.name !== changedInterviewDay) {
            return item;
          }
          return {
            ...item,
            spots: (item.spots + spotChange)
          }
        })

        const appointment = {
          ...state.appointments[action.value.id],
          interview: action.value.interview
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