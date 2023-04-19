const express=require('express');
const app=express();
const url = 'https://randomuser.me/api/';

app.use(express.json());
app.use(express.urlencoded({extended:true}));
var a=[];
app.get('/',async (req,res)=>{
    try {
        (async function move() {
            let count = 0;
            const id =  setInterval(frame, 100);
            async function frame() {
              if (count == 10) {
                 clearInterval(id);
              } else {
                count++; 
                await fetch(url)
                .then(response => response.text())
                .then(jsonResponse => {
                    var newData=JSON.parse(jsonResponse);
                    var result={
                        Name:newData.results[0].name.title+' '+newData.results[0].name.first+' '+newData.results[0].name.last,
                        DOB: newData.results[0].dob.date.substring(0,10),
                        email:newData.results[0].email
                    }
                    a.push(result);                
                }
                )
              }
            }
          })();
          setInterval(()=>{res.send(a);}, 2000); 
 } catch (error) {
        return res.send(error.message)
    }   

})


app.listen(https://prakhar7184.github.io/random_users/);
