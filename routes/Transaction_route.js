const express =require('express');
const router = express.Router();
var moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul");

const Account =require('../models/Account');
const Product =require('../models/Product');
const Transaction =require('../models/Transaction');
const Evaluation=require("../models/Evaluation");
router.post('/purchase', function(req,res){
    let quantity = req.body.sale_quantity;
    let update_quantity;
    let price=quantity*req.session.productDetail.data.price;
    let purchase_user=req.session.loginInfo.userid;
    let sale_user=req.session.productDetail.data.userid;
    let product_id=req.session.productDetail.data._id;
    let origin_point=req.session.loginInfo.point;
    let point=origin_point-price
    let status=1;
    if(!req.session.loginInfo){
        return res.render('login',{session:req.session});
    }
    Product.findOne({ _id: product_id }, (err, product) => {
        update_quantity=product.product_quantity-quantity;
    });

    Account.findOne({ userid: purchase_user }, (err, account) => { //Model.findOne 메소드
        if(err) throw err;

        if (account.point<price) {
            req.session.point_status=false;
            return res.render('point',{session:req.session})
        }
        Product.updateOne({_id:product_id},{product_quantity:update_quantity}, function (err, result) {
            if(err) throw err;
            
        }); 
        Account.updateOne({_id: account._id},{point:point}, function (err, result) {
            if(err) throw err;
            
        });  
        let transaction = new Transaction({
            product_name:req.session.productDetail.data.product_name,
            purchaser:purchase_user,
            sellers: sale_user,
            transaction_quantity:quantity,
            transaction_price:price,
            transaction_status:"거래중",

        });
        
        transaction.save( err => {
            if(err) throw err;
            
            req.session.loginInfo.point=point;
            res.redirect('/main'); 
        });
        
    });
    // req.session.loginInfo.point=point;
    // res.redirect('/main'); 
    
});

//거래 완료 상태로 수정
router.get('/update_transaction',function(req,res){
    session=req.session;
    let transaction_id=req.query.transactionId;

    var date=moment().format('YYYY-MM-DD HH:mm:ss');
    Transaction.findOne({_id:transaction_id},(err, results)=>{
        if(results.transaction_status=="거래중"){
            Transaction.update({_id: transaction_id},{transaction_status:"배송중",delivery_date:date}, function (err, result) {
                if(err) throw err;
        
            });  
        }else if(results.transaction_status=="배송중"){
            Transaction.update({_id: transaction_id},{transaction_status:"거래완료",transaction_end_date:date}, function (err, result) {
                if(err) throw err;
        
            }); 
        }
    })
     
    res.redirect('/mypage')
});

//평가 완료 상태로 만들기 위해 평가 결과 계산
router.post('/evaluation',function(req,res){
    session=req.session;
    totalScore=(parseInt(req.body['score1'])+parseInt(req.body['score2'])+parseInt(req.body['score3']))/3;
    let grade;
    if(totalScore>=3){
        grade="A"
    }else if(totalScore>=2){
        grade="B"
    }else if(totalScore>=1){
        grade="C"
    }else{
        grade="F"
    }
    comment=req.body.comment;

    Transaction.findOne({ _id: session.evaluationId }, (err, transaction) => { //Model.findOne 메소드
        Account.update({userid: transaction.purchaser},{score:totalScore}, function (err, result) {
            if(err) throw err;
        });
        transaction.transaction_status="평가완료"
        transaction.save(err=>{
            if(err) throw err;
        });

        let evaluation = new Evaluation({
            evaluator:session.loginInfo.userid,
            seller:transaction.sellers,
            evaluation_grade: grade,
            transaction_id:transaction._id,
            comment:comment,
        });
        
        evaluation.save( err => {
            if(err) throw err;
            
        });
    
    });
    res.redirect('/mypage'); 
})

 
module.exports=router;