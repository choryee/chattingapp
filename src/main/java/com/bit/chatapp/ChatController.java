package com.bit.chatapp;

import java.awt.PageAttributes.MediaType;
import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RestController
@RequiredArgsConstructor
public class ChatController { //5강.

	private final ChatRepository chatRepository;
	
	//밑은 귀속말할때 사용하는 것.
	@CrossOrigin
	@GetMapping(value = "/sender/{sender}/receiver/{receiver}", produces = org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE)
	//위 SSE 프로토콜
	public Flux<Chat> getMsg(@PathVariable String sender, @PathVariable String receiver) {
		
		return chatRepository.mFindBySender(sender, receiver)
				.subscribeOn(Schedulers.boundedElastic());
	}
	
	
	@CrossOrigin
	@GetMapping(value = "/chat/roomNum/{roomNum}", produces = org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<Chat> findByRoomNum(@PathVariable Integer roomNum) {
		return chatRepository.mFindByRoomNum(roomNum)
				.subscribeOn(Schedulers.boundedElastic());
	}
		
	
	@CrossOrigin
	@PostMapping("/chat")
	//Mono는 테이터를 한번만 리턴한다는 것.
	public Mono<Chat> setMsg(@RequestBody Chat chat){
		System.out.println("chat===>"+chat);
		
		chat.setCreatedAt(LocalDateTime.now());		
		return chatRepository.save(chat);
	}
	
	
}
