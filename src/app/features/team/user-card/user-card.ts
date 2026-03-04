import { Component, input } from '@angular/core';
import { User } from '../../../shared/models/user.interface';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  user = input.required<User>();
}
