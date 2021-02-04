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
                        padding: "1%"
                    }}>
                        <img src={news.urlToImage} alt="illustration" />
                        <div>
                            <h2>{news.title}</h2>
                            <h3>{news.description}</h3>
                        </div>
                        
                    </div>
                ))}
            </div>
            </PerfectScrollbar>
        </div>
    )
}
