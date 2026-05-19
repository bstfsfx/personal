module.exports = (req, res) => {
  res.status(200).json({ status: 'online', message: 'Personal website is running perfectly!' });
};
