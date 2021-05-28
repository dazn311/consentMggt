const express = require('express');
const cors = require('cors')
const PORT =  '3005';
// const PORT = process.env.PORT || '3005';

const userRouter = require('./routes/users.route');
const orgRouter = require('./routes/organisations.route');

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', orgRouter)








app.listen(PORT, () => console.log('==============Server start on port:',PORT,'======================')) 