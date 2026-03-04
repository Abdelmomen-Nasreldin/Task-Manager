import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user/user-service';
import { UserCard } from "../user-card/user-card";

@Component({
  selector: 'app-team-page',
  imports: [UserCard],
  templateUrl: './team-page.html',
  styleUrl: './team-page.scss',
})
export class TeamPage {
  private readonly userService = inject(UserService);
  users = this.userService.users;
}
