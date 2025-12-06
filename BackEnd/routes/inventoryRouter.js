const express = require('express');
const { createInventoryController,getInventoryController, getDonarsController, getHospitalController, getOrgnaisationController, getOrgnaisationForHospitalController, getInventoryHospitalController, getRecentInventoryController } = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-inventory' , authMiddleware , createInventoryController)

router.get('/get-inventory' , authMiddleware , getInventoryController)

router.get('/get-donars' , authMiddleware , getDonarsController)

router.get('/get-hospitals' , authMiddleware , getHospitalController)

router.get('/get-orgnaisation' , authMiddleware , getOrgnaisationController)

router.get('/get-orgnaisation-for-hospital' , authMiddleware , getOrgnaisationForHospitalController)

router.get('/get-orgnaisation-for-hospital' , authMiddleware , getInventoryHospitalController)
 
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);


module.exports=router