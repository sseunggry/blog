export default function PostDetail(){
    return (
        <section className="post__detail">
            <h2 className="post__detail-title">패스트캠퍼스</h2>
            <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">sseunggry</div>
                <div className="post__date">2024.06.01 토요일</div>
            </div>
            <div className="post__utils-box">
                <button type="button" className="post__delete">삭제</button>
                <button type="button" className="post__edit">수정</button>
            </div>
            <div className="post__detail-text">
                djWasldfjlasjdf lajsdfl jaslkfdj
            </div>
        </section>
    )
}