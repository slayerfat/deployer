import { StateService } from './shared/services/misc/state.service';
import { AuthGuardService } from './shared/services/misc/auth-guard.service';
import { LoggedInGuardService } from './shared/services/misc/logged-in-guard.service';

export const APP_PROVIDERS = [
  StateService,
  AuthGuardService,
  LoggedInGuardService
];
