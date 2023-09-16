import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import Timeago from "./Timeago";
import ReactionButtons from "./ReactionButtons";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";


const PostsList = () => {

    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
      postsStatus === 'idle' && dispatch(fetchPosts());
    }, [postsStatus, dispatch]);

    // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    // const renderedPosts = orderedPosts.map(post => (
    //     <article key={post.id}>
    //         <h3>{post.title}</h3>
    //         <p>{post.content.substring(0,100)}</p>
    //         <p className="postCredit">
    //           <PostAuthor userId={post.userId} />
    //           <Timeago timestamp={post.date} />
    //         </p>
    //         <ReactionButtons post={post} />
    //     </article>
    // ));

    let content;
    if (postsStatus === 'loading') {
      content = <p>Loading...</p>
    } else if (postsStatus === 'succeeded') {
      const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
      content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
    } else if (postsStatus === 'failed') {
      content = <p>{error}</p>
    }

  return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>
  )
}

export default PostsList
