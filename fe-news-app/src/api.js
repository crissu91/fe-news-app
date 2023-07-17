import axios from "axios"

const ncNewsApi =  axios.create({
    baseURL: `https://northcoders-news-y3ly.onrender.com/api`
})

export const getAllArticles = () => {
    return ncNewsApi.get('/articles').then((res)=>{
        return res.data.articles
    })
}

