import PostList from "components/PostList";
import Header from "components/Header";
import Footer from "components/Footer";

export default function PostPages() {
    return (
        <>
            <Header />
            <div className="contents">
                <PostList hasNavigation={false} />
            </div>
            <Footer />
        </>
    )
}