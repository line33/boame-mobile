import { Injectable } from '@angular/core';
import { CaptureAudioOptions, MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  // allowed formats
  formats : string = '.aiff,.mp3,.wav,.aac,.ogg,.wma,.flac,.alac,.wma,.m4a,.mp4';

  constructor(private mediaCapture : MediaCapture, private file : File, private alert : AlertComponent) { }

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

  async captureAudio(callback:any)
  {
    let options: CaptureAudioOptions = { limit: 1 };
      this.mediaCapture.captureAudio(options)
        .then(
          async (data: MediaFile[]) => {
            // copy file and finilize upload
            this.finilizeUpload(callback, data[0].fullPath);
            
          },
          (err: CaptureError) => {
            this.alert.show('No Activity found to handle Audio Capture.');
          }
      );
  }

  async finilizeUpload(callback:any, fullPath : string)
  {
    // get the directory
    const directory = fullPath.substr(0, (fullPath.lastIndexOf('/') + 1));

    // get the file name
    const fileName = fullPath.split('/').pop();

    // get the extension
    const extension = fileName.split('.').pop();

    // get file type
    const fileType = this.getMimeType(extension);

    // get buffer
    const buffer = await this.file.readAsArrayBuffer(directory, fileName);

    // get the file blob
    const fileBlob = new Blob([buffer], fileType);

    // load callback
    callback.call(this, {
      blob : fileBlob,
      name : fileName,
      extension : extension,
      directory : directory
    });
  }

  getMimeType(fileExt:string) {
    if (fileExt == 'wav') return { type: 'audio/wav' };
    else if (fileExt == 'mp4') return { type: 'audio/mp4' };
    else if (fileExt == 'mp3') return { type: 'audio/mp3' };
  }

  // delete audio
  deleteAudio(audio:any)
  {
    this.file.removeFile(audio.directory, audio.name).then(()=>{}, (err:any) => {
      console.log('error removing video : ', audio.name);
    });
  }
}
