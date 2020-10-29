import { Injectable } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { AlertComponent } from '../components/alert/alert.component';

const MEDIA_FOLDER_NAME = 'boame_uploads';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  formats : string = '.3gp,.ogg,.mp4,.m4v,.f4v,.f4a,.m4b,.m4r,.f4b,.mov,.wmv,.webm,.flv,.avi';

  constructor(private mediaCapture: MediaCapture, private file : File, private alert : AlertComponent) { }

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

  async captureVideo(callback:any)
  {
    let options: CaptureVideoOptions = { limit: 1, quality : 0 };
      this.mediaCapture.captureVideo(options)
        .then(
          async (data: MediaFile[]) => {
            // copy file and finilize upload
            this.finilizeUpload(callback, data[0].fullPath);
            
          },
          (err: CaptureError) => {
            this.alert.show('No Activity found to handle Video Capture.');
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
    else if (fileExt == 'mp4') return { type: 'video/mp4' };
    else if (fileExt == 'MOV') return { type: 'video/quicktime' };
  }

  // delete video
  deleteVideo(video:any)
  {
    this.file.removeFile(video.directory, video.name).then(()=>{}, (err:any) => {
      console.log('error removing video : ', video.name);
    });
  }
}
