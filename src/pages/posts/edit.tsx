import Header from "components/Header";
import PostForm from "components/PostForm";
import Footer from "components/Footer";

export default function PostEdit() {
    return (
        <>
            <Header />
            <div className="contents">
                <PostForm btnName={"수정"} />
            </div>
            <Footer />
        </>
    )
}