// 7강
let username=prompt("아이디를 입력하세요");
let roomNum=prompt("채팅방 번호를 입력하세요!!");

document.querySelector("#username").innerHTML=username;

//SSE연결하기.
//const eventSource=new EventSource("http://localhost:8080/sender/king/receiver/brother");
const eventSource=new EventSource(`http://localhost:8080/chat/roomNum/${roomNum}`);


eventSource.onmessage=(event)=>{

    const data=JSON.parse(event.data);
    if(data.sender===username){
	 //파란박스에 되어야(오른쪽)
	 initMyMessage(data);
}else{
	//회색박스에 되어야(왼쪽)
	initYourMessage(data);
}
    //initMessage(data);
}

//파란박스 만들기
//function getSendMsgBox(msg, time){
	function getSendMsgBox(data){
		//convertTime 난 안 함.
		
    return `<div class="sent_msg">
    //<p>${msg}</>
    <p>${data.msg}</>
     //<span class='time_data">${time}</span>
     <span class='time_data">${data.createAt} / ${data.sender} </span>
    </div> `;
}

//회색박스 만들기
function getReceiveMsgBox(data){
     return `<div class="received_withd_msg">
    //<p>${msg}</>
    <p>${data.msg}</>
     //<span class='time_data">${time}</span>
     <span class='time_data">${data.createAt} / ${data.sender} </span>
    </div> `;
}




//최초 초기화될때, 1번방 3건이 있으면 3건을 다 다져와야.
//addMessage()함수 호출시 DB에 insert되고, 그 테이터가 자동으로 흘러들어 온다.(SSE이므로)
//파란박스 초기화 하기
function initMyMessage(data){
let chatBox=document.querySelector("#chat-box");
 //let msgInput=document.querySelector("#chat-outgoing-msg");


 let sendBox=document.createElement("div");
 sendBox.className="outgoing_msg";
 
 //chatOutgoingBox.innerHTML=getSendMsgBox(data.msg, data.createAt);
  sendBox.innerHTML=getSendMsgBox(data);
  chatBox.append(sendBox);
  //msgInput.value="";
  
  document.documentElement.scrollTop=document.body.scrollHeight;
}


//회색박스 초기화 하기
function initYourMessage(data){
let chatBox=document.querySelector("#chat-box");
 //let msgInput=document.querySelector("#chat-outgoing-msg");


 let receivedBox=document.createElement("div");
 receivedBox.className="received_msg";
 
 //chatOutgoingBox.innerHTML=getSendMsgBox(data.msg, data.createAt);
  receivedBox.innerHTML=getReceiveMsgBox(data);
  chatBox.append(receivedBox);
  //msgInput.value="";
  
   document.documentElement.scrollTop=document.body.scrollHeight;
}


//ajax로 채팅 메세지를 전송하기
async function addMessage(){ //async 10강.
 //let= chatBox=document.querySelector("#chat-box");
 let msgInput=document.querySelector("#chat-outgoing-msg");


// let chatOutgoingBox=document.createElement("div");
 //chatOutgoingBox.className="outgoing_msg";

 //let date=new Date();
 //let now=date.getHours()+""+date.getMinutes()+"|"+date.getMonth();+"|"+date.getDate();

 let chat={ //자바스크립트 객체임 ( 만든것.)
    //sender:"ssar",
    sender:username,
    //receiver:"cos",
    roomNum:roomNum,
    msg: msgInput.value
 };

 //let response=await  fetch("http://localhost:8080/chat",{ //JS함수인테 통신으로 서버로 테이버 보내는 것. 10강.
    fetch("http://localhost:8080/chat",{
  method:"post",
  body:JSON.stringify(chat),// JS->JSon
  headers:{
    "Content-Type": "application/json; charset=utf-8"
  }

 })

//let parseResponse= await response.json();

 
 //chatOutgoingBox.innerHTML=getSendMsgBox(msgInput.value, now);

 // chatBox.append(chatOutgoingBox);
  msgInput.value="";
}



//버튼 클릭시 메세지 전송
document.querySelector("#chat-outgoing-button").addEventListener("click",()=>{
 //alert('클릭됨');
 addMessage();

})

//엔터시 메세지 전송
document.querySelector("#chat-outgoing-msg").addEventListener("keydown",(e)=>{
   
   console.log(e.keyCode);
   if(e.keyCode===13){
    addMessage();
   }
   });







