import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { showLoading, hideLoading } from "../Redux/Features/AlertSlice"
import { setUser } from '../Redux/Features/userSlice'


export default function ProtectedRoutes({ children }) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)


    //get user 
    //eslint-disable-next-line
    const getUser = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/getUserData',
                { token: localStorage.getItem("Token") },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`
                    }
                })
            dispatch(hideLoading())
            if (res.data.success) {
                dispatch(setUser(res.data.data))
            } else {
                <Navigate to="/login" />
                localStorage.clear()
            }
        } catch (error) {
            dispatch(hideLoading())
            localStorage.clear()
            console.log(error)
        }
    };
    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [user, getUser])






    if (localStorage.getItem("Token")) {
        return children
    } else {
        return <Navigate to="/login" />
    }
}

