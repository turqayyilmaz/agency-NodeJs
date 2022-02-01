const User = require('../../models/User');
const { dirname } = require('path');

const appDir = dirname(require.main.filename);
const uploadedUrl = '/uploads/';


exports.getDashboardPage = async (req, res) => {
  res.locals.pageName = 'dashboard';
  res.locals.pageTitle = 'Dashboard';
  res.render('admin/dashboard');
};
exports.getPortfolioPage = async (req, res) => {
  res.locals.pageName = 'portfolio';
  res.locals.pageTitle = 'Portfolio';
  res.render('admin/portfolio');
};


exports.getCategoryPage = async (req, res) => {
  res.locals.pageName = 'Category';
  res.locals.pageTitle = 'Category';
  res.render('admin/category');
};

