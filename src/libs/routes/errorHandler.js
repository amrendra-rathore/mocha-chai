export default function errorHandler(err, req, res) {
  const {
    error, message, code,
  } = err;
  return res.status(code || 500).send(
    {
      error: error || 'error',
      message: message || 'Error',
      code: code || 500,
      timestamp: new Date(),
    },
  );
}
