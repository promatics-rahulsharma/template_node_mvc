const { ValidationError } = require("../utils/errors");

const zodValidate = schema => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return next(
      new ValidationError(
        'Validation failed',
        result.error.issues.map(issue => ({
          field: issue.path.join('.'),
          // message: `${issue.path.join('.')} - ${issue.message}`,
           message: req.__(issue.message),
        }))
      )
    );
  }

  req.body = result.data; // sanitized data
  next();
};

module.exports = zodValidate;
