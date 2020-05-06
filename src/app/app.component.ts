import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { StorageService } from './services/storage.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { CookieService } from 'ngx-cookie-service';
import { Subject, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  events: string[] = [];
  opened: boolean;

  constructor(
    public router: Router,
    public userService: UserService,
    private storageService: StorageService,
    private cookieService: CookieService,
    private analytics: AngularFireAnalytics,
  ) { }

  // this.cookieService.set('GAEnabled', 'true'); --> Has to be set to work with Analytics
  // Some Observable for Cookies has to be created!
  ngOnInit(): void {
    if (this.cookieService.get('GAEnabled') === 'true') {
        this.analytics.setAnalyticsCollectionEnabled(true);
    }
  }

  navigate(route: string) {
    this.opened = false;
    this.router.navigate([route]);
  }

  navigateTraders() {
    this.opened = false;
    let route = '/';
    const city = this.storageService.loadLocation();
    if (city) {
      route = `/localtraders/${city.coordinates[0]}/${city.coordinates[1]}/${
        city.radius ? city.radius.toString() : '10'
      }`;
    }
    this.router.navigate([route]);
  }
}
