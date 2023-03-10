import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  personname: string;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <div className="checkbox-container">
      <input
        {...props}
        type="checkbox"
        name={props.personname}
        id={props.personname}
      />
      <label className="checkbox-label" htmlFor={props.personname}>
        {props.personname}
      </label>
    </div>
  );
}
