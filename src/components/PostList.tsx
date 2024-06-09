import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";

import { collection, doc, getDocs, deleteDoc, query, orderBy, where } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import {toast} from "react-toastify";

interface PostListProps {
    hasNavigation? : boolean;
    defaultTab? : TabType;
}
export interface CommentsInterface {
    content: string;
    uid: string;
    email: string;
    createAt: string;
}
export interface PostProps {
    id?: string;
    title: string;
    summary: string;
    content: string;
    email: string;
    createAt: string;
    updateAt?: string;
    uid: string;
    category? : CategoryType;
    comments? : CommentsInterface[];
}

type TabType = "all" | "my" | "Frontend" | "Backend" | "Web" | "Native";
export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES : CategoryType[] = ["Frontend", "Backend", "Web", "Native"];

export default function PostList({ hasNavigation = true, defaultTab = "all" } : PostListProps ){
    const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
    const [posts, setPosts] = useState<PostProps[]>([]);
    const { user } = useContext(AuthContext);
    
    const getPosts = async () => {
        try {
            //post 초기화
            setPosts([]);
            
            //post 순서
            let postsRef = collection(db, "posts");
            let postsQuery;
            
            if(activeTab === "my" && user) {
                //나의 글만 필터링
                postsQuery = query(
                    postsRef,
                    where("uid", "==", user.uid),
                    orderBy("createAt", "asc")
                );
            } else if (activeTab === "all"){
                //모든 글 보여주기
                postsQuery = query(postsRef, orderBy("createAt", "asc"));
            }
            else {
                //카테고리 글 보여주기
                postsQuery = query(
                    postsRef,
                    where("category", "==", activeTab),
                    orderBy("createAt", "asc")
                );
            }
            
            const datas = await getDocs(postsQuery);
            datas?.forEach((doc) => {
                const dataObj = { id: doc.id, ...doc.data() };
                setPosts((prev) => [...prev, dataObj as PostProps]);
            })
        } catch(e) {
            console.log(e);
        }
    }
    const handleDelete = async (id: string) => {
        const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
        
        if(confirm && id) {
            await deleteDoc(doc(db, "posts", id));
            toast.success("게시글을 삭제했습니다.");
            
            getPosts(); //변경된 post 리스트를 다시 가져옴
        }
    }
    
    useEffect(() => {
        getPosts();
    }, [activeTab]);
    
    return (
        <section>
            { hasNavigation && (
                <ul className="post__navigation">
                    <li
                        role="presentation"
                        onClick={() => setActiveTab("all")}
                        className={activeTab === 'all' ? 'post__navigation-active' : ""}
                    >
                        전체
                    </li>
                    <li
                        role="presentation"
                        onClick={() => setActiveTab("my")}
                        className={activeTab === 'my' ? 'post__navigation-active' : ""}
                    >
                        나의 글
                    </li>
                    {CATEGORIES?.map((category) => (
                        <li
                            key={category}
                            role="presentation"
                            onClick={() => setActiveTab(category)}
                            className={activeTab === category ? 'post__navigation-active' : ""}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            )}
            <div className="post__list">
                {posts?.length > 0 ? (
                    posts?.map((post) => (
                    <div key={post?.id} className="post__box">
                        <Link to={`/posts/${post?.id}`}>
                            <div className="post__profile-box">
                                <div className="post__profile" />
                                <div className="post__author-name">{post?.email}</div>
                                <div className="post__date">{post?.createAt}</div>
                            </div>
                            <p className="post__title">{post?.title}</p>
                            <p className="post__text">{post?.summary}</p>
                        </Link>
                        {post?.email === user?.email && (
                            <div className="post__utils-box">
                                <div className="btn post__delete" role="presentation" onClick={() => handleDelete(post?.id as string)}>삭제</div>
                                <div className="btn post__edit">
                                    <Link to={`/posts/edit/${post?.id}`} >수정</Link>
                                </div>
                            </div>
                        )}
                    </div>
                ))
                ) : (
                    <div className="post__no-post">게시글이 없습니다.</div>
                )}
            </div>
        </section>
    )
}