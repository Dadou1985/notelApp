import React, { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import moment from 'moment'
import axios from 'axios'


export default function IziNews() {

    const [data, setData] = useState([])

    useEffect(() => {
        
        axios.get(`http://newsapi.org/v2/everything?q=hôtel&from=2021-01-03&sortBy=publishedAt&apiKey=f30c2a7545ba4eb5aeeb43326a1eb414`)
        .then(res => {
            console.log(res);
            setData(res.data.articles)
        })
        return () => {}
    }, [])

    console.log(data)

    return (
        <div style={{width: "90%"}}>
            <PerfectScrollbar>
            <div id="box" className="karenStories_notebox">
                {data.map((news, key) => (
                    <div style={{
                        display: "flex",
                        flexFlow: "column",
                        padding: "5%",
                        backgroundColor: "rgb(33, 35, 39)",
                        borderRadius: "5px"
                    }}>
                        <img src={news.urlToImage} style={{width: "100%"}} alt="illustration" />
                        <div>
                            <h>{news.title}</h3>
                            <h5>{news.description}</h5>
                        </div>
                        
                    </div>
                ))}
            </div>
            </PerfectScrollbar>
        </div>
    )
}
