

const topics = [
    { 
        id: 1,
        name: "topic 1",
        comments: [
            {
                id: 1,
                replyTo: null,
                text: "It was awesome",
                author: {
                    id: 1,
                    fname: "Bob"
                }
            },
            {
                id: 2,
                replyTo: 1,
                text: "No it wasn't.",
                author: {
                    id: 2,
                    fname: "Mary"
                }
            }
        ]
    }
] 

// in handlebars:

<div id="topics-and-comments">
    <div id="topics-area">
        {{#each topics as |topic|}}
            <div class="topic" id={{topic.id}}>
                <p class="topic-name">{{ topic.name }}</p>
            </div>
        {{/each}}
    </div>

    <div id="comments-area"></div>
</div>


<style>
    div#comments-area {
        display: none;
    }
</style>

<script>
    const topicBlock = document.querySelector(".topic")
    const commentsArea = document.querySelector("#comments-area")

    let currentTopic = null;

    async function showComments(topicId){
        const resp = await fetch("/api/comments?topic=" + topicId)
        const comments = await resp.json()
        commentsArea.innerHTML = ""
        comments.forEach( comment => {
            const commentBlock = document.createElement("div")
            const authorTitle = document.createElement("p")
            authorTitle.textContent = comment.author.fname
            const commentItem = 

            commentBlock.appendChild(authorTitle)
            commentBlock.appendChild(commentItem)
            commentsArea.appendChild(commentBlock)
        })
        topicBlock.style.display = "none";
        topicBlock.style..display = "block";
    }


    topicBlock.addEventListener("click", function(event){
        currentTopic = event.target.getAttribute("id")
        showComments(currentTopic)
    })
</script>
