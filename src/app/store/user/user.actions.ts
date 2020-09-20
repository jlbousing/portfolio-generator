import { User} from '../../shared/models/user';

export class AddUser {
  static readonly type = "[User] AddUser";
  constructor(public payload: User) {
  }
}

export class Reset {
  static readonly type = "[User] Reset";
  constructor() {
  }
}

export class GetUser {
  static readonly type = "[User] Get User";
  constructor() {
  }
}
