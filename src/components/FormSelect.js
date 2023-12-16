const FormSelect = ({ name, label, value, handleChange, array }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label ? label : name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        value={value}
        onChange={handleChange}
      >
        {array.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FormSelect
