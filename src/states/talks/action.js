/**
 * @TODO: Define all the actions (creator) for the talks state
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  RECEIVE_TALKS: 'RECEIVE_TALKS',
  ADD_TALK: 'ADD_TALK',
  TOGGLE_TALK_LIKE: 'TOGGLE_TALK_LIKE',
};

export function receiveTalksActionCreator(talks) {
  return {
    type: ActionType.RECEIVE_TALKS,
    payload: {
      talks,
    },
  };
}

export function addTalkActionCreator(talk) {
  return {
    type: ActionType.ADD_TALK,
    payload: {
      talk,
    },
  };
}

export function toggleTalkLikeActionCreator({ talkId, userId }) {
  return {
    type: ActionType.TOGGLE_TALK_LIKE,
    payload: {
      talkId,
      userId,
    },
  };
}

export function asyncAddTalk({ text, replyTo = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const talk = await api.createTalk({ text, replyTo });
      dispatch(addTalkActionCreator(talk));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncToggleLikeTalk(talkId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleTalkLikeActionCreator({ talkId, userId: authUser.id }));

    try {
      await api.toggleLikeTalk(talkId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleTalkLikeActionCreator({ talkId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}
