package com.bit.chatapp;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;

import reactor.core.publisher.Flux;

public interface ChatRepository extends ReactiveMongoRepository<Chat, String>{

	@Tailable //커서를 안 닫고 계속 유지한다.
	@Query("{sender:?0, receiver:?1}") //Mongo DB 문법
	Flux<Chat> mFindBySender(String sender, String receiver); //Flux흐름. 테이터를 계속 받겠다.
	//response를 계속 유지하면서 테이터를 계속 흘려보내기
	
	@Tailable //커서를 안 닫고 계속 유지한다.
	@Query("{roomNum:?0}") //Mongo DB 문법
	Flux<Chat> mFindByRoomNum(Integer roomNum); //Flux흐름. 테이터를 계속 받겠다.
	
}
