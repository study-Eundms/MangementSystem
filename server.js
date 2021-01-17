const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port=process.env.PORT||5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
    res.send([{
        'id':1,
        'image':'https://placeimg.com/64/64/1',
        'name':'박은정',
        'birthday':'990211',
        'gender':'여',
        'job':'개발자',
      },
      {
        'id':2,
        'image':'https://placeimg.com/64/64/2',
        'name':'정',
        'birthday':'950211',
        'gender':'여',
        'job':'개발자2',
      }]);
});

app.listen(port, ()=>console.log(`Listening on port ${port}`));