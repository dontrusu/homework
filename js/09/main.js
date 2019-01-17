function jsonPost(url, data)
{
    return new Promise((resolve, reject) => {
        var x = new XMLHttpRequest();   
        x.onerror = () => reject(new Error('jsonPost failed'))
        //x.setRequestHeader('Content-Type', 'application/json');
        x.open("POST", url, true);
        x.send(JSON.stringify(data))

        x.onreadystatechange = () => {
            if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
                resolve(JSON.parse(x.responseText))
            }
            else if (x.status != 200){
                reject(new Error('status is not 200'))
            }
        }
    })
}

var nextMessageId = 0;

send.onclick = function(event){
    jsonPost("http://students.a-level.com.ua:10012", {func: 'addMessage', nick: nick.value, message: message.value})
    showMessages();
}

function showMessages(){
    var data = jsonPost("http://students.a-level.com.ua:10012", {func: "getMessages", messageId: nextMessageId})
    .then(function(data){
        for(var msgIndex in data.data){
            msg = data.data[msgIndex];
            var time = new Date(msg.timestamp).toLocaleTimeString()
            var div = document.createElement("div");
            chat.insertBefore(div, chat.firstChild);
            div.innerHTML = "<b>" + msg.nick + "</b>" + ": " + msg.message + "  (" + time + ")";
        }
        nextMessageId = data.nextMessageId
    })
}
showMessages()

setInterval(showMessages, 2000);
