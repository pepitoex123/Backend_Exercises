console.log("Hola!");
const socket = io();
const submit = document.querySelector("#submit");
const submitMessages = document.querySelector("#submit__messages");

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const thumbnail = document.querySelector("#thumbnail");
const email = document.querySelector("#email");
const messageContent = document.querySelector("#message__content")
const tableBody = document.querySelector(".table__body");
const messagesBody = document.querySelector(".messages__body");




socket.on("mi mensaje", data => {
    alert(data);
    socket.emit("notificacion","Mensaje recibido correctamente")
    console.log(title.textContent);
})

submit.addEventListener("click",(e) => {
    e.preventDefault();
    if(!title.textContent || !price.textContent || !thumbnail.textContent){
        alert("Error!");
        return;
    }
    socket.emit("producto",JSON.stringify({title: title.textContent,price: price.textContent,thumbnail: thumbnail.textContent}))
})

submitMessages.addEventListener("click",(e) => {
    e.preventDefault();
    if(!email.textContent){
        alert("Error!");
        return;
    }
    socket.emit("mensaje", JSON.stringify({email: email.textContent, messageContent: messageContent.textContent, messageTime: moment().format("DD MM YYYY hh:mm:ss")  }))
})

socket.on("productos",(productos) => {
    console.log("Los productos son ", productos)
    const html = productos.map((producto) => {
        return(`
        <tr>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td>${producto.thumbnail}</td>
            <td>${producto.id}</td>
        </tr>
        `)
    }).join(" ")
    tableBody.innerHTML = html
    console.log(tableBody.innerHTML);
})

socket.on("mensajes", (mensajes) => {
    console.log("Los mensajes son ", mensajes)
    const html = mensajes.map((mensaje) => {
        return(`
            <p>
                <span>${mensaje.email}</span>
                <span>${mensaje.messageContent}</span>
                <span>${mensaje.messageTime}</span>
            </p>
        `)
    }).join(" ");
    messagesBody.innerHTML = html;
})