import {dig, digg} from "@kaspernj/object-digger"

export class CustomError extends Error {
  constructor(message, args = {}) {
    const errors = dig(args, "response", "errors")

    if (errors) {
      const errorMessages = errors.map((error) => {
        if (typeof error == "string") {
          return error
        }

        return digg(error, "message")
      })
      message = `${message}: ${errorMessages.join(". ")}`
    }

    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, CustomError)

    this.args = args
  }

  errorMessages() {
    return digg(this, "args", "response", "errors").map((error) => digg(error, "message"))
  }

  errorTypes() {
    return digg(this, "args", "response", "errors").map((error) => digg(error, "type"))
  }
}

export class ValidationError extends Error {
  constructor(validationErrors) {
    super(validationErrors.getUnhandledErrorMessage() || validationErrors.getErrorMessage())
    this.validationErrors = validationErrors
  }

  hasUnhandledErrors() {
    const unhandledError = this.validationErrors.getValidationErrors().find(validationError => !validationError.getHandled())
    return Boolean(unhandledError)
  }
}
