const bcrypt = require('bcrypt');
const User = require('../../models/User');

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    /* User.create({    name: "Turgay YILMAZ",
    email: "turqayyilmaz@gmail.com",
    password: "ty251606"}); */
    User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            res.redirect('/admin/');
          } else {
            req.flash('error', 'Your password is not correct!');
            
            res.status(400).redirect('/login', { messages: req.flash('info') });
          }
        });
      } else {
        req.flash('error', 'User is not exist!');
        res.status(400).redirect('/admin/login');
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
