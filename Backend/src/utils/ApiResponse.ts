class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public data: T | null;
  public errors: any[] | null;
  public statusCode: number;
  public timestamp: Date;

  constructor(
    statusCode: number,
    message: string,
    data: T | null = null,
    errors: any[] | null = null,
    success: boolean = statusCode >= 200 && statusCode < 300
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.errors = errors;
    this.statusCode = statusCode;
    this.timestamp = new Date();
  }

  static success<T>(message: string, data: T | null = null, statusCode: number = 200): ApiResponse<T> {
    return new ApiResponse<T>(statusCode, message, data);
  }

  static created<T>(message: string, data: T | null = null): ApiResponse<T> {
    return new ApiResponse<T>(201, message, data);
  }

  static error(message: string, errors: any[] | null = null, statusCode: number = 500): ApiResponse<null> {
    return new ApiResponse<null>(statusCode, message, null, errors, false);
  }

  static notFound(message: string = 'Resource not found'): ApiResponse<null> {
    return new ApiResponse<null>(404, message, null, null, false);
  }

  static badRequest(message: string, errors: any[] | null = null): ApiResponse<null> {
    return new ApiResponse<null>(400, message, null, errors, false);
  }

  static unauthorized(message: string = 'Unauthorized'): ApiResponse<null> {
    return new ApiResponse<null>(401, message, null, null, false);
  }

  static forbidden(message: string = 'Forbidden'): ApiResponse<null> {
    return new ApiResponse<null>(403, message, null, null, false);
  }

  toJSON() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
      errors: this.errors,
      statusCode: this.statusCode,
      timestamp: this.timestamp
    };
  }
}

export default ApiResponse;