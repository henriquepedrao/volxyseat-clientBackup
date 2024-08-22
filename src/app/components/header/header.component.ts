import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { LogOutService } from '../../services/log-out.service';
import { SubscriptionService } from '../../services/subscription.service';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string | null = null;
  isAuthenticated: boolean = false;
  isMenuOpen = false;
  isWideScreen = window.innerWidth > 930;
  teste: string = '';

  constructor(
    private logOutService: LogOutService,
    private tranService: TransactionService,
    private subService: SubscriptionService,
    private router: Router
  ) {
    this.checkUserLogin();
    this.getSubscriptionId();
  }

  checkUserLogin() {
    const token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.isAuthenticated = !!token;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.logOutService.logout().subscribe(
      () => {
        localStorage.clear();
        this.username = null;
        this.isAuthenticated = false;
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Erro ao fazer logout:', error);
      }
    );
  }

  getTransaction(): Observable<any> {
    return this.tranService.getById(localStorage.getItem('transactionId'));
  }

  getSubscriptionId() {
    this.getTransaction()
      .pipe(
        switchMap((transaction: any) => {
          console.log(transaction.subscription);
          return this.getSubscriptionById(transaction.subscription);
        })
      )
      .subscribe(
        (result: any) => {
          this.teste = result.type;
          console.log(result);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getSubscriptionById(id: string): Observable<any> {
    return this.subService.getById(id);
  }
}
