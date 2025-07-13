
export class ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;

  constructor(code: number, message: string, data: T) {
    this.data = data;
    this.message = message;
    this.code = code;
  }

  getCode(): Number {
    return this.code;
  }
  setCode(code: number) {
    this.code = code;
  }

  getMessage(): String {
    return this.message;
  }
  setMessage(message: string) {
    this.message = message;
  }

  getData(): T {
    return this.data;
  }
  setData(data: T) {
    this.data = data;
  }

  toString(): string {
    return `{ Message: ${this.getMessage()}, Data: ${this.getData()}, code: ${this.getCode()}}`;
  }
}