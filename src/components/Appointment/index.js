import React from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const {
    interview,
    interviewers,
    bookInterview,
    cancelInterview,
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
  const deleteAppointment = () => {
    transition(SAVING)
    cancelInterview(id).then(() => {
      transition(EMPTY);
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
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form onSave={save} onCancel={back} interviewers={interviewers} />}
      {mode === EDIT && <Form onSave={save} onCancel={back} interviewers={interviewers} student={interview.student} interviewer={interview.interviewer.id} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === CONFIRM && <Confirm message='Cancel Interview?' onCancel={back} onConfirm={deleteAppointment} />}
    </article>
  );
};