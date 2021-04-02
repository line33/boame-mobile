import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from 'src/assets/http/http';
import { AppComponent } from '../app.component';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class NetworkService { 

  endpoint : string = 'http://beta.wekiwork.com/boame/gateway/';
  apiToken  : string = 'xQUvREqEXPFhP4LwR3ZVUP3ki8moJen9iTFrfPKQXVLDlaJgGiMS';
  imagedir : string = 'public/assets/images/';
  expired : string = '/home';
  headers : any = {};
  callback : any = {};
  token : any = null;
  waitingList : any = [];
  waitingID = 0;
  remove : any = [];
  noContentType : boolean = false;

  public static runningService : boolean = false;

  constructor(
    public router : Router,
    private storage : Storage
  ) {
    // set request header;
    this.callback = new Function();
  }

  prepareHeader(method : string = '')
  {
    var headers = {}

    if (this.noContentType)
    {
       headers = {
        'x-authorization-token' : this.apiToken,
       };
    }
    else
    {
      headers = {
        'x-authorization-token' : this.apiToken
      };
    }

    // merge both
    if (method == '')
    {
       headers = Object.assign(headers, this.headers);
    }

    // return headers
    return headers;
  }

  headersRemove(key:string)
  {
    this.remove.push(key);
  }

  url(path:string)
  {
    return this.endpoint + path;
  }

  // get requests
  get(path:string)
  { 
    this.waitingID += 1;

    const ID = this.waitingID;

    let headers = this.prepareHeader('get');

    // merge headers
    headers = Object.assign(headers, this.headers);

    const http = new HTTP;
    http.headers(headers);
    http.remove = this.remove;
    this.headers = {};

    NetworkService.runningService = true;

    const promise = new Promise((resolve, rejected)=>{

      http.get(this.endpoint + path, (res:any) => {
      
        if (res.status > 0)
        {
          resolve(res);
        }
        else
        {
          rejected(res);
        }

        NetworkService.runningService = false;

      }, ID);

    });

     return promise;
  }

  // post request
  post(path:string, data:any, useFormData : boolean = true)
  {
    let headers = this.prepareHeader('post');

    this.waitingID += 1;

    const ID = this.waitingID;

    // merge headers
    headers = Object.assign(headers, this.headers);

    const http = new HTTP;
    http.headers(headers);
    http.remove = this.remove;
    http.useFormData = useFormData;
    this.headers = {};

    // can we use form data
    if (useFormData === true)
    {
      if (typeof data == 'object')
      {
        const formData = new FormData();

        // add now
        for( var key in data )
        {
          formData.append(key, data[key]);
        }

        // set
        data = formData;
      }
    }

    NetworkService.runningService = true;

    const promise = new Promise((resolve, rejected)=>{

      http.post(this.endpoint + path, data, (res:any) => {

        if (res.status > 0)
        {
          resolve(res);
        }
        else
        {
          rejected(res);
        }
  
        NetworkService.runningService = false;
  
      }, ID);

    });

    return promise;
  }

  // post request
  put(path:string, data:any)
  {
    let headers = this.prepareHeader('put');

    this.waitingID += 1;

    const ID = this.waitingID;

    // merge headers
    headers = Object.assign(headers, this.headers);

    const http = new HTTP;
    http.headers(headers);
    http.remove = this.remove;
    this.headers = {};

    NetworkService.runningService = true;

    const promise = new Promise((resolve, rejected)=>{

      http.put(this.endpoint + path, data, (res:any) => {
        if (res.status > 0)
        {
          resolve(res);
        }
        else
        {
          rejected(res);
        }

        NetworkService.runningService = false;

      }, ID);

    });

    return promise;
  }

  handler()
  {
    return (res:any, ID:number) => {
      if (res.status > 0)
      {
        if (this.waitingList.length > 0 && typeof this.waitingList[ID] != undefined)
        {
            const callback = this.waitingList[ID];
            if (typeof callback == 'function')
            {
              callback.call(Object.create(null), res);
            }
        }
      }
      else
      {
        // System.error('No Network connection found. Please check your network settings', ()=>{
        //   this.router.navigateByData({url : ['/home'], data : []});
        // });
      }
      NetworkService.runningService = false;
    };

  }

  isexpired(res:any)
  {
     
  }

  req2(method:string, path:string, data:any=null, noheader:any = false, callback:any = null)
  {
     if (typeof noheader === 'function') {
      callback = noheader;
      noheader = false;
     }

     return this.open(method, this.url(path), data, noheader, callback);
  }

  // open
  open(method:string, url:string, data:any=null, noheader:any = false, callback:any = null)
  {
    var headers = (noheader) ? {} : this.prepareHeader(method);

    this.waitingID += 1;

    const ID = this.waitingID;

    // merge headers
    headers = Object.assign(headers, this.headers);

    const http = new HTTP;
    http.headers(headers);
    http.remove = this.remove;
    this.headers = {};

    NetworkService.runningService = true;

    // manage callback
    callback = callback == null ? this.handler() : callback;

    switch (method.toLowerCase())
    {

      case 'get':
        return http.get(url, callback, ID);

      case 'put':
        return http.put(url, data, callback, ID);
      
      case 'post':
        return http.post(url, data, callback, ID);

      case 'delete':
      break;

    }

    return this;
  }

  // validate input
  inputValid(input:any = {}, validation:any = {})
  {
    // @var object allGood
    var status = {ok : false, error : {}};

    // build span element
    const spanElement = (message : string, id : any) => {
      return '<span>'+message+'</span>';
    };

    // get index 
    var index = 0;
    var passed = 0;

    // apply validation rules
    for (var name in validation.rules)
    {
      // do we have something
      if (typeof input[name] == 'undefined')
      {
        validation.error[name] = spanElement(validation.rules[name][1], index);
      }
      else
      {
        // create string object
        var str = new String(input[name]);

        // trim off white spaces
        str = str.valueOf().trim();

        // try apply
        if (str.length >= Number(validation.rules[name][0]))
        {
          if (typeof validation.error[name] != 'undefined') delete validation.error[name];
          passed++;
        }
        else
        {
          validation.error[name] = spanElement(validation.rules[name][1], name);
        }
      }

      // increment index
      index++;
    }

    // set the errorrs
    status.ok = (passed == index) ? true : false;
    status.error = validation.error;

    // return status
    return status;
  }

  // get the parent node
  getParentNode(element:any, target : any)
  {
    // get the parent node
    let parentNode = element.parentNode;

    // check for data parent
    if (element.hasAttribute('data-parent'))
    {
      // find now
      const elementParent = target.querySelector(element.getAttribute('data-parent'));

      // are we good
      parentNode = (elementParent !== null) ? elementParent : element.parentNode;
    }

    // return node
    return parentNode;

  }

  // add accountid if it exists
  withAccount(data:any = {}, callback:any = null)
  {
    const info = AppComponent.accountInformation;

    if (info !== null) data.accountid = info.account.accountid;

    // add hash
    this.storage.get('boame_device_hash').then((hash:any)=>{

      // add hash
      if (hash !== null) data.devicehash = hash;

      // load callback
      if (callback !== null) callback.call(this, data);

    });
  }
}
