// Creating New Post 
window.createPost = () => {
    let postTitle = document.querySelector('#postTitle').value;
    let postText = document.querySelector('#postText').value;

    axios.post('/api/v1/post', {
        title: postTitle,
        text: postText
    })
        .then(function (Response) {
            console.log(Response);
            document.querySelector('#result').innerHTML = `${Response.data}`;
            getAllPost();
        })
        .catch(function (error) {
            console.log(error)
            document.querySelector('#result').innerHTML = 'Error While Creating the post';
        })
}
// Pre Printed Post when page loads
window.getAllPost = () => {
    axios.get('/api/v1/posts')

        .then(function (Response) {

            let postToPrint = ``
            Response.data.map((eachPost) => {
                postToPrint += `
                    <div id="postId-${eachPost._id}" class = "postCard">
                        <h3>${eachPost.title}</h3>
                        <p>${new Date(eachPost.createdOn)}</p>
                        <p>${eachPost.text}</p>
                        <button class="deleteBtn" onclick="delPost('${eachPost._id}')">Delete</button>
                        <button class="editBtn" onclick="editPost('${eachPost._id}','${eachPost.title}','${eachPost.text}')">Edit</button>
                    </div>
                    <br />`
            })
            document.querySelector('#posts').innerHTML = postToPrint;
        })
        .catch(function (error) {
            console.log(error)
        })
}

// Edit Post 
window.editPost = (postId, title, text) => {
    console.log(title);
    console.log(text);
    document.querySelector(`#postId-${postId}`).innerHTML =
        `
    <form onsubmit= savePost('${postId}') id="editPostFrom">
       <input type= "text" value = '${title}' id='titleToEdit-${postId}' />
       <input type= "text" value ='${text}' id='textToEdit-${postId}'/>
       <button id="saveBtn">Save<button>
    </form>
    `
}
// Save after edit 
window.savePost = (postId) => {
    let updatedTitle = document.querySelector(`#titleToEdit-${postId}`).value;
    let updatedText = document.querySelector(`#textToEdit-${postId}`).value;

    axios.put(`/api/v1/post/${postId}`, {
        title: updatedTitle,
        text: updatedText
    })
        .then(function (Response) {
            console.log(Response);
            // console.log(`${postId}`);


        })
        .catch(function (error) {
            console.log(error)
            document.querySelector('#result').innerHTML = 'Error While Updating the post';
        })
}

// Delete Post 
window.delPost = (postId) => {
    console.log(postId);

    axios.delete(`/api/v1/post/${postId}`)
        .then(function (Response) {
            console.log(Response.data)
            getAllPost();
        })
        .catch(function (error) {
            console.log(error)
        })
}

