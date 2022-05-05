const APIError = require('./APIError');

const handleError = async (err, req, res, next) => {
  if( err instanceof APIError ){
    myError = err;
  }
  else{
    myError = new APIError(err, req.url);
  }
  await myError.log();
  res.status(myError.status).json(myError.message);
};

module.exports = handleError;