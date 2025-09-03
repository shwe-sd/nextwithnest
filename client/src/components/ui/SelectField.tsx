type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
};

const SelectField = ({ label, name, value, onChange, options }: SelectFieldProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-800 mb-2"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="
            block w-full
            appearance-none                         /* removes Safari default */
            [-webkit-appearance:none]               /* extra nudge for Safari */
            [-moz-appearance:none]                  /* Firefox */
            rounded-lg border border-gray-300
            bg-white px-3 py-2 pr-10                /* pr-10 for chevron space */
            text-sm text-gray-900
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            hover:border-gray-400
            transition-colors
          "
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
