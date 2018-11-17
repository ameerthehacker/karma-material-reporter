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

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.init();
    this.initSubscription = this.socketService.onMessage('init').subscribe(env => {
      this.env = env;
      this.browsers = this.getBrowsers(env);
      this.browsers = this.processBrowsers(this.browsers);
    });
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
  }
}
