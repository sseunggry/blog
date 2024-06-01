import {Link} from "react-router-dom";

export default function Footer(){
    return (
        <footer className="footer">
            <div className="footer__nav">
                <Link to="/posts/new">글쓰기</Link>
                <Link to="/posts">게시글</Link>
                <Link to="/profile">프로필</Link>
            </div>
            <p className="footer__copyright">@CopyRight reserve 2024</p>
        </footer>
    )
}