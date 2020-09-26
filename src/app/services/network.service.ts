import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from 'src/assets/http/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  endpoint : string = 'http://localhost:8888/boame_gateway/';
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
    public router : Router
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

  alive(message:string)
  {
    return true;
  }

  // validate input
  inputValid(target:any = '')
  {
    // @var bool allGood
    var allGood = false;

    // get parent
    target = (target !== '') ? document.querySelector(target) : document;

    // not null
    target = (target === null) ? document : target;

    // look for all data-input
    const dataInput =  target.querySelectorAll('*[data-input]');

    // are we good ?
    if (dataInput.length > 0)
    {
      // @var int passed
      let passed = 0;

      [].forEach.call(dataInput, (element:any, index:number)=>{

        // get the value
        const val = element.value;

        // match
        const regXp = new RegExp(element.getAttribute('data-input'), 'g');

        // we good ?
        if (val.match(regXp)) passed++;

        // can we get the message
        if (val.match(regXp) == null)
        {
          if (element.hasAttribute('data-message'))
          {
            // add error
            let parentNode = this.getParentNode(element, target);
            const message = element.getAttribute('data-message');

            let spanError : any = parentNode.querySelector('span[data-error="'+index+'"]');

            // try find span error
            if (spanError !== null)
            {
              spanError.innerHTML = message;
            }
            else
            {
              // create element
              spanError = document.createElement('span');
              spanError.setAttribute('data-error', index);

              // add message
              spanError.innerHTML = message;
              parentNode.appendChild(spanError);
            }
          }

          // apply keyup event
          element.addEventListener('keyup', (e:any)=>{
            // match val
            if (element.value.match(regXp))
            {
              // get parent node
              const parentNode = this.getParentNode(element, target);
              const spanError : any = parentNode.querySelector('span[data-error="'+index+'"]');
              // remove error
              if (spanError !== null) spanError.innerHTML = '';
            }
          });
        }
        else
        {
          // get parent node
          const parentNode = this.getParentNode(element, target);
          const spanError : any = parentNode.querySelector('span[data-error="'+index+'"]');
          // remove error
          if (spanError !== null) spanError.innerHTML = '';
        }

      });

      // update bool
      allGood = (passed == dataInput.length) ? true : false;
    }

    // remove all error spans
    if (allGood)
    {
      const errorSpan = target.querySelectorAll('span[data-error]');

      // can we remove em ?
      if (errorSpan.length > 0)
      {
        [].forEach.call(errorSpan, (element:any)=>{

          // get the parent 
          const parentElement = this.getParentNode(element, target);

          // can we go?
          if (parentElement !== null)
          {
            parentElement.removeChild(element);
          }
          else
          {
            element.innerHTML = '';
          }
        });
      }
    }

    // return bool
    return allGood;
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
}
