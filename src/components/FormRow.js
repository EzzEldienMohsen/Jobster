const FormRow = ({ name, label, type, value, handleChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  )
}

export default FormRow
