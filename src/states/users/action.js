/**
 * @TODO: Define all the actions (creator) for the users state
 */

import api from '../../utils/api';

export const ActionType = {
  RECEIVE_USER: 'RECEIVE_USER',
};

export function receiveUserActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USER,
    payload: {
      users,
    },
  };
}

export function asyncRegisterUser({ id, name, password }) {
  return async () => {
    try {
      await api.register({ id, name, password });
    } catch (error) {
      alert(error.message);
    }
  };
}
