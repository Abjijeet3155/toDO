const app = require('./app');

const port = 3000;
app.get('/',(req,res)=>{
res.send("Hello")
});

app.listen(port, () => {
    console.log(`Connected to server  https://localhost:${port}`);
});
    