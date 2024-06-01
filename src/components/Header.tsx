import {Link} from "react-router-dom";

export default function Header(){
    return (
        <header className="header">
            <h1 className="header__logo"><Link to="/">React Blog</Link></h1>
            <div className="header__gnb">
                <Link to="/posts/new">글쓰기</Link>
                <Link to="/posts">게시글</Link>
                <Link to="/profile">프로필</Link>
            </div>
        </header>
    )
}