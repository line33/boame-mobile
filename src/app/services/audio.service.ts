import { Injectable } from '@angular/core';
import { CaptureAudioOptions, MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { AlertComponent } from '../components/alert/alert.component';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  // allowed formats
  formats : string = '.mp3,.wav,.aac,.ogg,.wma,.wma,.m4a,.mp4';

  constructor(private mediaCapture : MediaCapture, private file : File, private alert : AlertComponent,
    private toast : ToastController, private chooser : Chooser,
    private media : Media, private actionSheet : ActionSheetController,
    private filePath : FilePath) { }

  getAudio(callback:any)
  {
    this.chooser.getFile("audio/*").then((value : ChooserResult) => {
      
      if (value.mediaType.indexOf('audio/') >= 0)
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

  async presentToast(msg : string = 'An audio file has been selected.') {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      animated : true
    });
    toast.present();
  }

  async captureAudio(callback:any)
  {
    // let options: CaptureAudioOptions = { limit: 1 };
    //   this.mediaCapture.captureAudio(options)
    //     .then(
    //       async (data: MediaFile[]) => {
    //         // copy file and finilize upload
    //         this.finilizeUpload(callback, data[0].fullPath);
            
    //       },
    //       (err: CaptureError) => {
    //         this.alert.show('No Activity found to handle Audio Capture.');
    //       }
    //   );
    const options = {
      playing : false,
      paused : false,
      recorded : false,
      header : 'Record voice',
      default : 'default',
      sheet : null
    };

    // directory
    const directory = this.file.tempDirectory == null ? this.file.externalRootDirectory : this.file.tempDirectory.replace(/^file:\/\//, '');

    // create file
    this.file.createFile(directory, 'boame_audio_file.m4a', true).then((e) => {

      // audio file
      let audioFile : MediaObject = this.media.create(directory + 'boame_audio_file.m4a');

      audioFile.onStatusUpdate.subscribe(status => console.log("STATUS: ", status)); // fires when file status changes

      audioFile.onSuccess.subscribe(() => console.log('Action is successful'));

      // get the native url
      const nativeUrl = e.nativeURL;

      // sheet
      const sheet = async () => {

        // dismiss sheet
        if (options.sheet !== null) options.sheet.dismiss();

        // action sheet
        const actionSheet = await this.actionSheet.create({
          header: options.header,
          cssClass: 'my-custom-class',
          backdropDismiss : false,
          buttons: buttons[options.default]
        });

        await actionSheet.present();

        // push
        options.sheet = actionSheet;
      };

      // build handlers
      const handlers = {
        play : () => {
          options.default = 'play';
          options.header = 'Playing Audio..';
          sheet();

          // release resource
          audioFile.release();

          // set the audio volume
          audioFile.setVolume(1.0);

          // play audio file
          audioFile.play();

          // prevent dismiss
          return false;
        },

        pause : () => {
          options.default = 'pause';
          options.header = 'Audio Paused.';
          sheet();

          // pause audio file
          audioFile.pause();

          // prevent dismiss
          return false;
        },

        stop : () => {
          options.default = 'stop';
          options.header = 'Recording Complete.';
          sheet();

          // stop recording
          audioFile.stopRecord();

          // release resource
          audioFile.release();

          // prevent dismiss
          return false;
        },

        ok : async () => {

          // release resource
          audioFile.release();

          // get buffer
          const buffer = await this.file.readAsArrayBuffer(directory, 'boame_audio_file.m4a');

          // get the file blob
          const fileBlob = new Blob([buffer], {type : 'audio/m4a'});

          // load callback
          callback.call(this, {
            blob : fileBlob,
            name : 'boame_audio_file.m4a',
            extension : 'm4a',
            directory : directory
          });

          options.sheet.dismiss();

          // prevent default
          return false;
        },  

        pauseRecord : () => {
          options.default = 'resume';
          options.header = 'Recording Paused';
          sheet();

          // record audio
          audioFile.pauseRecord();

          // prevent dismiss
          return false;
        },

        resumeRecord : () => {
          options.default = 'record';
          options.header = 'Recording Voice..';
          sheet();

          // record audio
          audioFile.resumeRecord();

          // prevent dismiss
          return false;
        },

        record : () => {
          options.default = 'record';
          options.header = 'Recording Voice..';
          sheet();

          // stop playing the file
          audioFile.stop(); 

          // record audio
          audioFile.startRecord();

          // prevent dismiss
          return false;
        },

        cancel : () => {
          // release resource
          audioFile.release();
        }
      };

      // build buttons 
      const buttons = {
        default : [
          {
            text: 'Record',
            role: 'button',
            icon: 'mic',
            cssClass : 'actionSheetIcon',
            handler: handlers.record
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            cssClass : 'actionSheetIcon',
            handler: handlers.cancel
          }
        ],

        record : [
          {
            text: 'Stop',
            role: 'button',
            icon: 'stop',
            cssClass : 'actionSheetIcon',
            handler: handlers.stop
          },
          {
            text: 'Pause Record',
            role: 'button',
            icon: 'pause',
            cssClass : 'actionSheetIcon',
            handler: handlers.pauseRecord
          },
        ],

        stop : [
          {
            text: 'Play',
            role: 'button',
            icon: 'play',
            cssClass : 'actionSheetIcon',
            handler: handlers.play
          },
          {
            text: 'Record Again',
            role: 'button',
            icon: 'mic',
            cssClass : 'actionSheetIcon',
            handler: handlers.record
          },
          {
            text: 'Submit',
            role: 'button',
            icon: 'navigate',
            cssClass : 'actionSheetIcon',
            handler: handlers.ok
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            cssClass : 'actionSheetIcon',
            handler: handlers.cancel
          }
        ],

        play : [
          {
            text: 'Pause',
            role: 'button',
            icon: 'pause',
            cssClass : 'actionSheetIcon',
            handler: handlers.pause
          },
          {
            text: 'Record',
            role: 'button',
            icon: 'mic',
            cssClass : 'actionSheetIcon',
            handler: handlers.record
          },
          {
            text: 'Submit',
            role: 'button',
            icon: 'navigate',
            cssClass : 'actionSheetIcon',
            handler: handlers.ok
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            cssClass : 'actionSheetIcon',
            handler: handlers.cancel
          }
        ],

        pause : [
          {
            text: 'Play',
            role: 'button',
            icon: 'play',
            cssClass : 'actionSheetIcon',
            handler: handlers.pause
          },
          {
            text: 'Record',
            role: 'button',
            icon: 'mic',
            cssClass : 'actionSheetIcon',
            handler: handlers.record
          },
          {
            text: 'Submit',
            role: 'button',
            icon: 'navigate',
            cssClass : 'actionSheetIcon',
            handler: handlers.ok
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            cssClass : 'actionSheetIcon',
            handler: handlers.cancel
          }
        ],

        resume : [
          {
            text: 'Stop',
            role: 'button',
            icon: 'stop',
            cssClass : 'actionSheetIcon',
            handler: handlers.stop
          },
          {
            text: 'Resume Record',
            role: 'button',
            icon: 'play',
            cssClass : 'actionSheetIcon',
            handler: handlers.resumeRecord
          },
        ]
      };

      // show sheet
      sheet();

    }, err => console.log(err));

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
