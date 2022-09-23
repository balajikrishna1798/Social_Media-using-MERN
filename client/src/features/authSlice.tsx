import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from '../api'
const initialState= {
    user:null,
    error:"",
    loading:false
}
    export const login:any = createAsyncThunk("auth/login",async(data:any,{rejectWithValue})=>{
        const {formData,navigate,toast}=data
    try {
        const response = await api.signIn(formData)
        toast.success("Login SuccessFully")
        navigate("/posts")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const changePassword:any = createAsyncThunk("auth/changePassword",async(data:any,{rejectWithValue})=>{
    const {formData,navigate,toast}=data
try {
    const response = await api.changePassword(formData)
    navigate("/auth")
    return response.data
} catch (error) {
    return rejectWithValue(error.response.data)
}
}) 

export const forgotPassword:any = createAsyncThunk("auth/forgotPassword",async(data:any,{rejectWithValue})=>{
    const {formData,navigate,toast}=data
try {
    const response = await api.emailPasswordVerify(formData)
    navigate("/ChangePassword")
    return response.data
} catch (error) {
    return rejectWithValue(error.response.data)
}
}) 

export const registerr:any = createAsyncThunk("auth/registerr",async(data:any,{rejectWithValue})=>{
    const {formData,navigate,toast}=data
    try {
        const response = await api.signUp(formData)
        navigate("/")
        return response.data
    } catch (error) {
        
        return rejectWithValue(error.response.data)
    }
})

export const updateUser:any = createAsyncThunk("auth/updateUser",async(formData,{rejectWithValue})=>{
    try {
        const response = await api.updateProfile(formData)
        console.log(response.data);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const usersProfile:any = createAsyncThunk("auth/usersProfile",async(id,{rejectWithValue})=>{
    try {
        const response = await api.usersProfile(id)
        console.log(response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const getMyProfile:any = createAsyncThunk("auth/getMyProfile",async(_)=>{
    try {
        const response = await api.getMyProfile()
        return response.data
    } catch (error) {
        
    }
})

export const googleusersProfile:any = createAsyncThunk("auth/googleusersProfile",async(googleid,{rejectWithValue})=>{
    try {
        const response = await api.googleusersProfile(googleid)
        return response.data
    } catch (error) {
        
    }
})

export const googleSignIn:any = createAsyncThunk("auth/googleSignIn",async(data:any,{rejectWithValue})=>{
         const {result,navigate}=data
    try {
        const response = await api.googleSignIn(result)

        navigate("/")
        return response.data
    } catch (error) {
        navigate("/auth")
        return rejectWithValue(error.response.data)
        
    }
})



const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        Logout: (state, action) => {
            localStorage.clear();
            state.user = null;
          },
        setUser:(state,action)=>{
            state.user = action.payload
        }
 
    },
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
             state.loading = true;
        });
        builder.addCase(login.fulfilled,(state,action)=>{
            state.loading = false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
             state.user = action.payload;
        });
        builder.addCase(login.rejected,(state,action)=>{
            state.loading = false
            state.error= action.payload.message
            toast.error(state.error);
        });
        builder.addCase(forgotPassword.pending,(state)=>{
            state.loading = true;
       });
       builder.addCase(forgotPassword.fulfilled,(state,action)=>{
           state.loading = false
           
       });
       builder.addCase(forgotPassword.rejected,(state,action)=>{
           state.loading = false
           state.error= action.payload.message
           toast.error(state.error);
       });
        builder.addCase(changePassword.pending,(state)=>{
            state.loading = true;
       });
       builder.addCase(changePassword.fulfilled,(state,action)=>{
           state.loading = false
       });
       builder.addCase(changePassword.rejected,(state,action)=>{
           state.loading = false
           state.error= action.payload.message
           toast.error(state.error);
       });


        builder.addCase(usersProfile.pending,(state)=>{
            state.loading = true
       });
       builder.addCase(usersProfile.fulfilled,(state,action)=>{
           state.loading = false
            state.user = action.payload
       });
       builder.addCase(usersProfile.rejected,(state,action)=>{
           state.loading = false
           toast.error(state.error);
       });
       builder.addCase(getMyProfile.pending,(state)=>{
        state.loading = true
   });
   builder.addCase(getMyProfile.fulfilled,(state,action)=>{
       state.loading = false
       localStorage.setItem("profile",JSON.stringify({...action.payload}))
        state.user = action.payload
   });
   builder.addCase(getMyProfile.rejected,(state,action)=>{
       state.loading = false
   });
       builder.addCase(googleusersProfile.pending,(state)=>{
        state.loading = true
   });
   builder.addCase(googleusersProfile.fulfilled,(state,action)=>{
       state.loading = false
        state.user = action.payload
   });
   builder.addCase(googleusersProfile.rejected,(state,action)=>{
       state.loading = false
   });

   builder.addCase(registerr.pending,(state)=>{
        state.loading = true
    });
    builder.addCase(registerr.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload
    });
    builder.addCase(registerr.rejected,(state,action)=>{
        state.loading = false
        state.error= action.payload.message
        toast.error(state.error);

    });
    builder.addCase(updateUser.pending,(state)=>{
        state.loading = true
    });
    builder.addCase(updateUser.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload
    });
    builder.addCase(updateUser.rejected,(state,action)=>{
        state.loading = false
        state.error= action.payload.message
        toast.error("Only .jpg, .jpeg, .png formats are allowed");

    });
    builder.addCase(googleSignIn.pending,(state)=>{
        state.loading = true
    });
    builder.addCase(googleSignIn.fulfilled,(state,action)=>{
        state.loading = false
        localStorage.setItem("profile",JSON.stringify({...action.payload}));
        state.user = action.payload
    });
    builder.addCase(googleSignIn.rejected,(state,action)=>{
        state.loading = false
        state.error= action.payload.message
        
        toast.error(state.error)
    })
    }
})

export const { Logout,setUser } = authSlice.actions;

export default authSlice.reducer