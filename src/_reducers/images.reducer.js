import { imageConstants } from "../_constants";

export function images(state = {}, action) {
  switch (action.type) {
    case imageConstants.REGISTERIMG_REQUEST:
      return {};
    case imageConstants.REGISTERIMG_SUCCESS:
      return {};
    case imageConstants.REGISTERIMG_FAILURE:
      return {};
    case imageConstants.GETALLIMG_REQUEST:
      return {
        loading: true,
      };
    case imageConstants.GETALLIMG_SUCCESS:
      return {
        items: action.images,
      };
    case imageConstants.GETALLIMG_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
