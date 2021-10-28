import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const { interview } = props;
  // Show should get onEdit and onDelete props
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty/>}
    </article>
  );
};