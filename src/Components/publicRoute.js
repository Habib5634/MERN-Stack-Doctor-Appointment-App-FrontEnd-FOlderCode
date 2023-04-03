import React from 'react'
import { Navigate } from 'react-router-dom'

export default function publicRoute({ children }) {
    if (localStorage.getItem("Token")) {
        return <Navigate to="/" />
    } else {
        return children
    }
}
