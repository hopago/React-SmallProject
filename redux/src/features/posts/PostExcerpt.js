import PostAuthor from "./PostAuthor";
import Timeago from "./Timeago";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";


const PostExcerpt = ({ post }) => {
  return (
      <article>
          <h2>{post.title}</h2>
          <p>{post.body.substring(0, 75)}...</p>
          <p className="postCredit">
            <Link to={`post/${post.id}`}>View Post</Link>
              <PostAuthor userId={post.userId} />
              <Timeago timestamp={post.date} />
          </p>
          <ReactionButtons post={post} />
      </article>
  )
}

export default PostExcerpt
