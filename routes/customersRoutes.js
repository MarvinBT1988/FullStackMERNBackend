const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.get('/', auth, checkRole('ADMIN_ROLE','SALES_ROLE'), customerController.getCustomers);
router.get('/:id', auth,checkRole('ADMIN_ROLE','SALES_ROLE'), customerController.getCustomerById);
router.post('/', auth,checkRole('ADMIN_ROLE','SALES_ROLE'), customerController.createCustomer);
router.put('/:id', auth,checkRole('ADMIN_ROLE','SALES_ROLE'), customerController.updateCustomer);
router.delete('/:id', auth,checkRole('ADMIN_ROLE','SALES_ROLE'), customerController.deleteCustomer);
module.exports = router;