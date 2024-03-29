const express = require('express')
const  { authMiddleware } = require( '../middleware');
const router= express.Router();
const { Account } = require( '../db');
const mongoose = require('mongoose')


router.get('/balance', authMiddleware, async function(req,res){
  const account = await Account.findOne({
    userId: req.userId
  })
  res.json({
    balance: account.balance
  })
})


router.post('/transfer', async function(req,res) {
         const session = await mongoose.startSession();
         
         session.startTransaction();

         const {amount, to } = req.body;

         const account = Account.findOne({
            userId: req.userId
         }).session(session)

         if(!account || account.balance < amount){
            await session.abortTransacation();
            return res.status(400).json({
                message: ' Insufficent balance / account not found'
            })
         }

         const toAccount = Account.findOne({
            userId: to
         }).session(session)


      if(!toAccount){
        await session.abortTransacation();
    res.status(400).json({
        message:'account not found'
    })      
}

await Account.updateOne({
    userId:req.userId
},{
    $inc:{
        balance: -amount
    }
}).session(session)
await Account.updateOne({
    userId:to
},{
    $inc:{
        balance: amount
    }
}).session(session)

await session.commitTransaction();
res.json({
    message:'Transfer successful'
})



































  // this is a bad solution
    // const {amount, to} = req.body;
//find the userId of the person who want to send the money

    // const account = await Account.findOne({
    //     userId: req.userId
    // })
  
    // if(account.balance< amount){
    //    return res.status(400).json({
    //         message: ' Insufficen balance'
    //     })
    // }
    // const toAccount = await Account.findOne({
    //     userId: to
    // })
    // if(!toAccount){
    //   return res.status(400).json({
    //     message:"Invalid account"
    //   })
    // }

    // await Account.updateOne({
    //     userId: req.userId
    // },{
    //     $inc:{
    //         balance:-amount
    //     }
    // })
    // await Account.updateOne({
    //     userId:to
    // },{
    //     $inc:{
    //         balance: amount
    //     }
    // })

    // res.json({
    //     message:" Transfer successful"
    // })


})
module.exports = router;