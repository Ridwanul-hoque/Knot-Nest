import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://knot-nest-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;