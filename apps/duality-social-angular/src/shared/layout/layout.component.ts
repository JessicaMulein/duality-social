import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { filter, Subject, takeUntil, timer } from 'rxjs';
import { Subscription } from 'rxjs';
// import { AuthGuard } from '../../core/guards/auth.guard';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  private _mobileQueryListener: () => void;
  public mobileQuery: MediaQueryList;
  public showSpinner = false;
  public username = 'Log In';
  public isAdmin = false;
  public userLoggedInDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  public newPostVisible = false;

  private autoLogoutSubscription: Subscription = new Subscription();

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public spinnerService: SpinnerService,
    public router: Router
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public showNewPost() {
    this.newPostVisible = true;
    this.router.navigate(['feed'], {
      queryParams: { newPost: true },
    });
  }

  public hideNewPost() {
    this.newPostVisible = false;
  }

  ngOnInit(): void {
    this.isAdmin = false;
      this.userLoggedInDisplay = false;
      this.username = '';


  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.autoLogoutSubscription.unsubscribe();
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
