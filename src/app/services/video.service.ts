import { Injectable } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { File, FileEntry, DirectoryEntry } from '@ionic-native/File/ngx';
import { AlertComponent } from '../components/alert/alert.component';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

const MEDIA_FOLDER_NAME = 'boame_uploads';
const ALLOWED_MIME_TYPE = "video/mp4";

declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  formats : string = '.3gp,.ogg,.mp4,.m4v,.f4v,.f4a,.m4b,.m4r,.f4b,.mov,.wmv,.webm,.flv,.avi';
  uploadedVideo: string;

  constructor(private mediaCapture: MediaCapture, private file : File, private alert : AlertComponent,
    private chooser : Chooser, private toast : ToastController,
    private filePath: FilePath, private plt : Platform, private camera : Camera, private alertCtrl : AlertController) { }

  getVideo(callback:any)
  {
    this.chooser.getFile("video/*").then(async (value : ChooserResult) => {
      
      if (value.mediaType.indexOf('video/') >= 0)
      {
 
        this.filePath.resolveNativePath(value.uri).then(async (path:any) => {

          // get the file blob
          const fileBlob = [];

          // ok we good
          // load callback
          callback.call(this, {
            blob : fileBlob,
            name : value.name,
            extension : value.name.split('.').pop(),
            fullPath : value.uri
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

  async presentAlert(title:any, message:string) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  async captureVideo(callback:any)
  {
    // const options: CameraOptions = {
    //   mediaType: this.camera.MediaType.VIDEO,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    // };

    let options: CaptureVideoOptions = { limit: 1, quality : 0 };
      this.mediaCapture.captureVideo(options)
        .then(
          async (data: MediaFile[]) => {

            let videoUrl = data[0].fullPath;

            var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
            var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

            dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
            
            try {
              var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
              var retrievedFile = await this.file.getFile(dirUrl, filename, {});

            } catch(err) {
              return this.presentAlert("Error","Something went wrong.");
            }
            
            retrievedFile.file( data => {

                if (data.type !== ALLOWED_MIME_TYPE) return this.presentAlert("Error", "Incorrect file type.");

                // this.selectedVideo = ;
                this.finilizeUpload(callback, retrievedFile.nativeURL, filename);
            });
            
            
          },
          (err: CaptureError) => {
            //this.alert.show('No Activity found to handle Video Capture.');
          }
      );


  }

  async finilizeUpload(callback:any, path : string, filename:string)
  {
    // get the directory
    // const directory = path.substr(0, (path.lastIndexOf('/') + 1));

    // // get the file name
    // const fileName = path.split('/').pop();

    // // get the extension
    // const extension = fileName.split('.').pop();

    // // get file type
    // const fileType = this.getMimeType(extension);

    // // get buffer
    // await this.file.readAsArrayBuffer(directory, fileName).then((buffer)=>{

    //   // get the file blob
    //   const fileBlob = new Blob([buffer], fileType);
    
    // });

    // load callback
    callback.call(this, {
      blob : '',
      name : filename,
      extension : '',
      directory : path,
      fullPath : path
    });
  }

  getMimeType(fileExt:string) {
    if (fileExt == 'wav') return { type: 'audio/wav' };
    if (fileExt == 'mp4') return { type: 'video/mp4' };
    if (fileExt == 'MOV') return { type: 'video/quicktime' };
  }

  // delete video
  deleteVideo(video:any)
  {
    this.file.removeFile(video.directory, video.name).then(()=>{}, (err:any) => {
      console.log('error removing video : ', video.name);
    });
  }
}
