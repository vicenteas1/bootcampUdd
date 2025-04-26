export class ApiResponse {
    constructor({ message = "", data = null, statusCode = 400 }) {
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }

    // Getter y Setter
    getMessage() {
        return this.message;
    }
    setMessage(message) {
        this.message = message;
        return this.message;
    }

    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
        return this.data;
    }

    getStatusCode() {
        return this.statusCode;
    }
    setStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this.statusCode;
    }

    toString() {
        return `StatusCode: ${this.getStatusCode()}, Message: "${this.getMessage()}", Data: ${JSON.stringify(
            this.getData()
        )}`;
    }
}

export default ApiResponse;
