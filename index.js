import express from 'express';
const app=express();
const port=3000;
app.use(express.json());
let teaData=[];
let nextId=1;
/*so i nee to create different route so i can add tea in this tea array, i casn see how many teas there in tea array, i should be able to update, i should be able to selete it.
so this is we are building the entire crud operation, we will do the testing as well, so wheneever you take any data then chances are high that you use post route
majority of the time when you are save the data in to data base you use post, the route you handle in this way is /teas*/
app.post('/teas',(req,res)=>{
    const {name,price}=req.body;
    const newTea={id:nextId++,name,price};
    teaData.push(newTea);
    res.status(201).send(newTea);});
    /*after this we go on postman and write 127.0.0.1:3000/teas and at the place of get we select post and you go into body then you select raw then you select json
    now provide data on postman in the format of object likme this
    {"name":"ginger tea",
     "price":"100 rupees"} when i click on send and send this post request then output come below like this
     {"id":1,
      "name":"ginger tea",
      "price":"100 rupees"}
      but when we update "name":"masala tea" and price:"200 rupees" then output is 
      {"id":2,
      "name":"masala tea",
      "price":"200 rupees"} but when you refresh again and again click on send then "id" become 1 */
    
//can we go ahead and list all the teas yes after app.post we add one more method which is 
app.get("/teas",(req,res)=>{
    res.status(200).send(teaData);
    });
/*now after this we again go on postman and click on send to send the request then again response come this
{"id":1,
"name":"masala tea",
"price":"200 rupees"}
after this go ahead and copy url 127.0.0.1:3000/teas and open new terminal in postman on clicking upon plus sign which is on above side and paste this and at the
place of post we now work on get so done get and after this click on send then output come like this
{"id":1,
"name":"masala tea",
"price":"200 rupees"}
and again come on past terminal in which we select post and update value in name from masala tea to ginger tea and click on send then output come this
{"id":2,
"name":"ginger tea",
"price":"200 rupees"}
go to second terminal in which we select get and click on send then output come like this:
{"id":1,
"name":"masala tea",
"price":"200 rupees"},
{"id":2,
"name":"ginger tea",
"price":"200 rupeees"} 
but couple of more things how to we get on single tea?
so there response is very easy, after app.get() method we create one more get method*/
app.get("/teas/:id",(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id));// where this params come from if you extract this then come on postman and see so far everything we excepting inside the body that the request.body but if you are sending me
    // anything inside the url then that thing come on req.params, but problems in anything which comes from the url is in string format so convert into in int
    // by using parseInt
    if(!tea){
        return res.status(404).send("tea not found");}
    res.status(200).send(tea);
    });
    /*so basiclly by app.post method we add new tea and by app.get method we find all tea, in above code from above or first app.get method e find all tea but from second app.get() method
    we find tea with given id*/
    // update the tea
app.put("/teas/:id",(req,res)=>{
        //the first one is to grab this id
    const tea=teaData.find(t=>t.id===parseInt(req.params.id));
    if(!tea){
        return res.status(404).send("Tea not found");}
    const {name,price}=req.body;
    tea.name=name;
    tea.price=price;
    res.status(200).send(tea);
    });
//for delete tea
app.delete('/teas/:id',(req,res)=>{
    const index=teaData.findIndex(t=>t.id===parseInt(req.params.id));
    if (index===-1){
        return res.status(404).send('tea not found');}
    teaData.splice(index,1);//means from that index only delete one element
    return res.status(200).send("deleted");});





/*app.get('/',(req,res)=>{
    res.send("Hello from ritesh and his tea!");
});
app.get('/ice-tea',(req,res)=>{
    res.send("What ice tea would you prefer");
});
app.get('/twitter',(req,res)=>{
    res.send("Ritesh@.com");
});*/

app.listen(port,()=>{
    console.log(`server is listening on port: ${port}...`);
});
/*now then in above you see that how to response to client and give response but now you see how to server accept some data from forntend 
remove line 4 to 12 and add below lines






  
  

 
 

    

now we done deletion 


so now come on postman and test the application 
delete the both terminal whaich are present both get and post both seperate file which are created in past deleted at this time
now everything is empty, now in left upper direction one plus like sign present after clicking on that many option come in which we are selected 
blanck collection now after clicking on blank collection we create upon new collectoon which is present in upper center direction and edit its name from new collection to 
tea app, inside each of the tea app we add a request after clicking on a link add a request , and in upper center direction at the place of new request we edit the name
add a tea,
and in the url we write this 127.0.0.1:3000/teas/2, but additionaly what should i do i go and select entire url whole this part '127.0.0.1' and click on set as variable
and clicking on + set as a new variable and set name myTea and selectb scope oof it that where this should be available and i choose collection tea app because i choose my collection
only,
and after this click on set variable,and you dont have write again and again 127.0.0.1 in url at the palce of this you simply write myTea
after this in url we write /teas and select post and click on body and raw and set json, and give an object
{"name":"ginger tea",
"price":"100"}
lets go ahead and send this data then output is come like:
{"id":1,
"name":"ginger tea",
"price":"100"}

and update the object like "name":"masala tea" and click on send then output is come like this:
{"id":2,
"name":"masala tea",
"price":"100"}
now we update in object as we done price at this time 500 and click on send then output come like this
{"id":3,
"name":"masala tea",
"price":"500"}
now i simply done a get request whatever data we create on that data,so first we save this so in upper right corener we go and save as and also copy the url and open new terminal on clickin on + sign
where i select get method and paste the url , so now we right click on url box and open save request and firat save this , i have make sure that
i save this in tea app so thsat my variable is available and i click on save button and save this
and in upper center direction above url box after tea app we edit the name and put list all teas and click on send button and output is come an array of all the tea data.
now we go on right above corner click on save and click on save as and a box open which is save request box and in request name at the place of list all tea we putt this
list tea with id and click on save and in url we add /2 and click on send this then output come only oh taht array in which id is 2

now we check update 
now go ahead and save as again and put request name as update tea with id and save this one now we go back in that termianl in whcich we choose post and name is add a tea
and copy that object which is given as input and again come in that termainal from where you go in post terminal and change request from the get to [put]
go in the body and choose raw and json
and i paste the copied object there as a input, and update the value in object which is given as input like name as a spaical masala tea and price is as a 600
now i cann go ahead and send this then output come "ok"
but output not shown something is wrong now go on another get terminal(on first app.get method's get terminal which name is lisall tea )
now there you can send the message then you can see all the teas and you can check that values get updated
now we check for delete item so we go in latest terminal which is put termibal and go on save and click on save as so save request box open in front of us, and change the request name delete tea with id
and we will just save and request we can change from put to delete and url is same as /teas/2 and send that delete request and and again go in first get terminal which name is
list all teas and send the message then you can see that one tea deleted which is belonging to id 2
 */