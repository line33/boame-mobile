import { Component, OnInit } from '@angular/core';
import { AudioService } from '../services/audio.service';
import { RouterService } from '../services/router.service';
import { AlertComponent } from '../components/alert/alert.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { NetworkService } from '../services/network.service';
import { ChatService } from '../services/chat.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@Component({
  selector: 'app-submit-audio',
  templateUrl: './submit-audio.page.html',
  styleUrls: ['./submit-audio.page.scss'],
})
export class SubmitAudioPage implements OnInit {

  audioRecord : boolean = false;
  formats : string = '';
  file : any = null;
  reportText : string = '';

  constructor(private audio : AudioService, private router : RouterService,
    private alert : AlertComponent, private loader : LoaderComponent,
    private network : NetworkService, private chatService : ChatService,
    private transfer : FileTransfer, private diagnostic : Diagnostic)
  {
    this.formats = this.audio.formats;
  }

  ngOnInit() {

  }

  ionViewDidEnter()
  {
    this.router.getData((data:any)=>{

      // can we continue
      if (data == null) return this.router.route('/send-an-audio');

      // get the type
      switch (data.type)
      {
        case 'upload':
          this.audioRecord = false;
        break;

        case 'recorded':
          this.audioRecord = true;
        break;
      }
      
      // load file
      this.file = data.file;

    });

  }

  recordAudio()
  {
    this.diagnostic.requestMicrophoneAuthorization().then(()=>{
      this.audio.captureAudio((audio:any) => {

        // changed
        this.audio.presentToast('Audio record changed.');
  
        // update file
        this.file = audio;
  
      });
    }).catch(error=>{

    });
  }

  pickAudio()
  {
    this.audio.getAudio((audio:any)=>{
      this.file = audio;
    });
  }

  submit()
  {
    // please select an audio
    if (this.file == null && this.audioRecord == false) return this.alert.show('Please select an audio to continue');

    // please record your voice
    if (this.file == null && this.audioRecord == true) return this.alert.show('Please record your voice to continue');

    // show loader
    this.loader.show(()=>{
      this.network.withAccount({
        report          : this.reportText,
        audio           : this.file,
        REQUEST_METHOD  : 'PUT' 
      }, (data:any)=>{

        // processor
        const processor = (res:any)=>{

          if (res.data.status == 'error')
          {
            this.loader.hide(()=>{
              this.audio.presentToast(res.data.message);
            });
          }
          else
          {
            this.chatService.caseSubmitted('audio');

            this.alert.success(res.data.message, ()=>{

              // report case service requested
              this.chatService.serviceRequested('report-case-tag-audio');

              // delete video locally
              //if (this.audioRecord) this.audio.deleteAudio(this.file);

              // route view
              this.router.route('/send-an-audio');
              this.file = null;
              this.reportText = '';
              this.loader.hide();
            });
          }

        };

        // create form data
        const formData = new FormData();

        // delete audio
        delete data['audio'];

        // add others
        for (var key in data) formData.append(key, data[key]);

        // create transfer object
        const fileTransfer: FileTransferObject = this.transfer.create();

        // create file upload option
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: this.file.name,
          chunkedMode: false,
          headers: {
            'REQUEST_METHOD' : 'PUT',
            'x-authorization-token' : this.network.apiToken
          }
        };

        fileTransfer.upload(this.file.fullPath, this.network.endpoint + 'cases/caseFile', options)
        .then((data) => {

          // add audio
          formData.append('audio', JSON.parse(data.response).name);

          // run post
          this.network.post('cases/report/audio', formData, false).then(processor);

        }, () => {
          
          // error
          this.loader.hide(()=>{
            this.audio.presentToast('Could not upload your audio file at this time.');
          });

        });

        

      });
    });
  }

}
