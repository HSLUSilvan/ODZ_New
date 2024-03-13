import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganComponent } from './organ/organ.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'; 
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule } from '@angular/material/dialog';
import { OrgelbauerSearchComponent } from './orgelbauer-search/orgelbauer-search.component';
import { QRCodeModule } from 'angularx-qrcode';
import { DateDialog } from './dialog/dialog.component';
import { SearchComponent } from './search/search.component';
import { PlaceDialog } from './dialogOrt/dialogOrt.component';
import { UserDialog } from './dialogBenutzer/dialogBenutzer.component';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon'; 
import {MatTabsModule} from '@angular/material/tabs';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MatMenuModule } from '@angular/material/menu';
import { SearchCombinedComponent } from './search-combined/search-combined.component';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { OrganGalleryTestComponent } from './organ-gallery-test/organ-gallery-test.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    routingComponents,
    OrganComponent,
    OrgelbauerSearchComponent,
    DateDialog,
    SearchComponent,
    SearchCombinedComponent,
    PlaceDialog,
    UserDialog,
    OrganGalleryTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
GoogleMapsModule,
MatDialogModule,
MatDatepickerModule,
QRCodeModule,
ReactiveFormsModule,
MatMenuModule,
TranslateModule.forRoot(
  {
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
  }
  }
)
],
  providers: [Title ],
  bootstrap: [AppComponent],
})
export class AppModule { }
