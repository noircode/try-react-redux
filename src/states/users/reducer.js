/**
 * @TODO: Define reducer for the users state
 */

import { ActionType } from './action';

export default function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_USER:
      return action.payload.users;
    default:
      return users;
  }
}
