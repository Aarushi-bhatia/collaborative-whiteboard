export const validateInput = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source])

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error.issues?.[0]?.message || "Validation failed",
        errors: result.error.issues?.map(err => ({
          field: err.path.join("."),
          message: err.message
        })) || []
      })
      return
    }

    next()
  }
}