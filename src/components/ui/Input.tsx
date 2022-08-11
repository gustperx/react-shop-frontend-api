import { ChangeEvent, FC } from "react";
import { LabelError } from "./";

interface Props {
  type: string;
  label: string;
  placeholder?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  activeError: string | undefined;
  inputName: string;
  inputValue?: string;
}

export const Input: FC<Props> = ({
  type,
  label,
  inputName,
  placeholder,
  handleChange,
  inputValue = "",
  activeError,
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full ${
          activeError && "input-secondary"
        }`}
        onChange={handleChange}
        value={inputValue}
        autoComplete="off"
        name={inputName}
      />
      <label className="label">
        {activeError && <LabelError message={activeError} />}
      </label>
    </div>
  );
};
