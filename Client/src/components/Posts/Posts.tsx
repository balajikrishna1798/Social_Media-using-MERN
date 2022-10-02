import { useAppSelector } from '../../hooks';
import Post from './Post'

const Posts = ({ setCurrentId }) => {
  const posts = useAppSelector((state:any) => (state.posts.posts));

  return (
    <>  
{
         posts.length>0 && posts.map((post:any) => (
          <div key={post?._id} >
            <Post post={post} setCurrentId={setCurrentId} />
          </div>
        )
        )
          }
          </>
    )
}

export default Posts;