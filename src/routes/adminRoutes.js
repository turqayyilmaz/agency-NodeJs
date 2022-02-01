const express = require('express');
const { render } = require('express/lib/response');
const router = express.Router();
const loginController = require('../controller/admin/loginController');
const adminController = require('../controller/admin/adminController');
const clientRoute = require("../routes/clientRoute");

router.route('/').get(adminController.getDashboardPage);
router.route('/portfolio').get(adminController.getPortfolioPage);

router.use("/client",clientRoute);
/* router.route('/client').get(adminController.getClientPage);
router.route('/client').post(adminController.saveClient);
 */
router.use("/category",categoryRoute);
//router.route('/category').get(adminController.getCategoryPage);



module.exports = router;
