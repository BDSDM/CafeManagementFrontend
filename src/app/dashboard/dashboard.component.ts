import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  username: string = '';
  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    this.username = this.userService.getStoredUserName();
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
