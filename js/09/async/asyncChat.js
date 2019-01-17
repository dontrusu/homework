function jsonPost(url, data){
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => new Error('jsonPost failed'))
}


var nextMessageId = 0;

send.onclick = async function(event){
    await jsonPost("http://students.a-level.com.ua:10012", {func: 'addMessage', nick: nick.value, message: message.value})
    showMessages();
}

async function showMessages(){
    var data = await jsonPost("http://students.a-level.com.ua:10012", {func: "getMessages", messageId: nextMessageId})
        for(var msgIndex in data.data){
            msg = data.data[msgIndex];
            var time = new Date(msg.timestamp).toLocaleTimeString()
            var div = document.createElement("div");
            chat.insertBefore(div, chat.firstChild);
            div.innerHTML = "<b>" + msg.nick + "</b>" + ": " + msg.message + "  (" + time + ")";
        }
        nextMessageId = data.nextMessageId
}
showMessages()

setInterval(showMessages, 2000);
