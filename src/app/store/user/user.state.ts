import { State, Action, StateContext, Selector} from '@ngxs/store';
import { User} from '../../shared/models/user';
import { AddUser, RemoveUser} from './user.actions';

@State({
  name: "user",
  defaults: {
    uid: "";
    email: "";
    emailVerified: false;
    photoUrl: "";
    displayName: "";
  }
})
export class UserState{
  @Selector()
  static getUser(state: User) {
    return state;
  }

  //SE AÑADE NUEVO USER AL ESTADO
  @Action(AddUser)
  add({ getState, patchState }: StateContext<User>, { payload }: AddUser){
    const state = getState();
    patchState({
      user: [...state, payload]
    });
  }

  @Action(RemoveUser)
  remove({ getState, patchState }: StateContext<User>, { payload }: RemoveUser) {
    patchState({
      user: {
        uid: null,
        email: null,
        emailVerified: null,
        photoUrl: null,
        displayName: null
      }
    });
  }
}
}
