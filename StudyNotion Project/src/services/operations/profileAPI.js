import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../slices/profileSlice";
import { setUser } from "../../slices/profileSlice";


const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints;


export function updateProfilePic(token,formData) {
    // console.log(token);
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
          const response = await apiConnector(
            "PUT",
            UPDATE_DISPLAY_PICTURE_API,
            formData,
            {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            }
          )
          console.log(
            "UPDATE_DISPLAY_PICTURE_API RESPONSE............",
            response
          )
    
          if (!response.data.success) {
            throw new Error(response.data.message)
          }
          toast.success("Display Picture Updated Successfully")
          dispatch(setUser(response.data.data))
        } catch (error) {
          console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
          toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId)
      }
}




