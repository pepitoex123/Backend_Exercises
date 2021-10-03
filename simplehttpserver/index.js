const http = require("http");

const PORT = 3000;

const server = http.createServer((req,res) => {
    res.writeHead(200,"Success",{
        "Content-Type": "application/json",
    })
    res.end(JSON.stringify({
        name: "Sir Isaac Newton",
        id: 1
    }))}
)

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});

