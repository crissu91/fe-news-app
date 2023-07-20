import { useEffect, useState } from "react";
import { getAllTopics } from "../api";
import Error from "./Error";
import { Link } from "react-router-dom";

function AllTopics() {
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState(null)

    useEffect(()=>{
        getAllTopics()
        .then((data)=>{
            setTopics(data)
            setIsLoading(false)
        })
        .catch((err) =>{
            setApiError(err)
        })
    },[topics])
    
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (apiError) {
        return (
            <Error 
                errorStatus={apiError.response?.status || '503'}
                errorMessage={apiError.response?.data?.msg || 'Please try again'}
            />
        )
    }
    return (
        <main className="topics">
            <p>Click on a topic to explore articles</p>
            {topics.map((topic)=>{
                return (
                    <section className="topic-section" key={topic.slug} >
                        <Link to={`/api/articles?topic=${topic.slug}`}>
                            <h2 className="topic-title">{topic.slug}</h2>
                        </Link>
                        <p className="topic-description">{topic.description}</p>
                    </section>
                )
            })}
        </main>
    )
}

export default AllTopics;