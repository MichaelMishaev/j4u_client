import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { TemplateConfig } from "../template-config/config.interface";
import { environment } from 'environments/environment';

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  public templateConf: TemplateConfig;

  constructor() {
    this.setConfigValue();
  }

  setConfigValue(dir = 'ltr') {
    const selectedLang = localStorage.getItem('selected_lang')
    let selectedLangDir = ''
    if(selectedLang){
      selectedLangDir = selectedLang === "he" ? 'rtl' : 'ltr'
    } 
    const dirFromEnv = environment.defaultLang === "he" ? 'rtl' : 'ltr'
    this.templateConf = {
      layout: {
        variant: "Light", // options:  Dark, Light & Transparent
        dir: selectedLangDir || dirFromEnv || dir, //Options: ltr, rtl
        customizer: {
          hidden: true //options: true, false
        },
        sidebar: {
          collapsed: false, //options: true, false
          size: "sidebar-md", // Options: 'sidebar-lg', 'sidebar-md', 'sidebar-sm'
          backgroundColor: "man-of-steel", // Options: 'black', 'pomegranate', 'king-yna', 'ibiza-sunset', 'flickr', 'purple-bliss', 'man-of-steel', 'purple-love'

          /* If you want transparent layout add any of the following mentioned classes to backgroundColor of sidebar option :
            bg-glass-1, bg-glass-2, bg-glass-3, bg-glass-4, bg-hibiscus, bg-purple-pizzaz, bg-blue-lagoon, bg-electric-viloet, bg-protage, bg-tundora
          */
          backgroundImage: true, // Options: true, false | Set true to show background image
          backgroundImageURL: "assets/img/sidebar-bg/01.jpg"
        }
      }
    };
  }
}
