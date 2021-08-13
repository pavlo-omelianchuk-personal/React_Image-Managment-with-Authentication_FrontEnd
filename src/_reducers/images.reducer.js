import { imageConstants } from "../_constants";

export function images(state = {}, action) {
  switch (action.type) {
    case imageConstants.REGISTER_IMG_REQUEST:
      return {};
    case imageConstants.REGISTER_IMG_SUCCESS:
      return {};
    case imageConstants.REGISTER_IMG_FAILURE:
      return {};
    case imageConstants.GETALL_IMG_REQUEST:
      return {
        loading: true,
      };
    case imageConstants.GETALL_IMG_SUCCESS:
      return {
        items: action.images,
      };
    case imageConstants.GETALL_IMG_FAILURE:
      return {
        error: action.error,
      };
    case imageConstants.DELETE_IMG_REQUEST:
      // add 'deleting:true' property to image being deleted
      return {
        ...state,
        items: state.items.map((image) =>
          image.id === action.id ? { ...image, deleting: true } : image
        ),
      };
    case imageConstants.DELETE_IMG_SUCCESS:
      // remove deleted image from state
      return {
        items: state.items.filter((image) => image.id !== action.id),
      };
    case imageConstants.DELETE_IMG_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to image
      return {
        ...state,
        items: state.items.map((image) => {
          if (image.id === action.id) {
            // make copy of image without 'deleting:true' property
            const { deleting, ...imageCopy } = image;
            // return copy of image with 'deleteError:[error]' property
            return { ...imageCopy, deleteError: action.error };
          }

          return image;
        }),
      };
    default:
      return state;
  }
}
