import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() closeSidenav= new EventEmitter<void>();
  isAuthenticated: boolean= false;
  authSubscription: Subscription = {} as Subscription;

  constructor(private authService: AuthService){
    
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(status=>{
      this.isAuthenticated = status;
    })
  }

  onLogout(){
    this.authService.logout();
    this.onClose();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onClose(){
    this.closeSidenav.emit();
  }
}
