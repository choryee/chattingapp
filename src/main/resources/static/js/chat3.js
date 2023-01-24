// 7강. JS 연습용으로 함.



function getMsg(msg){
	
    return `<div class="sent_msg">
    			<p>${msg}</>
   				<span class='time_data">11:48 | Today</span>
     			</div> 
     			`;
}


//버튼 클릭시 메세지 전송
document.querySelector("#chat-outgoing-button").addEventListener("click",()=>{
  let chatBox=document.querySelector("#chat-box");
  let msgInput=document.querySelector("#chat-outgoing-msg"); //글 내용 입력창
  console.log(msgInput.value);

  let chatOutgoingBox=document.createElement("div");
   chatOutgoingBox.className="outgoing_msg";


   chatOutgoingBox.innerHTML=getMsg(msgInput.value); //getMsg가 HTML로 읽을 수 있게 하는 것. 7강.10'40
   chatBox.append(chatOutgoingBox);

	msgInput.value="";
})

//엔터시 메세지 전송
document.querySelector("#chat-outgoing-msg").addEventListener("keydown",(e)=>{
   
   console.log(e.keyCode);
   if(e.keyCode===13){
    addMessage();
   }
   });







