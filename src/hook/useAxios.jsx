import axios from "axios";

const instance= axios.create({
    baseURL: 'https://local-food-network.vercel.app'
})

const useAxios = ()=>{
    
    return instance;

}
export default useAxios;