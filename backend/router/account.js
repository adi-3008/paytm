const express = require("express")
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {User, Account} = require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId : req.userId
    });
    res.json({
        balance : account.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount, to} = req.body;

    // fetch the account information of sender
    const account = await Account.findOne({userId : req.userId}).session(session);

    // console.log(account)

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Insufficient Balance"
        })
    }

    // fetch the account information of receiver.
    const toAccount = await Account.findOne({userId : to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Invalid Account"
        })
    }

    // perform the transfer
    await Account.updateOne({ userId : req.userId }, { "$inc" : { balance : -amount }}).session(session)
    await Account.updateOne({ userId : to }, { "$inc" : { balance : amount }}).session(session)

    // commit the transaction
    await session.commitTransaction();

    res.json({
        message : "Transfer Successful"
    })
})

module.exports = router;