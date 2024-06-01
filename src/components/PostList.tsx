import {Link} from "react-router-dom";

interface PostListProps {
    hasNavigation? : boolean;
}

export default function PostList({ hasNavigation = true } : PostListProps ){
    return (
        <section>
            { hasNavigation && <ul className="post__navigation">
                    <li className="post__navigation-active">전체</li>
                    <li>나의 글</li>
                    <li>Frontend</li>
                    <li>Backend</li>
                    <li>Web</li>
                    <li>Native</li>
                </ul> }
            <div className="post__list">
                {[...Array(10)].map((el, idx) => (
                    <div key={idx} className="post__box">
                        <Link to={`/posts/${idx}`}>
                            <div className="post__profile-box">
                                <div className="post__profile" />
                                <div className="post__author-name">sseunggry</div>
                                <div className="post__date">2024.06.01 토요일</div>
                            </div>
                            <p className="post__title">게시글 {idx}</p>
                            <p className="post__text">
                                djWasldfjlasjdf lajsdfl jaslkfdj
                            </p>
                        </Link>
                        <div className="post__utils-box">
                            <button type="button" className="post__delete">삭제</button>
                            <button type="button" className="post__edit">수정</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}