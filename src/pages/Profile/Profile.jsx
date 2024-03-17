import { useSelector } from "react-redux";
import { filesServerUrl } from "../../redux/api/authApi";
import { useState } from "react";
import { useCreatePostMutation, useUploadPhotoMutation } from "../../redux/api/postApi";
import { toast } from "react-toastify";

export default function Profile() {
  const [postImage, setPostImage] = useState(null)
  const [postText, setPostText] = useState('')

  const [uploadPhoto, {isLoading}] = useUploadPhotoMutation()
  const [createPost] = useCreatePostMutation()

  const handleImageUpload = async (e) => {
    try {
      const res = await uploadPhoto(e.target.files[0]).unwrap()
      console.log(res.file);
      setPostImage(res.file)
    } catch(e) {
      console.log(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!postText) {
      return toast.error('Fill text input', {
        draggable: true
      })
    }

    try {
      const newPost = await createPost({text: postText, image: postImage}).unwrap()
      console.log(newPost);
    } catch (e) {
      console.log(e)
    }
  }

  const user = useSelector((state) => state.user.user);
  return (
    <div>
      <h1>Profile</h1>
      <div className="flex gap-20">
        <div>
          <img src={`${filesServerUrl}/avatar/${user.avatar}`} alt="" /> <br />
          Username: @{user.username} <br />
          Email: {user.email} <br />
          created at: {new Date(user?.createdAt).toLocaleDateString()}
        </div>
        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <textarea onChange={e => setPostText(e.target.value)} style={{border: '1px solid #000'}}></textarea>
            <input type="file" onChange={handleImageUpload} accept="image/*" />
            {postImage && (
              <img src={`${filesServerUrl}/posts/${postImage}`}  />
            )}
            <button className="px-3 py-1 bg-indigo-500 text-white  rounded-md w-full sm:w-auto">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
