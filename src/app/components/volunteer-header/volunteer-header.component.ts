import { Component, OnInit } from '@angular/core';
import { GoBackComponent } from '../go-back/go-back.component';

@Component({
  selector: 'app-volunteer-header',
  templateUrl: './volunteer-header.component.html',
  styleUrls: ['./volunteer-header.component.scss'],
})
export class VolunteerHeaderComponent implements OnInit {

  roleContainer : any = {};

  constructor(private backComponent : GoBackComponent) {
    this.roleContainer = document.getElementsByClassName('select-role-container');
  }

  ngOnInit() {}

  goback()
  {
     this.backComponent.goback();
  }

  showRoleContainer()
  {
    
    if (this.roleContainer !== null && this.roleContainer.length > 0)
    {
        // get the first element
        [].forEach.call(this.roleContainer, (element:any)=>{
          
          // add animate-modal-in
          element.classList.add('animate-modal-in');

          // look for the close button
          const closeButton : any = element.querySelector('*[data-target="closeblackthin"]');

          // listen for a click event
          closeButton.addEventListener('click', ()=>{
            
            element.classList.add('animate-modal-out');

            // remove class now
            setTimeout(()=>{
              element.classList.remove('animate-modal-in');
              element.classList.remove('animate-modal-out');
            },1000);
          });
          
        });
    }
  }

  hideRoleContainer()
  {
    
    if (this.roleContainer !== null && this.roleContainer.length > 0)
    {
        // get the first element
        [].forEach.call(this.roleContainer, (element:any)=>{

          element.classList.add('animate-modal-out');

          // remove class now
          setTimeout(()=>{
            element.classList.remove('animate-modal-in');
            element.classList.remove('animate-modal-out');
          },1000);
          
        });
    }
  }

}
