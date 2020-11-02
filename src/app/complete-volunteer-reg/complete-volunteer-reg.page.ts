import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { RouterService } from '../services/router.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { NetworkService } from '../services/network.service';
import { AlertComponent } from '../components/alert/alert.component';
import { Storage } from '@ionic/storage';
import { BecomeAVolunteerPage } from '../become-a-volunteer/become-a-volunteer.page';
import { AudioService } from '../services/audio.service';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/File/ngx';

@Component({
  selector: 'app-complete-volunteer-reg',
  templateUrl: './complete-volunteer-reg.page.html',
  styleUrls: ['./complete-volunteer-reg.page.scss'],
})
export class CompleteVolunteerRegPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  inputs : any = {};
  files : any = {
    cv : '',
    display : ''
  };
  firstname : string = '';
  lastname : string = '';
  position : string = '';
  loaded : boolean = false;
  validation : any = {
    error : {},
    rules : {
      bio : ['10', 'We need to know a little bit more about you.']
    }
  };

  constructor(private router : RouterService, private loader : LoaderComponent,
    private network : NetworkService, private alert : AlertComponent, private storage : Storage,
    private audio : AudioService, private chooser : Chooser, private filePath : FilePath,
    private file : File) {

    this.inputs = this.router.getData();

    setTimeout(()=>{

      // can we redirect
      if (this.inputs == null) return this.router.route('/become-a-volunteer');

      // get positions
      this.storage.get('boame_volunteer_positions').then(positions => {
        if (positions !== null)
        {
          positions.forEach((position:any) => {
            if (position.volunteerpositionid == this.inputs.positionid) this.position = position.volunteerposition;
          });
        }
      });

      // get the firstname and lastname
      this.firstname = this.inputs.firstname;
      this.lastname = this.inputs.lastname;

      // loaded
      this.loaded = true;

    },500);
  }

  ngOnInit() {}

  ionViewWillEnter(){}

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  submit()
  {
    const validate = this.network.inputValid(this.inputs, this.validation);

    if (validate.ok === true)
    {
      // check for cv upload
      if (this.files.cv == '') return this.audio.presentToast('You need to attach your CV to continue.');

      // check for display image  
      if (this.files.display == '') return this.audio.presentToast('You need to attach a profile/display image to continue.');

      // start submission
      this.loader.show(()=>{

        // build form data
        var formdata = new FormData();
        formdata.append('display_image', this.files.display.blob, this.files.display.name);
        formdata.append('cv', this.files.cv.blob, this.files.cv.name);

        // add others
        formdata.append('firstname', this.inputs.firstname);
        formdata.append('lastname', this.inputs.lastname);
        formdata.append('bio', this.inputs.bio);
        formdata.append('telephone', this.inputs.phone);
        formdata.append('email', this.inputs.email);
        formdata.append('password', this.inputs.password);
        formdata.append('password_again', this.inputs.password_again);
        formdata.append('volunteerpositionid', this.inputs.positionid);
        formdata.append('residential_address', this.inputs.address);
        formdata.append('gender', this.inputs.gender);

        this.network.post('service/auth/register/volunteer', formdata, false).then((res:any)=>{

          if (res.data.status == 'error')
          {
            this.loader.hide(()=>{
              this.audio.presentToast(res.data.message);
            });
          }
          else
          {
            this.alert.success(res.data.message, ()=>{

              BecomeAVolunteerPage.clearInputs = true;
              this.files = {cv : '', display : ''};
              this.router.route('/homescreen');
              this.loader.hide();
              this.loaded = false;
            });
          }

        });
      });
    }
    else
    { 
      this.validation.error = validate.error;
      this.audio.presentToast('You have an input error');
    }
  }

  pickDisplayImage()
  {
    // load chooser
    this.chooser.getFile("image/*").then((value : ChooserResult) => {
      
      if (value.mediaType.indexOf('image/') >= 0)
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
          this.files.display = {
              blob : fileBlob,
              name : value.name,
              extension : value.name.split('.').pop()
          };

          // show toast
          this.audio.presentToast('Display image selected successfully');

        });

      }
      
    }, err => {
      console.log(err);
    });
  }

  pickCv()
  {
    // load chooser
    this.chooser.getFile("image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document").then((value : ChooserResult) => {
      
      const fileType = value.mediaType;
      
      this.filePath.resolveNativePath(value.uri).then(async (path:any) => {
        
        // get the directory
        const directory = path.substr(0, (path.lastIndexOf('/') + 1));

        // get buffer
        const buffer = await this.file.readAsArrayBuffer(directory, value.name);

        // get the file blob
        const fileBlob = new Blob([buffer], {type : fileType});

        // ok we good
        this.files.cv = {
            blob : fileBlob,
            name : value.name,
            extension : value.name.split('.').pop()
        };

        // show toast
        this.audio.presentToast('CV selected successfully');

      });
      
    }, err => {
      console.log(err);
    });
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }

}
