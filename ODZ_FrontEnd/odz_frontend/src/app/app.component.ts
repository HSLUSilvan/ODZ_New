import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';
import { MatMenuModule, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  selectedMenu: any;

  constructor(private router: Router,
              private titleService: Title, 
              private cdRef: ChangeDetectorRef, 
              private http: HttpClient,
              private translate: TranslateService) {
                // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('de');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
       translate.use('de');
  }
 
  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.titleService.setTitle(`ODZ - ${title}`);
        }
      });
  }

  OnLanguageChange(item : string) {
    this.translate.use(item);
  }
}
