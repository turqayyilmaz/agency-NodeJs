const express = require('express');
const { render } = require('express/lib/response');
const router = express.Router();
const clientController = require('../controller/admin/clientController');
router.route('/').get(clientController.getClientPage);
router.route('/').post(clientController.saveClient);
router.route('/getClientsJson').get(clientController.getClientsJson);
router.route('/getClient/:_id').get(clientController.getClient);
router.route('/deleteClient/:_id').delete(clientController.deleteClient);
router.get('/get',(req,res)=>{

res.send(req.params)
});
module.exports = router;