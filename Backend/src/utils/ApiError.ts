class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public errors: any[] | null;

  constructor(
    statusCode: number,
    message: string,
    errors: any[] | null = null,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, errors: any[] | null = null): ApiError {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message: string = 'Unauthorized'): ApiError {
    return new ApiError(401, message);
  }

  static forbidden(message: string = 'Forbidden'): ApiError {
    return new ApiError(403, message);
  }

  static notFound(message: string = 'Resource not found'): ApiError {
    return new ApiError(404, message);
  }

  static internalError(message: string = 'Internal server error'): ApiError {
    return new ApiError(500, message);
  }

  static validationError(errors: any[]): ApiError {
    return new ApiError(422, 'Validation failed', errors);
  }
}

export default ApiError;