import { response } from "./response";

export const catchError = (err, customMessage) => {
  console.log(e);
  if (err.code === 11000) {
    const keys = Object.keys(err.keyPattern).join(", ");
    err.message = `Duplicate value for field(s): ${keys}`;
    err.statusCode = 409;
  }

  const statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    return response(false, statusCode, err.message, {
      stack: err.stack,
      error: err,
    });
  }

  return response(false, statusCode, customMessage || "Internal Server Error");
};
