const express= require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");


const app = express();
const PORT = 8000;

//  Middleware: Plugin 
app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
    console.log("Hello from middleware 1.");
    // return res.json({mag:"Hello from middleware 1"});
    next();
})   

// Define routes here...

app.get("/users" , (req, res) =>{

    const html = `<ul>
       ${users.map( (user) =>`<li>${user.first_name}</li>`).join("")}               
    </ul>`;
    res.send(html)

})

 // Rest API...

app.get("/api/users" , (req, res) =>{
    return res.json(users);
});                                         



app.route('/api/users/:id').get((req, res) =>{

    const id= Number(req.params.id);
    const user = users.find((user) => user.id ===id);
    return res.json(user);
})
        .patch((req, res)=>{
// Edit user with id..

return res.json(({status:"pending"}))

})
.delete((req, res) => {
// Delete user with id..

return res.json(({status:"pending"}))

});


app.post("/api/users/", (req, res) =>{
    // TOOD: Create New User..
    const body = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) =>{
        return res.json({staus:"success", id: users.length});   
    })
    console.log("body", body);  

});


/* app.post("/api/users/", (req, res) =>{
    // TOOD: Create New User..
    return res.json({staus:"pending"});
});

app.patch("/api/users:id", (req,res) =>{
    // TOOD: Edit the user with id ...
    return res.json({staus:"pending"});
});

app.delete("/api/users:id", (req,res) =>{
    // TOOD: Delete the user with id ...
    return res.json({staus:"pending"});
});
*/

app.listen(PORT, () => console.log(`Server Started at Port : ${PORT}`));            