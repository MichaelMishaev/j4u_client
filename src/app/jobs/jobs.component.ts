import { Component, OnInit } from '@angular/core';
import { Job } from './jobs.model';
import { ApiService } from 'app/shared/api/api.service';
import { takeWhile } from 'rxjs/operators';
import { UserService } from 'app/shared/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import * as hopscotch from 'hopscotch';
import { NbSearchService } from '@nebular/theme';
import { ConfigService } from 'app/shared/services/config.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  dataModelLocations: any = [];
  dataModelCategories: any = [];
  dataModelAreas: any = [];
  dataModelCustomers: any = [];
  dropDownTitles = ["Cities", "Areas", "Categories"]

  showDropdowns = true;
  isTrusted = false;
  allLocations: any[];
  allCategories: any[];
  allAreas: any[];
  allCustomers: any[];
  public config = {
    limitTo: 100,
    displayKey: "translated", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '350px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: this.translate.instant("All"), // text to be displayed when no item is selected defaults to Select,
    customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    moreText: 'More', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'no results', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'id' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }
  public userManagerConfig;
  public jobTypeConfig;
  private alive = true;
  public isShowClosedJobs = false;


  user: any;
  lookupAreas: [];
  lookupCities: any[];
  lookupJobTypes: any[];
  filteredLookupCities: any[];
  filteredLookupSubCategory: any[];
  lookupCategories: [];
  lookupSubCategories: any[];
  allJobs: Job[];
  filteredJobs: Job[];
  currentDialog: any;
  isFiltersExist = false;

  constructor(private apiService: ApiService, private translate: TranslateService
    , private searchService: NbSearchService, private configService: ConfigService, private userService: UserService) {

    this.getAllJobs();

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.filteredJobs = this.allJobs.filter(x => x.Title.toLowerCase().indexOf(data.term.toLowerCase()) > -1 || x.ID == data.term);
      })
  }
  ngOnInit() {
    this.apiService.getLookups().subscribe((res: any) => {
      this.lookupAreas = res.areas.map(x => ({ Id: x.Id, Name: x.Name, translated: this.translate.instant(x.Name) }));
      this.lookupCategories = res.categories.map(x => ({ Id: x.Id, Name: x.Name, translated: this.translate.instant(x.Name) }));;
      this.lookupSubCategories = res.subCategories;
      this.lookupCities = res.cities.map(x => ({ Id: x.Id, Name: x.Name, translated: this.translate.instant(x.Name) }));;
      this.lookupJobTypes = res.jobTypes.map(x => ({ Id: x.Id, Name: x.Name, translated: this.translate.instant(x.Name) }));;

    });

    this.translate.onLangChange.subscribe(res => {
      this.config = { ...this.config, placeholder: this.translate.instant("All") };
    })
    this.userManagerConfig = Object.assign({}, this.config);
    this.userManagerConfig.displayKey = "fullName"
    this.jobTypeConfig = Object.assign({}, this.config);


    this.user = this.userService.getCurrentUser();

    this.isTrusted = this.user.userType === 3 || this.user.id === 1;

  }
  getAllJobs(showClosed = false) {
    this.apiService.getJobs(showClosed)
      .pipe(takeWhile(() => this.alive))
      .subscribe((data: Job[]) => {

        this.allJobs = data;
        let allLoc = [];
        let allCat = [];
        let allArea = [];
        data.map(i => i.Locations).forEach(element => {
          allLoc = allLoc.concat(element.split(','))
        });
        data.map(i => i.Categories).forEach(element => {
          allCat = allCat.concat(element.split(','))
        });
        data.map(i => i.Areas).forEach(element => {
          allArea = allArea.concat(element.split(','))
        });
        this.allLocations = Array.from(new Set(allLoc)).map(x => ({ id: x, translated: this.translate.instant(x) })).sort((a, b) => { return ('' + a.id).localeCompare(b.id); });
        this.allCategories = Array.from(new Set(allCat)).map(x => ({ id: x, translated: this.translate.instant(x) })).sort((a, b) => { return ('' + a.id).localeCompare(b.id); });
        this.allAreas = Array.from(new Set(allArea)).map(x => ({ id: x, translated: this.translate.instant(x) })).sort((a, b) => { return ('' + a.id).localeCompare(b.id); }).filter(y => y.id);
        this.allCustomers = Array.from(new Set(data.map(x => x.CompanyDescription ? x.CompanyDescription.trim() : ''))).sort((a, b) => { return a.localeCompare(b) });

        this.filteredJobs = data;
      });
  }

  showClosed() {
    this.getAllJobs(this.isShowClosedJobs)
  }


  locationsChanged(e) {
    this.filterByElement();
  }

  areasChanged(e) {
    this.filterByElement();
  }
  categoriesChanged(e) {
    this.filterByElement();
  }
  customersChanged(e) {
    this.filterByElement();
  }
  filterByElement() {
    this.filteredJobs = [];
    let filteredLocations = [];
    let filteredAreas = [];
    let filteredCustomers = [];
    let filteredCategories = [];

    if (this.dataModelAreas.length === 0) {
      filteredAreas = this.allJobs;
    } else {
      this.dataModelAreas.forEach(element => {
        filteredAreas = filteredAreas.concat(this.allJobs.filter(x => x.Areas.indexOf(element.id) > -1));
        filteredLocations = filteredLocations.concat(this.allJobs.filter(x => x.Locations.indexOf(element.id) > -1));

      });
    }

    if (this.dataModelLocations.length === 0) {
      filteredLocations = this.allJobs;
    } else {
      this.dataModelLocations.forEach(element => {
        filteredLocations = filteredLocations.concat(this.allJobs.filter(x => x.Locations.indexOf(element.id) > -1));
      });
    }

    if (this.dataModelCategories.length === 0) {
      filteredCategories = this.allJobs;
    } else {
      this.dataModelCategories.forEach(element => {
        filteredCategories = filteredCategories.concat(this.allJobs.filter(x => x.Categories.indexOf(element.id) > -1));
      });
    }
    if (this.dataModelCustomers.length === 0) {
      filteredCustomers = this.allJobs;
    } else {
      this.dataModelCustomers.forEach(element => {
        filteredCustomers = filteredCustomers.concat(this.allJobs.filter(x => x.CompanyDescription.indexOf(element) > -1));
      });
    }
    this.filteredJobs = this.intersect(filteredCustomers, this.intersect(filteredCategories, this.intersect(filteredLocations, filteredAreas)));


  }
  intersect(a, b) {
    return a.filter(value => -1 !== b.indexOf(value))

  }
  clearFilter() {

    this.filteredJobs = this.allJobs;
    this.dataModelLocations = [];
    this.dataModelCategories = [];
    this.dataModelAreas = [];
    this.dataModelCustomers = [];
    this.showDropdowns = false;
    setTimeout(() => {
      this.showDropdowns = true;
    }, 100);
  }
  uploadExcel(element) {
    var uploadedFiles = element.target.files;
    let formData = new FormData();
    for (var i = 0; i < uploadedFiles.length; i++) {
      let file = uploadedFiles[i];
      formData.append("uploads", file, new Date().getDate().toString());
    }
    this.apiService.uploadExcel(formData)
      .subscribe(() => {
        alert("הועלה")
      });
  }

  startTour() {
    // Destroy running tour
    hopscotch.endTour(true);
    // Initialize new tour 
    hopscotch.startTour(this.tourSteps());
  }

  tourSteps(): any {
    const placement = this.configService.templateConf.layout.dir === 'rtl' ? 'left' : 'right'
    return {
      id: 'demo-tour',
      showPrevButton: true,
      steps: [

        {
          title: this.translate.instant("Add job"),
          content: this.translate.instant("Add candidate for job"),
          target: "add-job",
          placement: placement
        },
        {
          title: this.translate.instant("Copy to clipboard"),
          content: this.translate.instant("Copy the job to social networks"),
          target: "copy-clipboard",
          placement: placement
        },
        {
          title: this.translate.instant("Search"),
          content: this.translate.instant("Search for the most relevant jobs"),
          target: "first-dropdown",
          placement: "bottom"
        }
      ],
      i18n: {
        doneBtn: this.translate.instant("Done"),
        prevBtn: this.translate.instant("Back"),
        nextBtn: this.translate.instant("Next"),
      }
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
