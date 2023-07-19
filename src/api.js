import axios from "axios"

const ncNewsApi =  axios.create({
    baseURL: `https://northcoders-news-y3ly.onrender.com/api`
})

export const getAllArticles = () => {
    return ncNewsApi.get('/articles').then((res)=>{
        return res.data.articles
    })
}

export const getArticleById = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}`).then((res)=>{
        return res.data.articles
    })
}

export const getCommentsByArticleId = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}/comments`).then((res)=>{
        return res.data.comments
    })
}

export const postCommentByArticleId = (article_id, newComment) => {
    const postRequestBody = {
        username: 'tickle122',
        body: newComment
    }
    return ncNewsApi.post(`/articles/${article_id}/comments`, postRequestBody).then((res)=>{
        console.log('da',res)
        return res.data.comment[0]
    })
}