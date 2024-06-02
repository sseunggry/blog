import {Link} from "react-router-dom";
import {useState} from "react";

interface PostListProps {
    hasNavigation? : boolean;
}

type TabType = "all" | "my" | "frontEnd" | "backend" | "web" | "native";

export default function PostList({ hasNavigation = true } : PostListProps ){
    const [activeTab, setActiveTab] = useState<TabType>('all');
    
    // const onClickTab = (e:any) => {
    //     const target = e.target;
    //     const liList = target.parentNode.querySelectorAll('li');
    //
    //     liList.each((el:any) => el.classList.remove('post__navigation-active'));
    //     target.classList.add('post__navigation-active');
    // }
    
    const tabList = {"전체" : "all", "나의 글" : "my", "Frontend" : "frontEnd", "Backend" : "backend", "Native" : "native"};
    
    return (
        <section>
            { hasNavigation && (
                <ul className="post__navigation">
                    <li
                        role="presentation"
                        onClick ={() => setActiveTab('all')}
                        className={activeTab === 'all' ? 'post__navigation-active' : ''}
                    >
                        전체
                    </li>
                    <li
                        role="presentation"
                        onClick ={() => setActiveTab('my')}
                        className={activeTab === 'my' ? 'post__navigation-active' : ''}
                    >
                        나의 글
                    </li>
                    <li
                        role="presentation"
                        onClick ={() => setActiveTab('frontEnd')}
                        className={activeTab === 'frontEnd' ? 'post__navigation-active' : ''}
                    >
                        Frontend
                    </li>
                    <li
                        role="presentation"
                        onClick ={() => setActiveTab('backend')}
                        className={activeTab === 'backend' ? 'post__navigation-active' : ''}
                    >
                        Backend
                    </li>
                    <li
                        role="presentation"
                        onClick ={() => setActiveTab('web')}
                        className={activeTab === 'web' ? 'post__navigation-active' : ''}
                    >
                        Web
                    </li>
                    <li
                        role="presentation"
                        onClick ={() => setActiveTab('native')}
                        className={activeTab === 'native' ? 'post__navigation-active' : ''}
                    >
                        Native
                    </li>
                </ul>
            )}
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