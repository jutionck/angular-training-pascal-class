import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { AlertMessage } from 'src/app/shared/models/alert-message';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  loading: boolean = false;
  subcriber: Observer<any>;
  message: AlertMessage;

  constructor(
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.userService.isListUpdated()
      .subscribe((updated: boolean) => {
        if (updated) {
          this.loadData()
        }
      })
  }

  loadData(): void {
    this.subcriber = {
      next: (users) => this.users = users,
      error: console.error,
      complete: () => this.loading = false
    }

    this.loading = true;
    this.userService.getAll()
      .pipe(delay(1000))
      .subscribe(this.subcriber)
  }

  onDeleteUser(id: string): void {
    this.subcriber = {
      next: (user) => {
        console.log(user);
        this.message = {
          status: 'success',
          text: `User berhasil dihapus`
        }
        this.users = user;
      },
      error: console.error,
      complete: () => this.loading = false
    }
    this.loading = true;
    this.userService.delete(id)
      .pipe(delay(1000), switchMap(() => this.userService.getAll()))
      .subscribe(this.subcriber)
  }
}
