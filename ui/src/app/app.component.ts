import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private initSubscription: Subscription;
  private specResultSubscription: Subscription;
  private env: any;
  private baseImagePath = '/src/assets/images';
  private chromeLogo: string = `${this.baseImagePath}/chrome-logo.png`;
  private fireFoxLogo: string = `${this.baseImagePath}/firefox-logo.png`;
  private browserImages = [
    { name: 'HeadlessChrome', image: this.chromeLogo },
    { name: 'Chrome', image: this.chromeLogo },
    { name: 'Firefox', image: this.fireFoxLogo }
  ]
  private browsers;
  private logs = {};
  private noTests: boolean = false;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.init();
    this.initSubscription = this.socketService.onMessage('init').subscribe(env => {
      this.updateUI(env);
    });

    this.specResultSubscription = this.socketService.onMessage('specResult').subscribe(env => {
      this.updateUI(env);
    });
  }

  private updateUI(env) {
    this.env = env;

    if(!this.browsers) {
      this.browsers = this.getBrowsers(env);
      this.browsers = this.processBrowsers(this.browsers);
    }
    else {
      let browsers = this.getBrowsers(env);
      browsers = this.processBrowsers(browsers);
      browsers.forEach(browser => {
        let isPresent: boolean = this.browsers.find(e => e.id == browser.id);

        if(!isPresent) {
          this.browsers.push(browser);
        }
      })
    }
  }

  private getBrowsers(env) {
    let browsers = [];

    for(let key in env) {
      browsers.push(env[key].browser);
    }

    return browsers;
  }

  private processBrowsers(browsers) {
    for(let i = 0; i < browsers.length; i++) {
      const browserName = browsers[i].name;
      const browserId = browsers[i].id;

      this.logs[browserId] = [];
      for(let key in this.env[browserId].logs) {
        if(this.env[browserId].logs.hasOwnProperty(key)) {
          const logs = this.env[browserId].logs[key];

          if(logs.log.length > 0) {
            this.logs[browserId].push(logs);            
          }
        }
      }

      this.browserImages.forEach(browserImage => {
        if(browserName.startsWith(browserImage.name)) {
          browsers[i].name = browserImage.name;
          browsers[i].image = browserImage.image;
        }
      });
    }

    return browsers;
  }

  ngOnDestroy() {
    // Required to avoid memory leaks
    this.initSubscription.unsubscribe();
    this.specResultSubscription.unsubscribe();
  }
}
