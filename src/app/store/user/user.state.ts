import { State, Store, StateContext, Action, Selector} from '@ngxs/store';
import { AddUser, Reset, GetUser} from './user.actions';
import { User} from '../../shared/models/user';
import {patch} from '@ngxs/store/operators';
import {Injectable} from '@angular/core';

export interface UserStateModel{
  user: User
}

@State({
  name: "user",
  defaults: {
    user: null
  }
})

@Injectable()
export class UserState{
  // Inyectamos la store global en nuestro estado.
  constructor(private store: Store) {
  }


  @Action(GetUser)
  GetUser(stateContext: StateContext<any>){
      console.log(stateContext.getState().user);
  }

  @Action(AddUser)
  AddUser(stateContext: StateContext<any>, payload: User){

    stateContext.patchState({
      user: payload
    });

  }


  @Action(Reset)
  Reset(stateContext: StateContext<any>){

    stateContext.patchState({
      user: null
    });
  }
}
