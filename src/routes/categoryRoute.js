const express = require('express');
const { render } = require('express/lib/response');
const router = express.Router();
const categoryController = require('../controller/admin/categoryController');
router.route('/').get(categoryController.getCategoryPage);
router.route('/').post(categoryController.saveCategory);
router.route('/getCategoriesJson').get(categoryController.getCategoriesJson);
router.route('/getCategory/:_id').get(categoryController.getcategory);
router.route('/deleteCategory/:_id').delete(categoryController.deletecategory);
router.get('/get',(req,res)=>{

res.send(req.params)
});
module.exports = router;