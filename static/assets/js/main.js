const post_form = document.getElementById('post_add_form');
const msg = document.querySelector('.msg');
const all_posts = document.querySelector('.all-post');
const edit_post = document.getElementById('edit_post');
const comment_user = document.getElementById('comment-user');



form.addEventListener('post_add_form', async (event) => {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Get the URL and text inputs from the form
    const url = form.elements['pphoto'].value;
    const text = form.elements['text'].value;

    // Make a POST request to the Flask API to process the image
    const response = await fetch('/api/process-image', {
        method: 'POST',
        body: new FormData(form)
    });

    // Get the response as JSON
    const result_json = await response.json();

    const result = JSON.stringify(result_json);

});


post_form.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    const { pcontent, pphoto } = Object.fromEntries(form_data.entries());

    const id = Math.floor(Math.random() * 1000) + '_' + Date.now();
    const dataObj = { ...data, id }



    createLSData('ins_post', dataObj);
    e.target.reset();
    getAllPosts();


}


const getAllPosts = () => {
    let post = getLSData('ins_post');
    let list = '';



    if (!post) {
        all_posts.innerHTML = `<div class="card shadow-sm text-center mt-3"><div class="card-body">No post found</div></div>`;
        return false;
    }

    if (post) {

        var date = new Date();
        var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        post.reverse().map((item) => {
            list += `
                
            <div class="post">
            <div class="info">
                <div class="user">
                    <div class="profile-pic">
                        <img src="https://images.pexels.com/photos/15579683/pexels-photo-15579683.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="">
                    </div>
                    <p class="username">Diyy_a</p>
                </div>
                <!-- Edit Delete -->
                <div class="dropdown">
                    <a class="dropdown-toggle" href="#" data-bs-toggle="dropdown">
                        <i class="fas fa-ellipsis-h"></i>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li><a data-bs-toggle="modal" editLsData="${item.id}" data-bs-target="#edit-modal" class="dropdown-item post_edit" href="#">Edit</a></li>
                      <li><a class="dropdown-item post_delete" deleteLsData="${item.id}" href="#">Delete</a></li>
                    </ul>
                  </div>
            </div>
            <img src="${item.pphoto}" class="post-image" alt="">
            <div class="post-content">
                <div class="reaction-wrapper">
                    <img src="/static/assets/img/like.PNG" class="icon" alt="">
                    <img src="/static/assets/img/comment.PNG" class="icon" alt="">
                    <img src="/static/assets/img/send.PNG" class="icon" alt="">
                    <img src="/static/assets/img/save.PNG" class="save icon" alt="">
                </div>
                <p class="likes">89 likes</p>
                <p class="description"><span>${current_date}</span>${item.pcontent}</p>
                <p class="post-time">${item.pdate}</p>
            </div>
            <div class="comment-wrapper">
                <img src="/static/assets/img/smile.PNG" class="icon" alt="">
                <input type="text" class="comment-box" placeholder="Add a comment">
                <button class="comment-btn">Post</button>
            </div>
        </div>
        
                `;
        });

    }
    all_posts.innerHTML = list;

}
getAllPosts();

// classList.contains

// Post Edit 

all_posts.onclick = (e) => {
    // console.log(e.target.hasAttribute('editlsdata'));

    if (e.target.hasAttribute('editlsdata')) {
        const id = e.target.getAttribute('editLsData');
        const data = getLSData('ins_post');
        // const { aname, aphoto, pcontent, pdate, pphoto } = data[index];
        const singleData = data.find(item => item.id == id);


        edit_post.innerHTML = `
        <div class="my-3">
                        <div class="my-3">
                            <label for="">Post Content</label>
                            <textarea name="pcontent" class="form-control" placeholder="Write a caption...">${singleData.pcontent}</textarea>
                        </div>
                        <div class="my-3">
                            <label for="">Post Photo</label>
                            <input name="pphoto" type="text" value="${singleData.pphoto}" class="form-control">
                        </div>
                        <div class="my-3">
                            <!-- <button type="button" class="btn btn-primary w-100">Create Post</button> -->
                            <input type="submit" class="btn btn-primary w-100" value="Update Post">
                        </div>
        
        `;
        console.log(id);

    }

    if (e.target.hasAttribute('deleteLsData')) {
        const id = e.target.getAttribute('deleteLsData');

        if (confirm('Are Your Sure? You want to delete this post?') == true) {
            const ddelete = getLSData('ins_post');
            const index = ddelete.findIndex(item => item.id == id);
            console.log(ddelete)

            ddelete.splice(index, 1);
            updateLSData('ins_post', ddelete);
            getAllPosts();


        }
    }
}


edit_post.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const { aname, aphoto, pcontent, pdate, pphoto, id } = Object.fromEntries(form_data.entries());
    const post = getLSData('ins_post');
    const index = post.findIndex(item => item.id == id);
    post[index] = { aname, aphoto, pcontent, pdate, id, pphoto };


    updateLSData('ins_post', post);
    getAllPosts();

}
