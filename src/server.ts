//
const fastify = require("fastify")();
const arr: string[] = [];
// fastify.patch("/todo/:index",(request,response)=>{
//     arr[request.params.index] = request.body.todo
//     response.send({message:"Updated"})
// })
// fastify.post("/todo",(request,response)=>{
//     const todo = request.body.todo
//     arr.push(todo);
//     response.send({message:"Created"})
// })

// fastify.get("/todo",(request,response)=>{
//     response.send(arr)
// })

// fastify.get("/todo/:index",(request,response)=>{
//     response.send({getindex:arr[request.params.index]})
// })


// fastify.delete("/todo",(request,response)=>{
//     arr.pop();
//     response.send({message:"Deleted"})
// })

// fastify.get("/",(request,response)=>{
//     response.send("<center>Hello World</center>");
// })
const letter: object[] = [];
const centerletter: object[] = [];
const postbox: object[] = [];
const user: object[] = [];
// function deleteletter(index:number,letter:object[]){
//     letter.splice()
// }
fastify.post("/user", (request, response) => {
    const users = {
        name: request.body.name,
        email: request.body.email,
        age: request.body.age
    }
    user.push(users);
    response.send({ message: "Create user successful" })
})
fastify.get("/user", (request, response) => {
    response.send(user)
})

fastify.post("/letter", (request, response) => {
    const postletter = {
        name: request.body.name,
        message: request.body.message,
        reciever: request.body.reciever,
        secrect_key: request.body.secrect_key
    }
    letter.push(postletter);
    response.send({ message: "Sent already" })
})

fastify.get("/letter", (request, response) => {
    response.send(letter);
})

fastify.get("/lettertocenter/:index", (request, response) => {
    centerletter.push(letter[request.params.index]);
    letter.splice(request.params.index, 1);
    response.send({ message: "Center have recieved",centerletter})
})

fastify.get("/centertopostbox/:index", (request, response) => {
    postbox.push(centerletter[request.params.index]);
    centerletter.splice(request.params.index, 1);
    response.send({ message: "Postbox have recieved",postbox})
})

fastify.patch("/recieved/:index", (request, response) => {
    const checkUser = user.filter((el)=> el["name"] === request.body.name);
    if (request.body.secrect_key === postbox[request.params.index]["secrect_key"]&& checkUser.length !== 0) {
        response.send(postbox[request.params.index]["message"])
    }
    response.send("Your secrect_key have Invalid");
})
fastify.listen(36000)