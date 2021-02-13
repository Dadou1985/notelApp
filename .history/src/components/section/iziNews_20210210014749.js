import React, { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import moment from 'moment'
import axios from 'axios'
import News from '../../../csvjson.json'


export default function IziNews() {

    const [data, setData] = useState([])

    useEffect(() => {
        
        axios.get(`http://newsapi.org/v2/everything?q=hôtellerie&from=2021-00-03&sortBy=publishedAt&apiKey=f30c2a7545ba4eb5aeeb43326a1eb414`)
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
            <div id="box" className="news_notebox">
                {News.map((news, key) => (
                    <div style={{
                        display: "flex",
                        flexFlow: "column",
                        padding: "5%",
                        backgroundColor: "rgb(33, 35, 39)",
                        borderRadius: "5px",
                        marginBottom: "2vh",
                        
                    }}>
                        <img src={news.link} style={{width: "100%", marginBottom: "2%", borderRadius: "5px"}} alt="illustration" />
                        <div>
                            <h4>{news.name}</h4>
                            <h6>{news.description}</h6>
                            <a href={news.link}>Lire l'article</a>
                        </div>
                        
                    </div>
                ))}
            </div>
            </PerfectScrollbar>
        </div>
    )
}
