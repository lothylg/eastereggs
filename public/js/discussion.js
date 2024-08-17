let mode;

/* 
    The followuing variables are passed in as global variables from discussion.handlebars:
        currMovieId: string
        currDiscussionUser: number
    
        currentDiscussionId:number  (take from the url bar); this is a let so it can be changed    
        let currDiscussionText:string  (looked up in the controller); also a let 
    All of the movie info is also passed into the discussion.handlebars template from the controller
*/


const discussionsWrapper = document.querySelector("#discussion-wrapper")
const discussionsArea = document.querySelector("#discussions-area")
const dynamicArea = document.querySelector("#dynamic-area")

let allDiscussions = []
let currentDiscussionId = null

async function getAllDiscussions(){
    console.log(currMovieId)
    const resp = await fetch(`/api/discussions?movie=${currMovieId}`)
    const data = await resp.json() 
    console.log(data)
    if (data.status === "success"){
        allDiscussions = data.payload 
    }
}

async function getDiscussionById(id){
    const resp = await fetch(`/api/discussions/${id}`)
    const data = await resp.json() 
    if (data.status === "success") {
        currentDiscussion = data.payload 
    }
}


function quickBuilder(elem, content, attrs = {}){
    const newElem = document.createElement(elem)
    Object.keys(attrs).forEach( attr => newElem.setAttribute(attr, attrs[attr]) )
    if( content && content !== "--" ){
        newElem.textContent = content
    }
    return newElem
}

async function determineMode(){
    console.log(currentDiscussionId)
    // if no discussion id is already identified, we display all topics or ask the user to create one
    if( !currentDiscussionId ){
        await getAllDiscussions()
        console.log(allDiscussions)
        mode = (!allDiscussions.length ) ? 'no-discussions-created' : 'show-all-discussions'
    } else {
        await getDiscussionById(currentDiscussionId)
        mode = (currentDiscussion?.comments.length > 0 ) ? 'show-all-comments' : 'no-comments-created'
    }
    actOnMode()
}

function generateNewDiscussionForm(){
    const discussionFormArea = quickBuilder("div", '--', { class: 'discussion-form-area' })
    const discussionForm = quickBuilder("form", "--", { id: "new-discussion-form" })
    const textField = quickBuilder("input", "--", { type: "text", id: "discussion-input", name: 'topic', placeholder: "New topic name" })
    const firstComment = quickBuilder("textarea", "--", { id: "discussion-comment", name: 'comment', placeholder: "Your first comment" })
    const btn = quickBuilder("button", "Add A Discussion", { type: 'submit' })

    discussionForm.appendChild(textField)
    discussionForm.appendChild(firstComment)
    discussionForm.appendChild(btn)
    discussionFormArea.appendChild(discussionForm)
    return discussionFormArea
}

function handleFormSubmit(event){
    event.preventDefault() 
    console.log(event.target)
}

function clearDisplays(){
    dynamicArea.innerHTML = ""
    discussionsArea.innerHTML = ""
}

function generateNewCommentForm(){
    const commentFormArea = quickBuilder("div", '--', { class: 'comment-form-area' })
    const commentForm = quickBuilder("form", "--", { id: "new-comment-form" })
    const textField = quickBuilder("textarea", "--", { id: "comment-input", name: 'topic' })
    const btn = quickBuilder("button", "Add A Comment", { type: 'submit' })

    commentForm.appendChild(textField)
    commentForm.appendChild(btn)
    commentFormArea.appendChild(commentForm)
    return commentFormArea
}


function renderForNoDiscussionsCreated(){
    clearDisplays()
    const message = quickBuilder("p", "There are no topics yet created for this movie. Why not start now?", { id: "create-topic-text" })
    discussionsArea.appendChild(message)
    const discussionForm = generateNewDiscussionForm()
    discussionsArea.appendChild(discussionForm)
}

function renderForAllDiscussions(){
    clearDisplays()
    const message = quickBuilder("p", "Below you'll see any discussions already started for this movie. Click on one to join in, or create your own.")
    const discussionsContainer = quickBuilder("div", "--", { class: 'discussions-container' })
    allDiscussions.forEach( disc => {
        const discBlock = quickBuilder("div", disc.text, { class: 'discussion-block', id: `disc-${disc.id}` })
        discussionsContainer.appendChild(discBlock)
    })
    discussionsArea.appendChild(message)
    discussionsArea.appendChild(discussionsContainer)
    const discussionForm = generateNewDiscussionForm()
    discussionsArea.appendChild(discussionForm)
}

function renderForNoCommentsCreated(){
    clearDisplays()
    const title = quickBuilder("h3", currentDiscussion.text, { class: 'discussion-title' })
    const commentForm = generateNewCommentForm() 
    discussionsArea.appendChild(title)
    discussionsArea.innerHTML += commentForm
}

function renderForAllComments(){
    clearDisplays()
    const backToTopicsBtn = quickBuilder("button", "Back to Topics", { id: "back-to-topics-btn" })
    dynamicArea.appendChild(backToTopicsBtn)
    const existingForm = document.querySelector(".comment-form-area")
    if( existingForm ){
        discussionsWrapper.removeChild(existingForm)
    }
    const title = quickBuilder("h3", `Current Topic: ${currentDiscussion.text}`, { class: 'discussion-title' })
    const commentsContainer = quickBuilder("div", "--", { class: 'comments-container' })
    currentDiscussion.comments.forEach( comm => {
        const commBlock = quickBuilder("div", comm.text, { class: 'comment-block' })
        commentsContainer.appendChild(commBlock)
    })
    discussionsArea.appendChild(title)
    discussionsArea.appendChild(commentsContainer)
    const commentForm = generateNewCommentForm()
    discussionsWrapper.appendChild(commentForm)
}


function actOnMode(){
    console.log("mode is " + mode)
    switch(mode){
        case "no-discussions-created":
            renderForNoDiscussionsCreated()
            break; 

        case "show-all-discussions":
            renderForAllDiscussions()
            break;

        case "no-comments-created":
            renderForNoCommentsCreated()
            break;

        case "show-all-comments":
            renderForAllComments()
            break;
    }
}

discussionsWrapper.addEventListener("click", function(event){
    if( event.target.matches(".discussion-block") ){
        currentDiscussionId = event.target.getAttribute("id").split("-")[1] 
        determineMode()
    } else if( event.target.matches("#back-to-topics-btn") ){
        currentDiscussionId = null 
        determineMode()
    }
})

// Because we are creating the forms dynamically, we are adding an event listener on the parent element
discussionsWrapper.addEventListener("submit", async function(event){
    event.preventDefault() 
    const id = event.target.getAttribute("id") 
    console.log(id)
    if( id === "new-comment-form" ){
        const text = event.target.children[0].value
        const discussion_id = currentDiscussion.id
        try {
            const resp = await fetch("/api/comments", {
                method: "POST",
                body: JSON.stringify({ text, discussion_id }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await resp.json()
            determineMode()
        } catch(err){
            console.log(err)
        }
    } else if( id === "new-discussion-form" ){
        const topic = event.target.children[0].value
        const comment = event.target.children[1].value
        const movie_id = currMovieId 
        const obj = {
            text: topic,
            comment,
            movie_id,
            user_id: parseInt(currDiscussionUser)
        }
        try {
            const resp = await fetch("/api/discussions", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await resp.json()
            console.log(data)
            determineMode()
        } catch(err){
            console.log(err)
        }
    }
})


determineMode()

