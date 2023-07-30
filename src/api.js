import axios from "axios"

const ncNewsApi =  axios.create({
    baseURL: `https://northcoders-news-y3ly.onrender.com/api`
})

export const getAllArticles = (query) => {
    return ncNewsApi
    .get('/articles', {params: query})
    .then((res)=>{
        return res.data.articles
    })
}

export const getArticlesQueries = (paramQueries)=>{
    return ncNewsApi
    .get('/articles', {params: paramQueries})
    .then((res)=>{
        return res.data.articles
    })
}

export const getArticleById = (article_id) => {
    return ncNewsApi
    .get(`/articles/${article_id}`)
    .then((res)=>{
        return res.data.articles
    })
}

export const getCommentsByArticleId = (article_id) => {
    return ncNewsApi
    .get(`/articles/${article_id}/comments`)
    .then((res)=>{
        return res.data.comments
    })
    .catch((error) =>{
        console.error(error)
    })
}

export const patchArticleById = (article_id, inc_votes) => {
    const articlePatchBody = {
        article_id,
        inc_votes
    }
    return ncNewsApi
    .patch(`/articles/${article_id}`, articlePatchBody)
    .then((res)=>{
        return res
    })
}

export const postCommentByArticleId = (article_id, newComment, username) => {
    const postRequestBody = {
        username,
        body: newComment
    }
    return ncNewsApi
    .post(`/articles/${article_id}/comments`, postRequestBody)
    .then((res)=>{
        return res.data.comment[0]
    })
}

export const getAllTopics = () => {
    return ncNewsApi
    .get('/topics')
    .then((res)=>{
        return res.data.topics
    })
}

export const deleteCommentById = (comment_id) => {
        return ncNewsApi
        .delete(`/comments/${comment_id}`)
}

export const getUsers = () => {
	return ncNewsApi
    .get('/users')
    .then((res) => {
		return res.data.users
	})
}

export const getUserByUsername = (username) => {
	return ncNewsApi.get(`/users/${username}`).then((res) => {
		return res.data.user
	})
}
export const postUser = (user) => {
	const postBody = {
		username: user.username,
		name: user.name,
		avatar_url: user.avatar_url,
	}
	return ncNewsApi.post('/users', postBody).then((res) => {
		return res.data.user[0]
	})
}