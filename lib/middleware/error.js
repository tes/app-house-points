module.exports = {
  notFound: (req, res) => {
    res.status(404).json('Not found');
  },
  internalServerError: (err, req, res, next) => {
    console.error(err)
    res.status(500).json('An unexpected error has occurred');
  },
}
