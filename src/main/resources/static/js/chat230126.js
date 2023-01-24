
const eventSource=new EventSource("http://localhost:8080/sender/ssar/receiver/cos");
eventSource.onmessage=(event)=>{
    console.log("1>>>>>", event);
    const data=JSON.parse(event.data);
    console.log('2>>>>>>', data);
    initMessage(data);
}

function getSendMsgBox(msg, time){
    return `<div class="sent_msg">
                <p>${msg}</p>
                <span class="time_date">${time} | Today</span>
        </div>`;
}


function initMessage(data){
    let chatbox=$('#chat-box');
    // let chatbox=document.querySelector('#chat-box');
    let msginput=document.querySelector('#chat-outgoing-msg');
    //alert(msginput.value);

    let chatOutgoingBox=document.createElement('div');
    chatOutgoingBox.className="outgoing_msg";


    chatOutgoingBox.innerHTML=getSendMsgBox(data.msg, data.createdAt);
    msginput.value='';
    chatbox.append(chatOutgoingBox);
}

function addMessage(){
    let chatbox=$('#chat-box');
    // let chatbox=document.querySelector('#chat-box');
    let msginput=document.querySelector('#chat-outgoing-msg');
    //alert(msginput.value);

    let chatOutgoingBox=document.createElement('div');
    chatOutgoingBox.className="outgoing_msg";

    let date=new Date();
    let now=date.getHours()+": "+date.getMinutes();
    console.log("date", now);

    chatOutgoingBox.innerHTML=getSendMsgBox(msginput.value, now);
    msginput.value='';
    chatbox.append(chatOutgoingBox);
}

document.querySelector('#chat-outgoing-button').addEventListener('click', (e)=>{
   e.preventDefault();
   //alert("hey");
    addMessage();
})


function message() {
    var mes = $('#chat-outgoing-msg');
    var text = mes.text().val();
    return text;
}

document.querySelector('#chat-outgoing-msg').addEventListener('keydown', (e)=>{
    // console.log("e>>>>", e.keyCode);
  //  console.log("e>>>>", e);
    if(e.keyCode == 13) {
       addMessage();
    }
})

// function add(){
// //var msg=document.querySelector('<input>');
// var msg=$('<input>');
// msg.addClass('write_msg');
// msg.text().val();
//
// }