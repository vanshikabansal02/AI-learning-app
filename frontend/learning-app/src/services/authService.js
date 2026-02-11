import axiosInstance from "../utils/axiosinstance";
import {API_PATHS} from '../utils/apiPaths.js';

const login=async(ElementInternals,password)=>{
    try{
        const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
            email,
            password,
        });
        return response.data;

    }catch(error){
        throw error.response?.data||{message:"an unknown error occured during login"};
    }
};

const register=async(username,email,pasword)=>{
    try{
        const response =await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
            username,
            email,
            password,
        });
        return response.data;
    }
    catch(error){
        throw error.response?.data||{message:"an unknown error occured while regitreing"};
    }
};

        const getProfile=async()=>{
            try{
                const response=await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                return response.data;

            }
            catch(error){
                throw error.response?.data||{message:"an unknown erroe occured during get profile"};
            }
        };

         const updateProfile=async(userData)=>{
            try{
                const response=await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE);
                return response.data;

            }
            catch(error){
                throw error.response?.data||{message:"an unknown erroe occured during updating profile"};
            }
        };

         const changePassword=async(passwords)=>{
            try{
                const response=await axiosInstance.post(API_PATHS.AUTH.CHANGE_PROFILE);
                return response.data;

            }
            catch(error){
                throw error.response?.data||{message:"an unknown erroe occured during chnging password"};
            }
        };
        const authService={
            login,
            register,
            getProfile,
            updateProfile,
            changePassword,

        };

        export default authService;
    
