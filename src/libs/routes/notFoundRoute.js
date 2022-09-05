const notFound = (req, res) => {
  res.status(404).send('Error! Page Not Found');
};

export default notFound;
