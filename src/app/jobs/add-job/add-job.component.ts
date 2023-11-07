import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/shared/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
  showNewJobCity = false;
  jobOpenOptions = [{id: 1, description:'משרה פתוחה'}, {id:0,description: 'משרה סגורה'}]
  showNewJobSubCategory = false;
  job: any;
  questions: FormArray;
  newJobFormGroup:FormGroup;
  userManagers: any[];
  // addJobModalRef:any;
  lookupAreas: any;
  lookupCategories: any;
  lookupSubCategories:any;
  lookupCities: any;
  lookupJobTypes: any;
  filteredLookupCities: any;
  filteredLookupSubCategory:any;
  public config = {
    limitTo: 100,
    displayKey:"description", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '350px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'All', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    moreText: 'More', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'id' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }
  areaConfig: {
  limitTo: number; displayKey: string; //if objects array passed which key to be displayed defaults to description
    search: boolean; //true/false for the search functionlity defaults to false,
    height: string; //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: string; // text to be displayed when no item is selected defaults to Select,
    customComparator: () => void; // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    moreText: string; // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: string; // text to be displayed when no items are found while searching
    searchPlaceholder: string; // label thats displayed in search input,
    searchOnKey: string; // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  categoryConfig: {
  limitTo: number; displayKey: string; //if objects array passed which key to be displayed defaults to description
    search: boolean; //true/false for the search functionlity defaults to false,
    height: string; //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: string; // text to be displayed when no item is selected defaults to Select,
    customComparator: () => void; // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    moreText: string; // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: string; // text to be displayed when no items are found while searching
    searchPlaceholder: string; // label thats displayed in search input,
    searchOnKey: string; // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  
  subCategoryConfig: {
    limitTo: number; displayKey: string; //if objects array passed which key to be displayed defaults to description
      search: boolean; //true/false for the search functionlity defaults to false,
      height: string; //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: string; // text to be displayed when no item is selected defaults to Select,
      customComparator: () => void; // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      moreText: string; // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: string; // text to be displayed when no items are found while searching
      searchPlaceholder: string; // label thats displayed in search input,
      searchOnKey: string; // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    };

  userManagerConfig: any;
  cityConfig: {
  limitTo: number; displayKey: string; //if objects array passed which key to be displayed defaults to description
    search: boolean; //true/false for the search functionlity defaults to false,
    height: string; //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: string; // text to be displayed when no item is selected defaults to Select,
    customComparator: () => void; // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    moreText: string; // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: string; // text to be displayed when no items are found while searching
    searchPlaceholder: string; // label thats displayed in search input,
    searchOnKey: string; // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  jobTypeConfig: {
  limitTo: number; displayKey: string; //if objects array passed which key to be displayed defaults to description
    search: boolean; //true/false for the search functionlity defaults to false,
    height: string; //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: string; // text to be displayed when no item is selected defaults to Select,
    customComparator: () => void; // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    moreText: string; // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: string; // text to be displayed when no items are found while searching
    searchPlaceholder: string; // label thats displayed in search input,
    searchOnKey: string; // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  get questionsFormArray(): FormArray {
    return this.newJobFormGroup.get('questions') as FormArray;
  }
  constructor(private formBuilder: FormBuilder,public dialogService: NgbModal,
    private translate:TranslateService,
     private apiService: ApiService,private toastrService: ToastrService) { }

  ngOnInit() {
    var isInUpdate = this.job && Object.keys(this.job).length > 0;
    this.newJobFormGroup = this.formBuilder.group({
      Id : new FormControl(this.job.ID || 0,[Validators.required]),
      IsImportant: new FormControl((this.job.IsImportant && this.job.IsImportant.data && this.job.IsImportant.data[0] === 1) || false,[Validators.required]),
      Title : new FormControl(this.job.Title || '',[Validators.required]),
      //Commission : new FormControl(job.Commission? job.Commission * 1.66666666666666666 : '',[Validators.required]),
      Commission : new FormControl(this.job.Commission? this.job.Commission : '',[Validators.required]),
      CompanyDescription: new FormControl(this.job.CompanyDescription || '',[Validators.required]),
      AgentDescription :new FormControl(this.job.AgentDescription || '',[Validators.required]),
      Description : new FormControl(this.job.Description || '',[Validators.required]),
      JobType: new FormControl(this.job.JobType || '',[Validators.required]),
      Area : new FormControl(this.job.Areas || '',[Validators.required]),
      City : new FormControl(this.job.Locations || '',[Validators.required]),
      Category: new FormControl(this.job.Categories || '',[Validators.required]),
      SubCategory: new FormControl(this.job.SubCategory || '',[Validators.required]),
      Period: new FormControl(this.job.Period || '',[Validators.required]),
      PaymentPeriod: new FormControl(this.job.PaymentPeriod || '',[Validators.required]),
      Status: new FormControl(this.job.Status != undefined ? 
        this.translate.instant((this.jobOpenOptions.find((x: any) =>x.id === this.job.Status) as any).description) :this.translate.instant('Open job'),[Validators.required]),
      UserId: new FormControl(this.job.UserId && this.userManagers && this.userManagers.length > 0 ? (this.userManagers.find((x: any) =>x.id === this.job.UserId) as any).fullName : '',[Validators.required]),
      questions:this.job.questions =  this.formBuilder.array([ this.createItem() ])
    });
    if(this.job.Questions){
      this.questions = this.newJobFormGroup.get('questions') as FormArray;
      this.questions.removeAt(0);
      this.job.Questions.split(';').forEach(element => {
        this.questions.push(this.formBuilder.group({
          question:element
        }));
      });
    }
    this.job.isInUpdate = isInUpdate;
    this.apiService.getUserManagers().subscribe((res: any)=>{
      this.userManagers = res;
    });
    this.getLookups()
    this.initConfigs()
  }
  initConfigs(){
    this.areaConfig = Object.assign({}, this.config);
    this.cityConfig = Object.assign({}, this.config);
    this.categoryConfig = Object.assign({}, this.config);
    this.userManagerConfig = Object.assign({}, this.config);
    this.jobTypeConfig = Object.assign({}, this.config);
    this.subCategoryConfig = Object.assign({},this.config)
    this.subCategoryConfig.placeholder = 'תת קטגוריה'; 
    this.subCategoryConfig.displayKey = "Name";
    this.areaConfig.placeholder = "אזור";
    this.areaConfig.displayKey = "Name";
    this.cityConfig.placeholder = "עיר";
    this.cityConfig.displayKey = "Name";
    this.categoryConfig.placeholder = "קטגוריה"
    this.categoryConfig.displayKey = "Name"
    this.jobTypeConfig.placeholder = "היקף המשרה"
    this.jobTypeConfig.displayKey = "Name"
    this.userManagerConfig.placeholder = "רכז משויך"
    this.userManagerConfig.displayKey = "fullName"
  }
  getLookups(){
    this.apiService.getLookups().subscribe((res:any)=>{
      this.lookupAreas = res.areas;
      this.lookupCategories = res.categories;
      this.lookupSubCategories = res.subCategories;
      this.lookupCities = res.cities;
      this.lookupJobTypes = res.jobTypes;
      this.filteredLookupCities = this.lookupCities;
    });
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      question:''
    });
  }
  addItem(): void {
    this.questions = this.newJobFormGroup.get('questions') as FormArray;
    this.questions.push(this.createItem());
  }
  removeItem(){
    this.questions = this.newJobFormGroup.get('questions') as FormArray;
    if(this.questions.length > 1){
      this.questions.removeAt(this.questions.length -1);
  
    }
  }
  submitAddJob(){
    var job = Object.assign({}, this.newJobFormGroup.value);
    var user = this.newJobFormGroup.get('UserId');
    var userId;
    if(typeof user.value === 'string' || user.value instanceof String){
      userId = (this.userManagers.find((x: any) =>x.fullName === user.value) as any).id;
    } else {
      userId = this.newJobFormGroup.get('UserId').value.id;
    }
    var statusStr = typeof this.newJobFormGroup.get('Status').value === 'string' ? this.newJobFormGroup.get('Status').value : this.newJobFormGroup.get('Status').value.description
    job.Status = (this.jobOpenOptions.find((x: any) =>x.description === statusStr) as any).id;

    console.log("job obj: " + job)
    console.log("status is: : " + job.Status)

    job.Locations = typeof this.newJobFormGroup.get('City').value === 'string'
                        ? this.newJobFormGroup.get('City').value : this.newJobFormGroup.get('City').value.Name;

    job.JobType = typeof this.newJobFormGroup.get('JobType').value === 'string'
    ? this.newJobFormGroup.get('JobType').value
    : (this.newJobFormGroup.get('JobType').value as any).map(x => x.Name).join(",");


    job.Areas = typeof this.newJobFormGroup.get('Area').value === 'string'
                        ? this.newJobFormGroup.get('Area').value : this.newJobFormGroup.get('Area').value.Name;
    job.Categories =  typeof this.newJobFormGroup.get('Category').value === 'string'
                        ? this.newJobFormGroup.get('Category').value : this.newJobFormGroup.get('Category').value.Name;
    job.SubCategory = typeof this.newJobFormGroup.get('SubCategory').value === 'string'
                        ? this.newJobFormGroup.get('SubCategory').value : this.newJobFormGroup.get('SubCategory').value.Name;
    job.UserId = userId;
    job.Questions = job.questions.map(x=>x.question).join(';');
    if(job.IsImportant.data){
      job.IsImportant = job.IsImportant.data[0];
    }
    this.apiService.addJob(job).subscribe(()=>{

      // this.addJobModalRef.close();
      this.dialogService.dismissAll()
      this.toastrService.success('job saved');
     // this.isShowClosedJobs = false;
     //todo emit
      if(job.Id > 0) {
        //todo emit job added
      }

    },(err)=>{
      this.toastrService.error('job didnt save due to error or it allready exist');

    })
  }
  addJobCategoryChanged(category){
    this.showNewJobSubCategory = false;
    this.newJobFormGroup.patchValue({
      SubCategory: '' });
    this.filteredLookupSubCategory = this.lookupSubCategories.filter(x=>x.CategoryId == category.value.Id);
    setTimeout(() => {
      this.showNewJobSubCategory = true;
    }, 0);
  }
  //TODO IMPLEMENT
  addJobAreaChanged(area){
    this.showNewJobCity = false;
    this.newJobFormGroup.patchValue({
      City: '' });
    this.filteredLookupCities = this.lookupCities.filter(x=>x.AreaId == area.value.Id);
    setTimeout(() => {
      this.showNewJobCity = true;
    }, 0);
  }
}
