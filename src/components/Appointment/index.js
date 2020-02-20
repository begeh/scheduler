import React from 'react';
import "./style.scss";
import useVisualMode from "../../hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

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

  }

  const deleting = ()=>{
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => deleting()}
        />
      )}
      {mode === CREATE &&
        <Form onCancel={() => transition(EMPTY)} onSave={(name, interviewer) => save(name, interviewer)} interviewers={props.interviewers} />
      }
      {mode === SAVING &&
        <Status message={"Saving"}/>
      }
      {mode === DELETING &&
        <Status message={"Deleting"}/>
      }
    </article>
  )
}
