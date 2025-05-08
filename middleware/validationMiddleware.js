const validationMiddleware = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const details = error.details.map(detail => detail.message);
        return res.status(400).json({ message: 'Validation error', errors: details });
      }
  
      next();
    };
  };
  
  module.exports = validationMiddleware;
  