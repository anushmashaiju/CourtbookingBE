var express = require('express');
const { getAllCourtsData,getSinglecourtData,dayWiseTimeSlot,getlatestupdateDate,getMybookingsData } = require('../controllers/userController');
const { userAuth } = require('../middlewares/authorisation');
var router = express.Router();

/* GET users listing. */
router.get('/getAllCourtsData',userAuth,getAllCourtsData)
router.get('/getSinglecourtData',userAuth,getSinglecourtData)
router.get('/dayWiseTimeSlot',userAuth,dayWiseTimeSlot)
//router.get('/getlatestupdateDate',userAuth,getlatestupdateDate)
router.get('/getMybookingsData',userAuth,getMybookingsData)


module.exports = router;
