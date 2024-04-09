import React from "react";

interface mainProps {
    whatToShow: string;
    loggedIn: [boolean, string];
}

const Main: React.FC<mainProps> = ({whatToShow, loggedIn}) => {
    const [post, setPost] = React.useState("");

    async function handleSubmit() {

    }

    if(whatToShow === "makePost" && loggedIn[0]){
        return (
            <form id="make-post-form" onSubmit={handleSubmit}>
                <h4>Let your friends know what is happening in your life</h4>
                <textarea id="make-post-text" placeholder="Write here" value={post} onChange={(event) => setPost(event.target.value)}></textarea>
                <button type="submit">Post!</button>
            </form>
        )
    }
        else{
        return (
            <>
        </>
    )
}
}

export default Main;