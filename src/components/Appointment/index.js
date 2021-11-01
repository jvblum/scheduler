import React from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const {
    interview,
    interviewers,
    bookInterview, 
    id
  } = props;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => {
      transition(SHOW);
    });
  };
  

  // Show should get onEdit and onDelete props
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form onSave={save} onCancel={back} interviewers={interviewers}/>}
      {mode === SAVING && <Status message={SAVING} />}

    </article>
  );
};