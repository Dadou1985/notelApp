import React, { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import moment from 'moment'
import axios from 'axios'


export default function iziNews() {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get()
        return () => {
            cleanup
        }
    }, [data])

    return (
        <div>
            
        </div>
    )
}
