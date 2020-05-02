import { Component, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Location } from '../../models/location';
import { ActivatedRoute } from '@angular/router';
import { LkSelectOptions } from '../../reusables/lk-select/lk-select.component';
import { TraderProfile } from '../../models/traderProfile';
import { StorageService } from '../../services/storage.service';
import { uiTexts } from '../../services/uiTexts';
import {
  faFacebookF,
  faTwitter,
  faWhatsapp,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LocationService } from '../../services/location.service';
import { ImageService } from 'src/app/services/image.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-trader-overview',
  templateUrl: './trader-overview.component2.html',
  styleUrls: ['./trader-overview.component.scss'],
})
export class TraderOverviewComponent implements OnInit {
  traders: TraderProfile[] = [];

  STORE_TYPES = [
    {
      key: '1',
      display: 'Alle',
      value: 'alle',
    },
    {
      key: '2',
      display: 'Gastronomie',
      value: 'gastronomie',
    },
    {
      key: '3',
      display: 'Lebensmittel',
      value: 'lebensmittel',
    },
    {
      key: '4',
      display: 'Fashion',
      value: 'fashion',
    },
    {
      key: '5',
      display: 'Buchhandlung',
      value: 'buchhandlung',
    },
    {
      key: '6',
      display: 'Home & Decor',
      value: 'homedecor',
    },
    {
      key: '7',
      display: 'Blumen & Garten',
      value: 'blumengarten',
    },
    {
      key: '8',
      display: 'Handwerk',
      value: 'handwerk',
    },
    {
      key: '9',
      display: 'Sonstiges',
      value: 'sonstiges',
    },
  ];
  paramRadius: number;
  storeType: string;
  locations: Array<Location>;
  selectedTrader: LkSelectOptions;
  storeTypes: Observable<LkSelectOptions[]>;

  hasLocations$: Observable<boolean> = of(true);
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faWhatsapp = faWhatsapp;
  faInstagram = faInstagram;
  text = uiTexts;

  rangeChanging$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  userPosition: number[];
  hasInitLocations: boolean;

  get range() {
    return this.rangeGroup.get('range');
  }

  rangeGroup = new FormGroup({
    range: new FormControl(0),
  });

  constructor(
    private route: ActivatedRoute,
    public readonly storageService: StorageService,
    public userService: UserService,
    private locationService: LocationService,
    private imageService: ImageService,
    private spinnerService: SpinnerService
  ) {
    this.storeTypes = of(this.STORE_TYPES);
    this.selectedTrader = this.storageService.loadTraderFilter();
    if (this.selectedTrader) {
      this.storeType = this.selectedTrader.value;
    }
  }

  ngOnInit() {
    // on radius changed
    this.rangeGroup.get('range').valueChanges.subscribe((value: any) => {
      const location = this.storageService.loadLocation();

      if (location && location.coordinates) {
        this.paramRadius = value;
        location.radius = value;

        this.storageService.saveLocation(location);

        this.loadLocations();
      }
    });

    this.route.params.subscribe((params) => {
      try {
        this.userPosition = [
          Number.parseFloat(params.lat),
          Number.parseFloat(params.lng),
        ];

        this.paramRadius = Number.parseFloat(params.rad);
        this.setRange(this.paramRadius);
        this.rangeGroup
          .get('range')
          .setValue(this.paramRadius, { emitEvent: false, onlySelf: true });

        this.initLocations();
      } catch {
        console.log('no location available');
      }
    });
  }

  // the locations of the Traders are loaded here
  loadLocations() {
    this.spinnerService.show();
    const filter = this.getCategoryFilter();

    // if the initial call has no results,
    // and a category from Session Storage
    // is isn't equals 'all', then try again with the
    // category 'all' to repeat the initial search process.
    if (!this.hasInitLocations && this.storeType !== 'alle') {
      this.selectedTrader = this.STORE_TYPES[0];
      this.setStoreType(this.STORE_TYPES[0]);
      return;
    }

    this.locationService
      .nearBy(this.paramRadius, this.userPosition, filter)
      .then((result: any) => {
        this.locations = result.data.locations;

        if (this.locations && this.locations.length > 0) {
          // set hasLocations and hasinitialLocations to true, to hide the 'No results found' view
          this.hasLocations$ = of(true);
          this.hasInitLocations = true;

          // load thumbnails.
          // TODO: it makes no sense to load the thumbnailurl dynamically
          // from the DB. The public thumbnailURL should already be stored in the locations.
          // This should be refactored in one of the next iterations!
          this.locations.forEach(async (l: any) => {
            l.thumbnailURL = await await this.imageService.getThumbnailUrl(
              l.defaultImagePath
            );

            if (!l.thumbnailURL) {
              l.thumbnailURL = '/assets/lokalkauf-pin.svg';
            }
          });
        }
      })
      .catch((e) => {
        console.log('error: ' + e);
      })
      .finally(() => {
        this.spinnerService.hide();
      });
  }

  // Initially the counters of the available locations are loaded.
  // this minimizes the initial transfer of data. The initial call of the locations
  // is mainly used to display the "No results found" view.
  initLocations() {
    this.spinnerService.show();
    this.locationService
      .countNearBy(this.paramRadius, this.userPosition)
      .then((res) => {
        this.hasInitLocations = res && res.totalItems > 0;

        this.hasLocations$ = of(this.hasInitLocations);

        if (this.hasInitLocations) {
          this.loadLocations();
        }
      })
      .catch((e) => {
        console.log('error while init locations: ' + e);
      })
      .finally(() => {
        this.spinnerService.hide();
      });
  }

  setRange(val: number) {
    this.rangeChanging$.next(val);
  }

  setStoreType(selEvent: LkSelectOptions) {
    if (selEvent) {
      this.storeType = selEvent.value;
      this.storageService.saveTraderFilter(selEvent);

      this.loadLocations();
    }
  }

  getCategoryFilter() {
    return {
      categories:
        !this.storeType || this.storeType === 'alle' ? [] : [this.storeType],
    };
  }
}
