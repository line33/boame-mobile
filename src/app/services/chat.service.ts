import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Socket } from 'ngx-socket-io';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  accountid : any = 2;
  token : any = '';
  static servicesRequested = [];

  constructor(private socket: Socket, private storage : Storage) { 

    // load token
    //this.token = AppComponent.webSocketToken();
  }

  // get id
  loadId(callback:any)
  {
    if (AppComponent.accountInformation == null)
    {
      // use device hash
      this.storage.get('boame_device_hash').then(hash => {

        this.accountid = hash;

        // load callback
        callback.call(this);

      }); 
    }
    else
    {
      // load id
      if (typeof AppComponent.accountInformation.account.accountid != 'undefined') this.accountid = AppComponent.accountInformation.account.accountid;

      // load callback
      callback.call(this);
    }
    
  }

  sendChat(message:any, sendTo:any){
    this.loadId(()=>{
      this.socket.emit('message', JSON.stringify({
        message : message,
        sendTo : sendTo,
        accountid : this.accountid,
        token : this.token
      }));
    });
  }

  chatConversations(accountid:number)
  {
    this.loadId(()=>{
      this.socket.emit('my conversations', JSON.stringify({
        sender : this.accountid,
        receiver : accountid,
        token : this.token
      }));
    });
  }

  chatList()
  {
    this.loadId(()=>{
      this.socket.emit('my-chat-list', JSON.stringify({
        accountid : this.accountid,
        token : this.token
      }));
    });
  }
  
  nowOnline()
  {
    this.loadId(()=>{
      this.socket.emit('now online', JSON.stringify({
        accountid : this.accountid
      }));
    })
  }

  caseSubmitted(caseType:string)
  {
    this.socket.emit('case submitted', caseType);
  }

  serviceRequested(serviceName : string)
  {
    if (ChatService.servicesRequested.indexOf(serviceName) < 0)
    {
      
      this.storage.get('boame_device_hash').then((hash:any) => {

        var _accountid = null;

        // service has been requested
        if (AppComponent.accountInformation != null)
        {
          _accountid = AppComponent.accountInformation.account.accountid;
        }
        else
        {
          _accountid = 0;
        }

        this.socket.emit('service was requested', JSON.stringify({
          accountid   : _accountid,
          service     : serviceName,
          device_hash : hash
        }));
  
        // push service
        ChatService.servicesRequested.push(serviceName);

      });
      
    }
    
  }

  loadCounsellors()
  {
    this.loadId(()=>{
      this.socket.emit('get counsellors', this.accountid);
    })
  }

  nowTyping(receiver:number)
  {
    this.loadId(()=>{
      this.socket.emit('typing', JSON.stringify({
        accountid : this.accountid,
        receiver : receiver
      }));
    });
  }

  stoppedTyping(receiver:number)
  {
    this.loadId(()=>{
      this.socket.emit('stop typing', JSON.stringify({
        accountid : this.accountid,
        receiver : receiver
      }));
    });
  }

  nowOffline()
  {
    this.loadId(()=>{
      this.socket.emit('now offline', JSON.stringify({
        accountid : this.accountid
      }));
    });
  }

  requestChat(accountid:number)
  {
    this.loadId(()=>{
      this.socket.emit('request chat', JSON.stringify({
        sender : this.accountid,
        receiver : accountid,
        token : this.token
      }));
    });
  }

  autoStartChat(accountid:number)
  {
    this.loadId(()=>{
      this.socket.emit('auto start chat', JSON.stringify({
        sender : this.accountid,
        receiver : accountid
      }));
    });
  }

  isOnline(accountid:number)
  {
     this.socket.emit('is online', accountid);
  }

  getCounsellors()
  {
    return this.socket.fromEvent('get counsellors');
  }

  getIsOnline()
  {
    return this.socket.fromEvent('is online');
  }

  getAutoStartChat()
  {
    return this.socket.fromEvent('auto start chat');
  }

  getWhenTyping()
  {
    return this.socket.fromEvent('typing');
  }

  getWhenNotTyping()
  {
    return this.socket.fromEvent('stop typing');
  }

  getChatList(){
    return this.socket.fromEvent('my-chat-list');
  }

  getNowOnline(){
    return this.socket.fromEvent('now online');
  }

  getNowOffline(){
    return this.socket.fromEvent('now offline');
  }

  receiveChat(){
    return this.socket.fromEvent('message');
  }

  getConversations(){
    return this.socket.fromEvent('my conversations');
  }

  getRequestChat(){
    return this.socket.fromEvent('request chat');
  }

  getCaseAssigned(){
    return this.socket.fromEvent('case assigned');
  }

} 