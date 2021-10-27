import React, {useState} from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  // const [interviewer, setInterviewer] = useState();
  const { 
    interviewers,
    value,
    onChange
  } = props;
  const parsedInterviewers = interviewers.map(interviewer =>
    <InterviewerListItem 
      key={interviewer.id}
      selected={value === interviewer.id}
      setInterviewer={ () => onChange(interviewer.id) }
      {...interviewer} 
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