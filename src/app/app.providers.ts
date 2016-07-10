import { StateService } from './shared/services/misc/state.service';
import { AuthGuardService } from './shared/services/misc/auth-guard.service';

export const APP_PROVIDERS = [
  StateService,
  AuthGuardService
];
