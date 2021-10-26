import React from "react";

// import "components/Button.scss";
import "components/Button.scss";


export default function Button(props) {
  const {
    confirm,
    danger,
    onClick,
    disabled  
    } = props;

  let buttonClass = 'button';
  if (confirm) buttonClass += ' button--confirm';
  if (danger) buttonClass += ' button--danger';


  return <button className={buttonClass} onClick={onClick} disabled={disabled}>{props.children}</button>;
}
