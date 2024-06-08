import { Link } from "react-router-dom";
import {  BsSun, BsMoonFill } from "react-icons/bs";
import {useContext} from "react";
import ThemeContext from "context/ThemeContext";

export default function Footer(){
    const context = useContext(ThemeContext);
    return (
        <footer className="footer">
            <div className="footer__nav">
                <Link to="/posts/new">글쓰기</Link>
                <Link to="/posts">게시글</Link>
                <Link to="/profile">프로필</Link>
                <div className="footer__theme-btn">
                    {context.theme === 'light' ? <BsSun onClick={context.toggleMode}/> : <BsMoonFill onClick={context.toggleMode}/>}
                </div>
            </div>
            <p className="footer__copyright">@CopyRight reserve 2024</p>
        </footer>
    )
}