import React from 'react';
import "./style.scss";
import useVisualMode from "../../hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

//Modes for component shifts
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))

  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE &&
        <Form
          onCancel={() => transition(EMPTY)}
          onSave={(name, interviewer) => save(name, interviewer)}
          interviewers={props.interviewers}
        />
      }
      {mode === SAVING &&
        <Status message={"Saving"} />
      }
      {mode === DELETING &&
        <Status message={"Deleting"} />
      }
      {mode === CONFIRM &&
        <Confirm
          onCancel={() => transition(SHOW)}
          onConfirm={() => {
            transition(DELETING);
            props.cancelInterview(props.id)
              .then(() => transition(EMPTY))
              .catch(error => transition(ERROR_DELETE, true))
          }
          }
          message={"Are you sure you would like to delete?"} />
      }
      {mode === EDIT &&
        <Form
          onCancel={() => transition(SHOW)}
          onSave={(name, interviewer) => save(name, interviewer)}
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      }
      {mode === ERROR_SAVE &&
        <Error
          message={"Could not save"}
          onClose={() => back()}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message={"Could not delete"}
          onClose={() => back()}
        />
      }
    </article>
  )
}
