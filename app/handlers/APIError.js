class APIError extends Error {
    constructor(message, url, status = 500) {
      super(message);
      this.status = status;
      this.url = url;
    }
    async log() {
      console.error(this.url, this.message, new Date());
    }
  }
  
  module.exports = APIError;
