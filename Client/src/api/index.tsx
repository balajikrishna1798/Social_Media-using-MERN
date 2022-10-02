import axios from 'axios'
const API = axios.create({baseURL:"http://localhost:5000/api"})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
export const fetchPosts = () => API.get("/posts")
export const getUsers = () => API.get("/users")

export const getFriends = (userId:any) => API.get(`/users/friends/${userId}`)
export const follow = (id,userId) => API.put(`/users/${id}/follow`,userId)
export const unfollow = (id,userId) => API.put(`/users/${id}/unfollow`,userId)

export const getConversation = (userId) => API.get(`/conversation/${userId}`)
export const getMessages = (conversationId) => API.get(`/message/${conversationId}`)

export const postMessages = (message) => API.post(`/message`,message)

export const fetchPost = (id:any) => API.get(`/posts/${id}`)
export const fetchPostsByUser = (userId:any) => API.get(`/posts/userPosts/${userId}`)
export const fetchPostsBySearch = (search:any) => API.get(`/posts/search?title=${search} `)
export const createPosts = (postData:any) => API.post("/posts",postData)  
export const usersProfile = (id:any) => API.get(`/users/usersProfile/${id}`)
export const fetchPostsByTag = (tag:any) => API.get(`/posts/tag/${tag}`)

export const makeComment = (postId:any,text:any) => API.patch(`/posts/${postId}/comments`,text)

export const getMyProfile = () =>API.get(`/users/profile`);

export const updatePosts = (id:any,postData:any) => API.patch(`/posts/${id}`,postData)


export const deletePosts = (id:any) => API.delete(`/posts/${id}`)
export const likePosts = (id:any) => API.patch(`/posts/${id}/likePost`)

export const updateProfile = (formData:any) => API.post("/users/profile",formData)

export const signIn = (formData:any) => API.post("/users/signin",formData)

export const payment = (details:any) => API.post("/users/payment",details)

export const signUp = (formData:any) => API.post("/users/signup",formData)
export const googleSignIn = (result:any) => API.post("/users/googleSignIn",result)
export const emailPasswordVerify = (formData:any) => API.post("/users/verifypasswordmail",formData)
export const changePassword = (formData:any) => API.post("/users/changePassword",formData)
export const searchUsers = (name:any) => API.post("/users/searchUsers",name)



