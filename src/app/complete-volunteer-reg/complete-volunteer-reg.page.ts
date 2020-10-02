import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { RouterService } from '../services/router.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { NetworkService } from '../services/network.service';
import { AlertComponent } from '../components/alert/alert.component';
import { Storage } from '@ionic/storage';
import { BecomeAVolunteerPage } from '../become-a-volunteer/become-a-volunteer.page';

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

  constructor(private router : RouterService, private loader : LoaderComponent,
    private network : NetworkService, private alert : AlertComponent, private storage : Storage) {

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
    if (this.network.inputValid('.becomeavolunteercomplete'))
    {
      // check for cv upload
      if (this.files.cv == '') return this.alert.show('You need to attach your CV to continue.');

      // check for display image  
      if (this.files.display == '') return this.alert.show('You need to attach a profile/display image to continue.');

      // start submission
      this.loader.show(()=>{

        this.network.post('service/auth/register/volunteer', {
          firstname           : this.inputs.firstname,
          lastname            : this.inputs.lastname,
          bio                 : this.inputs.bio,
          telephone           : this.inputs.phone,
          email               : this.inputs.email,
          password            : this.inputs.password,
          password_again      : this.inputs.password_again,
          cv                  : this.files.cv,
          display_image       : this.files.display,
          volunteerpositionid : this.inputs.positionid,
          residential_address : this.inputs.address
        }).then((res:any)=>{

          if (res.data.status == 'error')
          {
            this.alert.show(res.data.message);
            this.loader.hide();
          }
          else
          {
            this.alert.success(res.data.message, ()=>{

              BecomeAVolunteerPage.clearInputs = true;
              this.files = {cv : '', display : ''};
              this.router.route('/homescreen');
              this.loader.hide();
              this.loaded = false;
              this.resetFileUpload();

            });
          }

        });
      });
    }
  }

  ionViewDidEnter(){
    this.scrollToTop();
    this.listenForFileUpload();
  }

  listenForFileUpload()
  {
    const file : any = document.querySelector('.becomeavolunteercomplete #cv');

    // listen for change event
    file.addEventListener('change', ()=>{

      // get the counter
      const counter = document.querySelector('.becomeavolunteercomplete ' + file.getAttribute('data-single-file'));
      
      // reset counter
      counter.innerHTML = '';

      // what do we have
      if (file.files.length > 0)
      {
        counter.innerHTML = '(1)';

        // push global
        this.files.cv = file.files[0];
      }
    });

    // display image
    const displayFile : any = document.querySelector('.becomeavolunteercomplete #display_image');

    if (displayFile !== null)
    {
      // get the display_image
      const displayImage = document.querySelector('.becomeavolunteercomplete label[for="display_image"]');

      let image : any = displayImage.querySelector('.path.image'), number : any = displayImage.querySelector('.path.number');

      // changed
      displayImage.addEventListener('change', ()=>{

        // reset
        number.style.display = 'none';

        // show image
        image.style.display = 'block';

        // are we cool ??
        if (displayFile.files.length > 0)
        {
          number.innerHTML = '1';
          // hide image
          image.style.display = 'none';
          number.style.display = 'block';

          // add now
          this.files.display = displayFile.files[0];
        }
        
      });
    }
  }

  resetFileUpload()
  {
    const file : any = document.querySelector('.becomeavolunteercomplete #cv');

    if (file != null)
    {
      // get the counter
      const counter = document.querySelector('.becomeavolunteercomplete ' + file.getAttribute('data-single-file'));
      
      // reset counter
      counter.innerHTML = '';
    }

    // manage display image
    const displayImage = document.querySelector('.becomeavolunteercomplete label[for="display_image"]');

    if (displayImage !== null)
    {
      let image : any = displayImage.querySelector('.path.image'), number : any = displayImage.querySelector('.path.number');

      number.style.display = 'none';
      image.style.display = 'block';
    }
  }

}
