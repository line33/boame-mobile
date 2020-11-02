import { Injectable } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { AlertComponent } from '../components/alert/alert.component';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { ToastController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';

const MEDIA_FOLDER_NAME = 'boame_uploads';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  formats : string = '.3gp,.ogg,.mp4,.m4v,.f4v,.f4a,.m4b,.m4r,.f4b,.mov,.wmv,.webm,.flv,.avi';

  constructor(private mediaCapture: MediaCapture, private file : File, private alert : AlertComponent,
    private chooser : Chooser, private toast : ToastController,
    private filePath: FilePath) { }

  getVideo(callback:any)
  {
    this.chooser.getFile("video/*").then(async (value : ChooserResult) => {
      
      if (value.mediaType.indexOf('video/') >= 0)
      {
        const fileType = value.mediaType;
        
        this.filePath.resolveNativePath(value.uri).then(async (path:any) => {
          
          // get the directory
          const directory = path.substr(0, (path.lastIndexOf('/') + 1));

          // get buffer
          const buffer = await this.file.readAsArrayBuffer(directory, value.name);

          // get the file blob
          const fileBlob = new Blob([buffer], {type : fileType});

          // ok we good
          // load callback
          callback.call(this, {
            blob : fileBlob,
            name : value.name,
            extension : value.name.split('.').pop()
          });

          // show toast
          this.presentToast();

        });
      }
      
    }, err => console.log(err));
  }

  async presentToast(msg:string = 'A video file has been selected.') {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      animated : true
    });
    toast.present();
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
            //this.alert.show('No Activity found to handle Video Capture.');
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
