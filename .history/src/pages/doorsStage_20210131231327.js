import React from 'react'
import Layout from "../components/layout"
import Dilema from '../components/section/dilema'


export default function DoorsStage() {
    return (
        <div>
            <Layout>
                <div style={{
                    position: "absolute",
                    top: "0px"
                }}>
                    <Dilema />
                </div>
            </Layout>
        </div>
    )
}
