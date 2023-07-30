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
            console.log(err);
            setApiError(true)
            setIsLoading(false)
        })
    },[])
    
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (apiError) {
        return (
            <Error 
                errorStatus={apiError.response?.status}
                errorMessage={apiError.response?.data?.msg || 'Oops! Something went wrong. Please try again'}
            />
        )
    }
    return (
        <main className="topics">
            <h3>Click on a topic to explore articles:</h3>
            {topics.map((topic)=>{
                return (
                    <section className="topic-section" key={topic.slug} >
                        <Link to={`/api/topics/${topic.slug}`}>
                            <h4 className="topic-title">{topic.slug}</h4>
                        </Link>
                    </section>
                )
            })}
        </main>
    )
}

export default AllTopics;