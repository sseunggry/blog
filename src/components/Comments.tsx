import React, {useContext, useEffect, useState} from "react";
import {doc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs} from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import {CommentsInterface, PostProps} from "./PostList";
import {toast} from "react-toastify";

interface CommentsProps {
    post : PostProps;
    getPost: (id: string) => Promise<void>;
}

export default function Comments({ post, getPost }:CommentsProps) {
    const [comment, setComment] = useState("");
    const [commentModify, setCommentModify] = useState(true);
    const { user } = useContext(AuthContext);
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            if(post && post?.id){
                const postRef = doc(db, "posts", post.id);
                
                if(user?.uid) {
                    const commentObj = {
                        content: comment,
                        uid: user.uid,
                        email: user.email,
                        createAt: new Date()?.toLocaleDateString("ko", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        })
                    }
    
                    await updateDoc(postRef, {
                        comments: arrayUnion(commentObj),
                        updateDated: new Date()?.toLocaleDateString("ko", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        })
                    });
                    await getPost(post?.id);
                }
            }
            toast.success("댓글을 생성했습니다.");
            setComment("");
            
        } catch(e) {
            console.log(e);
        }
    }
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        const { target : {name, value} } = e;
        
        if(name === 'comment'){
            setComment(value);
        }
    }
    const onChangeComment = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target : {name, value} } = e;
        
    }
    const handleDeleteComment = async (data:CommentsInterface) => {
        const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");
        
        if(confirm && post.id){
            const postRef = doc(db, "posts", post.id);
            await updateDoc(postRef, {
                comments: arrayRemove(data)
            });
            
            toast.success("댓글을 삭제했습니다.");
            await getPost(post?.id);
        }
    }
    const handleModify = async (data:CommentsInterface) => {
        setCommentModify(false);
    }
    
    return (
        <>
            <div className="comments">
                <form className="comments__form" onSubmit={onSubmit}>
                    <div className="form__block">
                        <label htmlFor="comment">댓글</label>
                        <textarea name="comment" id="comment" required value={comment} onChange={onChange}/>
                    </div>
                    <button type="submit" className="form__btn--submit">작성</button>
                </form>
                <div className="comments__list">
                    {post?.comments?.slice().reverse().map((comment) => (
                        <div className="comment__item" key={comment?.createAt}>
                            <div className="comment__info">
                                <p className="comment__email">{comment?.email}</p>
                                <p className="comment__date">{comment?.createAt}</p>
                                {comment?.uid === user?.uid && (
                                    <div className="post__utils-box">
                                        <div className="btn post__delete" role="presentation" onClick={() => handleDeleteComment(comment)}>삭제</div>
                                        <div className="btn post__edit" role="presentation" onClick={() => handleModify(comment)}>수정</div>
                                    </div>
                                )}
                            </div>
                            <input type="text" className="comment__content" name="comment" value={comment?.content} onChange={onChangeComment} readOnly={commentModify} />
                            {/*<p className="comment__content">{comment?.content}</p>*/}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}