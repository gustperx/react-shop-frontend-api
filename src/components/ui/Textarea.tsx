import { FC } from "react";
import { LabelError } from "./";

interface Props {
  label: string;
  inputName: string;
  placeholder?: string;
  handleChange: () => void;
  activeError: string | undefined;
  inputValue?: string;
}

export const Textarea: FC<Props> = ({
  label,
  inputName,
  placeholder,
  handleChange,
  activeError,
  inputValue = "",
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        className={`textarea textarea-bordered h-24 ${
          activeError && "textarea-secondary"
        }`}
        placeholder={placeholder}
        onChange={handleChange}
        value={inputValue}
        name={inputName}
      ></textarea>
      <label className="label">
        {activeError && <LabelError message={activeError} />}
      </label>
    </div>
  );
};
