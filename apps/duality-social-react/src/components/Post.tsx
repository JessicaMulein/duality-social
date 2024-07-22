import React, { CSSProperties, useState } from 'react';
import './Post.scss';

// Define the interface for the component props
interface PostProps {
  post: {
    _id: string;
    author: {
      username: string;
    };
    content: string;
    replies?: Array<PostProps['post']>;
  };
  depth?: number;
  initialDepth?: number;
}

const Post: React.FC<PostProps> = ({ post, depth = 0, initialDepth = 2 }) => {
    const [showReplies, setShowReplies] = useState(depth < initialDepth);

    const toggleReplies = () => setShowReplies(!showReplies);

    // Extend the CSSProperties type to include custom CSS properties
    const dynamicStyle: CSSProperties & { '--margin-left': string } = {
        '--margin-left': `${depth * 20}px`,
    };

    return (
        <div className="post" style={dynamicStyle}>
            <h3>{post.author.username}</h3>
            <p>{post.content}</p>
            {post.replies && post.replies.length > 0 && (
                <>
                    <button onClick={toggleReplies}>
                        {showReplies ? 'Hide Replies' : `Show Replies (${post.replies.length})`}
                    </button>
                    {showReplies && (
                        <div>
                            {post.replies.map((reply) => (
                                <Post key={reply._id} post={reply} depth={depth + 1} initialDepth={initialDepth} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Post;
