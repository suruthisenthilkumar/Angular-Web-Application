import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


export class IconRegistryClass {
   
    constructor(private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer){
        this.matIconRegistry.addSvgIcon( //Sonar
            "polymer",this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/polymer.svg")
          );
          this.matIconRegistry.addSvgIcon( //zap
            "flash",this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/flash.svg")
          );
          this.matIconRegistry.addSvgIcon( //Gen Revenue Report
            "note_add",this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/note_add.svg")
          );
          this.matIconRegistry.addSvgIcon( //Gen Report
            "how_to_vote",this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/how_to_vote.svg")
          );
          this.matIconRegistry.addSvgIcon( //Raise new Req
            "loupe",this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/loupe.svg")
          );
          this.matIconRegistry.addSvgIcon( //Reports
            "description",this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/description.svg")
          );  
          this.matIconRegistry.addSvgIcon( //Get Strted
            "directions_run",this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/directions_run.svg")
          );  
          this.matIconRegistry.addSvgIcon( //home
            "home",this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/home.svg")
          );  
          this.matIconRegistry.addSvgIcon(
            "delete",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/delete.svg")
          );
          this.matIconRegistry.addSvgIcon( //Status Update
            "update",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/update.svg")
          );
          this.matIconRegistry.addSvgIcon( //assign QA
            "people_alt",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/people_alt.svg")
          );
          this.matIconRegistry.addSvgIcon( //pen-edit
            "edit",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/edit.svg")
          );
          this.matIconRegistry.addSvgIcon( //hide pwd
            "remove_red_eye",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/remove_red_eye.svg")
          );
          this.matIconRegistry.addSvgIcon( //file upload
            "cloud_upload",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/cloud_upload.svg")
          );
          this.matIconRegistry.addSvgIcon( //file download
            "cloud_download",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/cloud_download.svg")
          );
          this.matIconRegistry.addSvgIcon(
            "exit_to_app",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/exit_to_app.svg")
          );
          this.matIconRegistry.addSvgIcon(
            "mail",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/mail.svg")
          );
          this.matIconRegistry.addSvgIcon(
            "location_city",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/location_city.svg")
          );
          this.matIconRegistry.addSvgIcon(
            "person",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/person.svg")
          );
          this.matIconRegistry.addSvgIcon(
            "https",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/https.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "newProject",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/post_add.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "save",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/check.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "download_arrow",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/downloadArrow.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "scan",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/scan.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "restore",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/restore.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "restore_page",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/restore_page.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "saveDraft",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/saveDraft.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "assigned",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/assigned.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "checklist",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/checklist.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "save_changes",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/save-changes.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "saveData",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/saveData.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "pending_actions",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/pending_actions-24px.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "check_box",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/check_box-24px.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "rate_review",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/rate_review-24px.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "send",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/send-black-18dp.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "beenhere",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/beenhere-24px.svg")
          );
          this.matIconRegistry.addSvgIcon( 
            "request_quote",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/request_quote-24px.svg")
          );
          this.matIconRegistry.addSvgIcon(
            "done_all",
            this.domSanitizer.bypassSecurityTrustResourceUrl("/./assets/images/done_all-black-18dp.svg")
          )
          this.matIconRegistry.addSvgIcon(
            "done_outline",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/done_outline-black-18dp.svg")
          );
          this.matIconRegistry.addSvgIcon(
            "dynamic_form",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/dynamic_form-black-18dp.svg")
          );
          this.matIconRegistry.addSvgIcon(
            "settings",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/settings.svg")
          );
          
          this.matIconRegistry.addSvgIcon(
            "createTester",
            this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/images/create-tester.svg")
          );
    }
}