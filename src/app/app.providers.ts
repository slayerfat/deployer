import { StateService } from './shared/services/misc/state.service';
import { AuthGuardService } from './shared/services/misc/auth-guard.service';
import { LoggedInGuardService } from './shared/services/misc/logged-in-guard.service';
import { AppRoutesService } from './shared/services/misc/app-routes.service';
import { UserAuthService } from './shared/services/user/user-auth.service';
import { AppStringsService } from './shared/services/misc/app-strings.service';

export const APP_PROVIDERS = [
  StateService,
  AuthGuardService,
  LoggedInGuardService,
  AppRoutesService,
  UserAuthService,
  AppStringsService
];
