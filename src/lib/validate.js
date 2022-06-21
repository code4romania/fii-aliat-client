export const validate = (data, fields) => {
  const errors = {};
  fields.forEach(field => {
    if (field.condition(data[field.key])) {
      errors[field.key] = [field.error];
    }
  });
  const isValid = JSON.stringify(errors) === "{}";

  return { errors, isValid };
};
