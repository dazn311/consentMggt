const Router = require('express');
const orgController = require('../controllers/organisations.controller');

const router = new Router()

router.post('/org', orgController.creatOrg);
router.get('/orgs', orgController.getAllOrgs);
router.get('/org/:id', orgController.getOrg);
router.put('/org', orgController.updateOrg);
router.delete('/org/:id', orgController.deleteOrg);

module.exports = router;