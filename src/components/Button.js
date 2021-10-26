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

  if (disabled)  {
    return <button className={buttonClass} onClick={onClick} disabled>{props.children}</button>;
  }
  return <button className={buttonClass} onClick={onClick}>{props.children}</button>;
}
