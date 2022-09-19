import { memo } from 'react';
import SkeletonItem from '../../layout/SkeletonItem';
import Post from './Post';

const PostContainer = memo(({ isFetching, isLoading, post }) => {
  return (
    <div style={{ cursor: 'pointer' }}>
      {isFetching && <SkeletonItem />}
      {!isLoading && <Post data={post} />}
    </div>
  );
});

export default PostContainer;
