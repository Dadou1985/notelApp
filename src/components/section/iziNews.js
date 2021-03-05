import React, { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import moment from 'moment'
import axios from 'axios'
import News from '../../../csvjson.json'


export default function IziNews() {

    const [data, setData] = useState([])

    useEffect(() => {
        
        axios.get(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQKWHGRk7L2-B27ZPHpA13ntNuPQGjIJOoh9Krm_8YxqYDPPZ1-2055uMp2M9T-3A5mMn5JxqV3ekM6/pubhtml`)
        .then(res => {
            console.log(res);
            setData(res.data)
        })
        return () => {}
    }, [])

    console.log(data)

    return (
        <div className="iziNews-container">
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
                        <img src={news.url} style={{width: "100%", marginBottom: "2%", borderRadius: "5px"}} alt="illustration" />
                        <div>
                            <h4>{news.name}</h4>
                            <h6>{news.description}</h6>
                            <a href={news.link} target="_blank">Voir la video</a>
                        </div>
                        
                    </div>
                ))}
            </div>
            </PerfectScrollbar>
        </div>
    )
}