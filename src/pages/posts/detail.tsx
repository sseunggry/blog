import PostDetail from "components/PostDetail";
import Header from "components/Header";
import Footer from "components/Footer";

export default function PostPage() {
    return (
        <>
            <Header />
            <div className="contents">
                <PostDetail />
            </div>
            <Footer />
        </>
    )
}