export default class AppError extends Error {
  public message: string;

  public data: Record<string, unknown>;

  public statusCode: number;

  constructor(
    message: string,
    data?: Record<string, unknown>,
    statusCode = 500,
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;

    if (data) {
      this.data = data;
    }

    this.name = 'AppError';
  }
}
