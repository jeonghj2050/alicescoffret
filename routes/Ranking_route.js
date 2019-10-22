const express = require('express');
const router = express.Router();
const moment = require('moment');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const Evaluation = require('../models/Evaluation');
const Product=require("../models/Product");

router.get('/',function(req,res){
    session =req.session;
    res.render('ranking',{session:session});
});

module.exports = router;