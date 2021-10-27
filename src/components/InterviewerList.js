import React, {useState} from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const [interviewer, setInterviewer] = useState();
  const { interviewers } = props;
  const parsedInterviewers = interviewers.map(elm =>
    <InterviewerListItem 
      key={elm.id}
      selected={interviewer === elm.id}
      setInterviewer={ () => setInterviewer(elm.id) }
      {...elm} 
    />
  );
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  );
};