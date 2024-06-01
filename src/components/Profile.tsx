import {Link} from "react-router-dom";

export default function ProFile(){
    return (
        <section className="profile__box">
            <div className="profile__image" />
            <div className="profile__email">sseunggry@naver.com</div>
            <div className="profile__name">최승연</div>
            <Link to="/" className="profile__logout">로그아웃</Link>
        </section>
    )
}