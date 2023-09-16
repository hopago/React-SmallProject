import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/userSlice";
import { useNavigate } from "react-router-dom";


const AddPostForm = () => {
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [userId,setUserId] = useState('');
    const [addRequestStatus,setRequestStatus] = useState('idle');

    const users = useSelector(selectAllUsers);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

    

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = (e) => {
        e.preventDefault();

        if(canSave) {
          try {
            setRequestStatus('pending');
            dispatch(addNewPost({ title, body: content, userId })).unwrap();
            navigate('/');
          } catch (err) {
            console.log("Failed to save post", err)
          } finally {
            setRequestStatus('idle');
            setTitle('');
            setContent('');
            setUserId('');
          }
        }
    };

    const usersOptions = users.map(user => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

  return (
    <section>
        <form>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              name="postTitle"
              value={title}
              onChange={onTitleChanged}
            />
            <label htmlFor="postAuthor">Author:</label>
            <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
              <option value=""></option>
              {usersOptions}
            </select>
            <label htmlFor="postContent">Content:</label>
            <textarea 
              name="postContent" 
              id="postContent"
              value={content}
              onChange={onContentChanged}
            >
            </textarea>
            <button
              onClick={onSavePostClicked}
              disabled={!canSave}
            >
            Create
            </button>
        </form>
    </section>
  )
}

export default AddPostForm
