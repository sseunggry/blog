import {Link, useNavigate, useParams} from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import {useContext, useEffect, useState} from "react";
import {PostProps} from "components/PostList";
import Loader from "./Loader";
import {toast} from "react-toastify";
import AuthContext from "../context/AuthContext";

export default function PostDetail(){
    const params = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<PostProps | null>(null);
    const { user } = useContext(AuthContext);
    
    const getPost = async (id: string) => {
        if(id) {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            
            setPost({ id : docSnap.id, ...(docSnap.data() as PostProps) });
        }
    }
    
    const handleDelete = async () => {
        const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
        
        if(confirm && post && post.id){
            await deleteDoc(doc(db, "posts", post.id));
            
            toast.success("게시글을 삭제했습니다.");
            navigate("/");
        }
    }
    
    useEffect(() => {
        if (params?.id) getPost(params?.id);
    }, [params?.id]);
    
    return (
        <>
            {post ? (
                <>
                    <section className="post__detail">
                        <h2 className="post__detail-title">{post?.title}</h2>
                        <div className="post__profile-box">
                            <div className="post__profile" />
                            <div className="post__author-name">{post?.email}</div>
                            <div className="post__date">{post?.createAt}</div>
                        </div>
                        <div className="post__flex-box">
                            <p className="post__category">{post?.category}</p>
                            {post?.email === user?.email && (
                                <div className="post__utils-box">
                                    <div className="btn post__delete" role="presentation" onClick={handleDelete}>삭제</div>
                                    <div className="btn post__edit">
                                        <Link to={`/posts/edit/${post?.id}`} >수정</Link>
                                    </div>
                                </div>
                                
                            )}
                        </div>
                        <div className="post__detail-text post__text--pre-wrap">
                            {post?.content}
                        </div>
                    </section>
                    <Link to="/" className="page__btn page__btn--fixed">목록으로</Link>
                </>
            ) : <Loader />}
        </>
    )
}