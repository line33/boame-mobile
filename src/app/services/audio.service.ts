import { Injectable } from '@angular/core';
import { CaptureAudioOptions, MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { AlertComponent } from '../components/alert/alert.component';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { Media, MediaObject, MEDIA_STATUS } from '@ionic-native/media/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  // allowed formats
  formats : string = '.mp3,.wav,.aac,.ogg,.wma,.wma,.m4a,.mp4';
  fileName : string;
  fullPath : string;
  audio : MediaObject;

  constructor(private mediaCapture : MediaCapture, private file : File, private alert : AlertComponent,
    private toast : ToastController, private chooser : Chooser,
    private media : Media, private actionSheet : ActionSheetController,
    private filePath : FilePath, private platform : Platform) { }

  getAudio(callback:any)
  {
    this.chooser.getFile("audio/*").then((value : ChooserResult) => {
      
      if (value.mediaType.indexOf('audio/') >= 0)
      { 
        this.filePath.resolveNativePath(value.uri).then(async (path:any) => {
          
          // get the directory
          //const directory = path.substr(0, (path.lastIndexOf('/') + 1));

          // get buffer
          //const buffer = await this.file.readAsArrayBuffer(directory, value.name);

          // get the file blob
          //const fileBlob = new Blob([buffer], {type : fileType});

          // ok we good
          // load callback
          callback.call(this, {
            blob : '',
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
    let options: CaptureAudioOptions = { limit: 1 };
      this.mediaCapture.captureAudio(options)
        .then(
          async (data: MediaFile[]) => {

            // copy file and finilize upload
            this.finilizeUpload(callback, data[0].fullPath);
            
          },
          (err: CaptureError) => {
            this.alert.show('No Activity found to handle Audio Capture. You can use any sound recorder installed on your device and upload to BOAME using the option above.');
          }
      );

    /*
    const options = {
      playing : false,
      paused : false,
      recorded : false,
      header : 'Record voice',
      default : 'default',
      sheet : null
    };

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

        // if (this.platform.is('ios')) {
        //   this.fullPath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
        //   this.audio = this.media.create(this.fullPath);
        // } else if (this.platform.is('android')) {
        //   this.fullPath = this.file.dataDirectory.replace(/file:\/\//g, '') + this.fileName;
        //   this.audio = this.media.create(this.fullPath);
        // }

        // play audio file
        this.audio.play();

        // set the audio volume
        this.audio.setVolume(1.0);

        // prevent dismiss
        return false;
      },

      pause : () => {
        options.default = 'pause';
        options.header = 'Audio Paused.';
        sheet();

        // pause audio file
        this.audio.pause();

        // prevent dismiss
        return false;
      },

      stop : () => {
        options.default = 'stop';
        options.header = 'Recording Complete.';
        sheet();

        // stop recording
        this.audio.stopRecord();

        // release resource
        this.audio.release();

        // prevent dismiss
        return false;
      },

      ok : async () => {

        // release resource
        this.audio.release();

        // resolve path
        // this.filePath.resolveNativePath(directory + 'boame_audio_file.m4a').then(async (path)=>{

        //   // get buffer
        //   //const buffer = await this.file.readAsArrayBuffer(directory, 'boame_audio_file.m4a');

        //   // get the file blob
        //   //const fileBlob = new Blob([buffer], {type : 'audio/m4a'});

          // load callback
          callback.call(this, {
            blob : '',
            name : this.fileName,
            extension : 'm4a',
            directory : '',
            fullPath : this.fullPath
          });

        // });

        options.sheet.dismiss();

        // prevent default
        return false;
      },  

      pauseRecord : () => {
        options.default = 'resume';
        options.header = 'Recording Paused';
        sheet();

        // record audio
        this.audio.pauseRecord();

        // prevent dismiss
        return false;
      },

      resumeRecord : () => {
        options.default = 'record';
        options.header = 'Recording Voice..';
        sheet();

        // record audio
        this.audio.resumeRecord();

        // prevent dismiss
        return false;
      },

      record : () => {
        options.default = 'record';
        options.header = 'Recording Voice..';
        sheet();

        // stop playing the file
        // this.audio.stop(); 

        if (this.platform.is('ios')) {
          this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.m4a';
          this.fullPath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
          this.audio = this.media.create(this.fullPath);
        } else if (this.platform.is('android')) {
          this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.m4a';
          this.fullPath = this.file.externalApplicationStorageDirectory.replace(/file:\/\//g, '') + this.fileName;
          this.audio = this.media.create(this.fullPath);
        }

        // record audio
        this.audio.startRecord();

        this.audio.onError.subscribe(error => {
          console.log('Recorder error : ', error);
          this.audio.release();
        });

        this.audio.onStatusUpdate.subscribe(status => {
          console.log('recording media status : ', MEDIA_STATUS[status]);

          if (status == MEDIA_STATUS.STOPPED) this.audio.release();
          if (status == MEDIA_STATUS.RUNNING) console.log('Recorder running..');
        })

        // prevent dismiss
        return false;
      },

      cancel : () => {
        // release resource
        this.audio.release();
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
    */
  }

  finilizeUpload(callback:any, path : string)
  {
    callback.call(this, {
      blob : '',
      name : '',
      extension : '',
      directory : '',
      fullPath : path
    });

    /*
    this.filePath.resolveNativePath(fullPath).then(async (path)=>{

      // get the directory
      // const directory = path.substr(0, (path.lastIndexOf('/') + 1));

      // // get the file name
      // const fileName = path.split('/').pop();

      // // get the extension
      // const extension = fileName.split('.').pop();

      // // get file type
      // const fileType = this.getMimeType(extension);

      // // get buffer
      // const buffer = await this.file.readAsArrayBuffer(directory, fileName);

      // // get the file blob
      // const fileBlob = new Blob([buffer], fileType);

      // load callback
      

    });
    */
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
