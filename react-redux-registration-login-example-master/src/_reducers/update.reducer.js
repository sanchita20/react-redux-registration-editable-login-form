import { userConstants } from '../_constants';

export function updation(state = {}, action) {
    switch (action.type) {
        case userConstants.UPDATE_REQUEST:
            return { updating: true };
        case userConstants.UPDATE_SUCCESS:
            return {
                items: action
            };
        case userConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}