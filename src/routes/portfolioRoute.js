const express = require('express');
const { render } = require('express/lib/response');
const router = express.Router();
const portfolioController = require('../controller/admin/porfolioController');

router.route('/').get(portfolioController.getPortfolioPage);
router.route('/').post(portfolioController.savePortfolio);
router.route('/getportfoliosJson').get(portfolioController.getPortfoliosJson);
router.route('/getportfolio/:_id').get(portfolioController.getPortfolio);
router.route('/deleteportfolio/:_id').delete(portfolioController.deletePortfolio);

module.exports = router;
