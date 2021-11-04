import React from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        console.log('put-appointment', err.message);
        transition(ERROR_SAVE, true);
      });;
  };
  const deleteAppointment = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        console.log('delete-appointment', err.message);
        transition(ERROR_DELETE, true);
      });
  };

  // Show should get onEdit and onDelete props
  return (
    <article className="appointment" data-testid="appointment">
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
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && <Confirm message='Cancel Interview?' onCancel={back} onConfirm={deleteAppointment} />}
      {mode === ERROR_SAVE && <Error message='saving failed' onClose={back} />}
      {mode === ERROR_DELETE && <Error message='deleting failed' onClose={back} />}
    
    </article>
  );
};