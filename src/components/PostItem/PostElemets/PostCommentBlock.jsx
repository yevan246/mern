import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { usePostContext } from "./PostContext";

const schema = yup.object().shape({
  comment: yup.string().required("Please, fill this field"),
});

export default function PostCommentBlock() {
  const { showCommentsBlock, handlePostComment } = usePostContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <div>
      {showCommentsBlock && (
        <form
          className="text-gray-600 body-font relative"
          onSubmit={handleSubmit(handlePostComment)}
        >
          <div className=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Comment
            </h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              What do u think about this post?
            </p>
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-600"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                {...register("comment")}
              ></textarea>
              {errors.comment && (
                <div className="text-xs mt-1 text-red-600">
                  {errors.comment.message}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Leave Comment
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
