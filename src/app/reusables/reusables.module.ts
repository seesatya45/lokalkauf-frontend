import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { HorizontalScalingBarComponent } from './horizontal-scaling-bar/horizontal-scaling-bar.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LkInputComponent } from './lk-input/lk-input.component';
import { LkButtonComponent } from './lk-button/lk-button.component';
import { LkMapComponent } from './lk-map/lk-map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LkTextareaComponent } from './lk-textarea/lk-textarea.component';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LkPageTitleComponent } from './lk-page-title/lk-page-title.component';
import { LkCheckboxComponent } from './lk-checkbox/lk-checkbox.component';
import { LkChipListComponent } from './lk-chip-list/lk-chip-list.component';
import { ImageChooserComponent } from './image-chooser/image-chooser.component';
import { FullscreenModalComponent } from './fullscreen-modal/fullscreen-modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { LkSelectComponent } from './lk-select/lk-select.component';
import { LkWarningBoxComponent } from './lk-warning-box/lk-warning-box.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { RatingStarComponent } from './rating-star/rating-star.component';
import { LkContainerComponent } from './lk-container/lk-container.component';
import { LkSliderComponent } from './lk-slider/lk-slider.component';
import { MatSliderModule } from '@angular/material/slider';
import { LkTestimonialComponent } from './lk-testimonal/lk-testimonial.component';
import { LkProductItemComponent } from './lk-product-item/lk-product-item.component';
import { MatCardModule } from '@angular/material/card';
import { LkContainerFullComponent } from './lk-container-full/lk-container.component-full';
import { LkAttributionComponent } from './lk-attribution/lk-attribution.component';
import { PipesModule } from '../pipes/pipes.modules';

const routes: Routes = [];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MapComponent,
    HorizontalScalingBarComponent,
    LkInputComponent,
    LkButtonComponent,
    LkTextareaComponent,
    LkPageTitleComponent,
    LkCheckboxComponent,
    LkSelectComponent,
    ImageChooserComponent,
    FullscreenModalComponent,
    LkWarningBoxComponent,
    RatingStarComponent,
    LkContainerComponent,
    LkContainerFullComponent,
    LkChipListComponent,
    LkMapComponent,
    LkSliderComponent,
    LkTestimonialComponent,
    LkProductItemComponent,
    LkAttributionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule.forRoot(),
    RouterModule.forRoot(routes),
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatCardModule,
    MatTooltipModule,
    NgxStarRatingModule,
    MatChipsModule,
    PipesModule,
  ],
  exports: [
    MapComponent,
    HorizontalScalingBarComponent,
    LkInputComponent,
    LkButtonComponent,
    LkTextareaComponent,
    LkPageTitleComponent,
    LkCheckboxComponent,
    LkSelectComponent,
    ImageChooserComponent,
    FullscreenModalComponent,
    LkWarningBoxComponent,
    RatingStarComponent,
    LkContainerComponent,
    LkContainerFullComponent,
    LkChipListComponent,
    LkMapComponent,
    LkSliderComponent,
    LkTestimonialComponent,
    LkProductItemComponent,
    LkAttributionComponent,
  ],
})
export class ReusablesModule {}
