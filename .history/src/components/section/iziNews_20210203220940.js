import React, { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import moment from 'moment'
import axios from 'axios'


export default function iziNews() {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`http://newsapi.org/v2/everything?q=tesla&from=2021-01-03&sortBy=publishedAt&apiKey=f30c2a7545ba4eb5aeeb43326a1eb414`)
        return () => {
            cleanup
        }
    }, [data])

    return (
        <div>
            
        </div>
    )
}
