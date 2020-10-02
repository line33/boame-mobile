import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  formats : string = '.3gp,.ogg,.mp4,.m4v,.f4v,.f4a,.m4b,.m4r,.f4b,.mov,.wmv,.webm,.flv,.avi';

  constructor() { }

  getVideo(target : string)
  {
    return new Promise((resolve, rejected)=>{
      // get element
      const element : any = document.querySelector(target);

      // are we good ??
      if (element === null) return rejected('Target : #'+target+' was not found');

      // resolve element
      element.addEventListener('change', ()=>{

        // check files
        if (element.files.length > 0) return resolve(element.files[0]);

      });

    });
  }
}
