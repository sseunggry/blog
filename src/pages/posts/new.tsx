import Header from "components/Header";
import Footer from "components/Footer";
import PostForm from "components/PostForm";

export default function PostNew() {
    return (
        <>
            <Header />
            <div className="contents">
                <PostForm />
            </div>
            <Footer />
        </>
    )
}