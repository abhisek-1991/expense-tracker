const Razorpay = require('razorpay');
const Order= require('../models/orders');
const User = require('../models/users');
const userController = require('./user');

exports.buypremium = (req, res, next) => {

    try {
        //new object of razorpay
        var payrazor = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        //options to add
        var razorPayOptions = {
            amount: 2500,
            currency: "INR",
        };
        //the detail you want to show to create order 
        payrazor.orders.create(razorPayOptions, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            //create a order
            //console.log('result of purchase_cont(buypremium:line 25)',order);
            Order.create({ orderId: order.id, status: "PENDING" }).then(() => {
                //these value are used to intialise razorpay model
                return res.status(201).json({
                    message: "ordered",
                    data: {
                        order, key_id: payrazor.key_id
                    }
                })
            }).catch(err => {
                throw new Error(err);
            })
        })
    }
    catch (err) {
        console.log(`${err} in buyPremium`)
        return res.status(500).json({
            message: "ordered failed",
        })
    }
    //console.log('result of buypremium response',req.user);
    //console.log('buy_premium id',res.user.users.dataValues);  doubt how to extract user id , getting to much data when trying to log the res
    //console.log('output of buy_premium line 47 ',req.user.id);
}


exports.update_transaction = (req, res, next) => {
    //console.log('result of update_transaction,line 49',req.body);
    const { payment_id, order_id } = req.body;
    
    const userId = req.user.id;
    
    //console.log('userId--update_transaction,line 53==>',userId);
    //console.log('pay==>',payment_id);
    //console.log("order==>",order_id);
    Order.findOne({
        where: {
            orderId: order_id
        }
    }).then(order => {
        //do it together
        Promise.all([
            order.update({ paymentId: payment_id, status: "SUCCESSFULL", userId }), //why order is here because my model name is Order
            User.update({ isPremium: true }, { where: { id: userId } })// because we are taking result in order variable and directly 
        ]).then(() => {
            //console.log('------------------',od,usr);
            return res.status(202).json({
                message: "Transaction Successfull",
                token: userController.generateAccessToken(userId,true)
            });
        }).catch((err) => {
            throw new Error(err);
        });

    }).catch((err) => {
        console.log(`${err} in updateTransactionStatus`)
        //forbiden
        res.status(403).json({ message: 'Sometghing went wrong' })
    })
}


exports.failed_transaction = (req, res, next) => {
    const { payment_id, order_id } = req.body;
    const userId = req.userId;

    Order.findOne({
        where: {
            orderId: order_id
        }
    }).then(order => {
        order.update({ paymentid: payment_id, status: "FAILED", userId })
            .then(() => {
                return res.status(400).json({
                    message: "Transaction failed"
                });
            })
            .catch((err) => {
                throw new Error(err);
            });
    }).catch(err => {
        console.log(`${err} in transactionFailed`)
        res.status(403).json({ message: 'Sometghing went wrong' })
    });
}

