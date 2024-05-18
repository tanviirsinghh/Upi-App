const express = require('express');
const port = 3000;
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())

const mainRouter = require('./routes/index')

app.use('/api/v1/', mainRouter);
// app.use('/api/v1/user', userRouter) //


app.listen(port,function(err){
    if(err){
        console.log("error in server setup")
    }else{
        console.log("Server is listening on Port", port)
    }
})
