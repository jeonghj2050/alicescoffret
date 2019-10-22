const express = require('express');
const router = express.Router();
const moment = require('moment');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const Evaluation = require('../models/Evaluation');
const Product=require("../models/Product");

router.get('/', function (req, res) {
    session = req.session;
    //현재 로그인한 사용자
    let user = session.loginInfo.userid;
    let evaluation_list = [];
    let thumbnail_list=[];
    // 로그인 정보가 없을경우 로그인 창으로
    if (!session.loginInfo) {
        return res.render('login', { session: session });
    }
    Evaluation.find({}, (err, evaluation) => {
        for (var i = 0; i < evaluation.length; i++) {
            var eval = {
                transaction_id: evaluation[i].transaction_id,
                evaluator: evaluation[i].evaluator,
                grade: evaluation[i].evaluation_grade,
                comment: evaluation[i].comment
            }
            evaluation_list.push(eval);
        }
    });
    Product.find({},(err,product)=>{
        for(var i=0;i<product.length;i++){
            var item={
                product_name:product[i].product_name,
                product_id:product[i]._id,
                thumbnail:product[i].thumbnail
            }
            thumbnail_list.push(item)
        }
    });
    
    //거래 목록 중 구매 목록
    Transaction.find({ $or: [{ purchaser: user }, { sellers: user }] }, (err, list) => { //Model.findOne 메소드
        if (err) throw err;
        let purchase_list = [];
        let sale_list = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].purchaser == user) {
                let thumbnail;
                let product_id;
                let total_price = list[i].transaction_quantity * list[i].transaction_price;
                for(var j=0;j<thumbnail_list.length;j++){
                    if(list[i].product_name==thumbnail_list[j].product_name){
                        thumbnail=thumbnail_list[j].thumbnail;
                        product_id=thumbnail_list[j].product_id;
                    }

                }
                var data = {
                    _id: list[i]._id,
                    product_name: list[i].product_name,
                    product_id:product_id,
                    thumbnail:thumbnail,
                    purchaser: list[i].purchaser,
                    sellers: list[i].sellers,
                    total_price: total_price,
                    transaction_status: list[i].transaction_status,
                    transaction_strart_date: list[i].transaction_strart_date,
                    transaction_end_date: list[i].transaction_end_date
                }
                purchase_list.push(data)
            } else if (list[i].sellers == user) { //판매자랑 유저랑 비교
                for(var j=0;j<thumbnail_list.length;j++){
                    if(list[i].product_name==thumbnail_list[j].product_name){
                        thumbnail=thumbnail_list[j].thumbnail;
                        product_id=thumbnail_list[j].product_id;
                    }
                }
                if (list[i].transaction_status == "평가완료") { //평가가 안료된 상품이 있으면
                    for (var j = 0; j < evaluation_list.length; j++) {
                        if (list[i]._id.equals(evaluation_list[j].transaction_id)) {
                            var data = {
                                _id: list[i]._id,
                                product_name: list[i].product_name,
                                product_id:product_id,
                                thumbnail:thumbnail,
                                purchaser: list[i].purchaser,
                                sellers: list[i].sellers,
                                transaction_status: list[i].transaction_status,
                                transaction_strart_date: list[i].transaction_strart_date,
                                delivery_date: list[i].delivery_date,
                                transaction_end_date: list[i].transaction_end_date,
                                evaluator: evaluation_list[j].evaluator,
                                grade: evaluation_list[j].grade,
                                comment: evaluation_list[j].comment
                            }
                            sale_list.push(data);
                        }
                    }
                } else { //평가 완료된 상품이 없으면
                    var data = {
                        _id: list[i]._id,
                        product_name: list[i].product_name,
                        product_id:product_id,
                        thumbnail:thumbnail,
                        purchaser: list[i].purchaser,
                        sellers: list[i].sellers,
                        transaction_status: list[i].transaction_status,
                        transaction_strart_date: list[i].transaction_strart_date,
                        delivery_date:list[i].delivery_date,
                        transaction_end_date: list[i].transaction_end_date,
                    }
                    sale_list.push(data);
                }


            }
        }
        
        session.purchaseList = {
            purchase_list: purchase_list
        }
        session.saleList = {
            sale_list: sale_list
        }
        return res.render("mypage", { session: session, moment: moment });
    });
});

module.exports = router;