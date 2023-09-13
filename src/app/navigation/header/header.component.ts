import { Component,OnInit,EventEmitter,Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuthenticated: boolean= false;
  authSubscription: Subscription = {} as Subscription;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(status=>{
      this.isAuthenticated = status;
    })
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }
}
