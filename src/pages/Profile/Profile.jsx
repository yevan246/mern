import { useSelector } from "react-redux";
import { filesServerUrl } from "../../redux/api/authApi";
import { useState } from "react";
import {
  useCreatePostMutation,
  useUploadPhotoMutation,
} from "../../redux/api/postApi";
import { toast } from "react-toastify";
import { useGetPostsByUserIdQuery } from "../../redux/api/userApi";
import Container from "../../components/Container/Container";
import PostItem from "../../components/PostItem/PostItem";
import UploadPhotoModal from "../../components/Modals/UploadPhotoModal";

export default function Profile() {
  const [postImage, setPostImage] = useState(null);
  const [postText, setPostText] = useState("");
  const [showUploadPhotoModal, setShowUploadPhotoModal] = useState(false);

  const user = useSelector((state) => state.user.user);

  const [uploadPhoto] = useUploadPhotoMutation();
  const [createPost] = useCreatePostMutation();
  const { data: posts = [] } = useGetPostsByUserIdQuery({
    userId: user._id,
    page: 1,
    limit: 10,
  });
  console.log(posts);

  const handleImageUpload = async (e) => {
    try {
      const res = await uploadPhoto(e.target.files[0]).unwrap();
      console.log(res.file);
      setPostImage(res.file);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText) {
      return toast.error("Fill text input", {
        draggable: true,
      });
    }

    try {
      const newPost = await createPost({
        text: postText,
        image: postImage,
      }).unwrap();
      console.log(newPost);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      {showUploadPhotoModal && <UploadPhotoModal closeModal={() => setShowUploadPhotoModal(false)} />}

      <div className="flex gap-20 mt-10">
        <div>
          <div className="w-64 h-64 bg-red-100 relative">
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage: `url(${filesServerUrl}/avatar/${user.avatar})`,
              }}
            ></div>
            <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-white font-semibold">
              <div onClick={() => setShowUploadPhotoModal(true)} className="absolute bottom-0 z-50 flex items-center justify-center gap-x-2 p-2 border-t-2 w-full cursor-pointer hover:bg-[#a6a6a6] duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
                Upload new photo
              </div>

              <div className="opacity-35 absolute inset-0 z-40 bg-black"></div>
            </div>
          </div>
          {/* <img src={`${filesServerUrl}/avatar/${user.avatar}`} onClick={() => setShowUploadPhotoModal(true)} alt="" /> <br /> */}
          Username: @{user.username} <br />
          Email: {user.email} <br />
          created at: {new Date(user?.createdAt).toLocaleDateString()}
        </div>
        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setPostText(e.target.value)}
              style={{ border: "1px solid #000" }}
            ></textarea>
            <input type="file" onChange={handleImageUpload} accept="image/*" />
            {postImage && (
              <img
                src={`${filesServerUrl}/posts/${postImage}`}
                className="max-w-80 max-h-80 object-contain"
              />
            )}
            <button className="px-3 py-1 bg-indigo-500 text-white  rounded-md w-full sm:w-auto">
              Create
            </button>
          </form>
          <div>
            {posts.map((post) => (
              <PostItem post={post} key={post._id} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
