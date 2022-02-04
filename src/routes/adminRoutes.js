const express = require('express');
const { render } = require('express/lib/response');
const router = express.Router();
const loginController = require('../controller/admin/loginController');
const adminController = require('../controller/admin/adminController');
const clientRoute = require('../routes/clientRoute');
const categoryRoute = require('../routes/categoryRoute');
const portfolioRoute = require('../routes/portfolioRoute');

router.route('/').get(adminController.getDashboardPage);

router.use('/client', clientRoute);
router.use('/category', categoryRoute);
router.use('/portfolio', portfolioRoute);
//router.route('/category').get(adminController.getCategoryPage);

module.exports = router;
