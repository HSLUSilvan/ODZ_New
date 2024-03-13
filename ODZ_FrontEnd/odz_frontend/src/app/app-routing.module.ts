import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { OrganDetailComponent } from './organ-detail/organ-detail.component';
import { OrganGalleryTestComponent } from './organ-gallery-test/organ-gallery-test.component';
import { OrgelbauerSearchComponent } from './orgelbauer-search/orgelbauer-search.component';
import { SearchCombinedComponent } from './search-combined/search-combined.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent,  data : {title:'Startseite'}},
  {path: 'search', component: SearchComponent, data: { title: 'Orgelsuche' }},
  {path: 'orgelbauer-search', component: OrgelbauerSearchComponent, data: { title: 'Orgelbauer-Suche' }},
  {path: 'map', component: MapComponent, data: { title: 'Kartensuche' }},
  {path: 'search-combined', component: SearchCombinedComponent, data: { title: 'Kombinierte Suche' }},
  {path: 'edit', component: EditComponent, data: { title: 'Editierung' }},
  {path: 'organ/:id', component: OrganDetailComponent, data: { title: 'Orgel-Details' }},
  {path: 'test/galerie', component: OrganGalleryTestComponent, data: { title: 'Orgel-Galerie-Test' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent, HomeComponent, SearchComponent, MapComponent, EditComponent, OrganDetailComponent]
