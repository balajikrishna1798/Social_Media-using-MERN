export const LikeCount = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id;
  if (post?.likes.length > 0) {
    return post.likes.find((like: any) => like === userId) ? (
      <>
        {post?.likes.length > 2
          ? `you and ${post?.likes.length - 1} others liked`
          : `${post?.likes.length} like${post?.likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        {post?.likes.length}
        {post?.likes.length === 1 ? "Like" : "Likes"}
      </>
    );
  }
};
