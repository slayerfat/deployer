import { UserInterface } from '../../interfaces/models/UserInterface';

export interface UserStateInterface {
  isLoggedIn: boolean;
  user?: UserInterface;
}
