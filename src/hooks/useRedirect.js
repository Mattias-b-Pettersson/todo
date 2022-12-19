import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export const useRedirect = (userAuthstatus) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post("/dj-rest-auth/token/refresh/");
                if (userAuthstatus === "loggedIn") {
                    navigate("/")
                }
            } catch (error) {
                //if user is not logged in, redirect to login page
                if (userAuthstatus === "loggedOut") {
                    navigate("/login")
                }
            }
        }
        handleMount();
    }, [userAuthstatus, navigate])
}
