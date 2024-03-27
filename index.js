const app = require("./server.js")

const port = process.env.PORT

const connecttodb = require("./db_config/db");

connecttodb();
app.listen(port,()=>{
    console.log(`listening on the port http://localhost:${port}`);
})