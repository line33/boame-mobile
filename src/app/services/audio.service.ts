import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  // allowed formats
  formats : string = '.aiff,.mp3,.wav,.aac,.ogg,.wma,.flac,.alac,.wma,.m4a,.mp4';

  constructor() { }

  getAudio(target : string)
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
