import Header from "components/Header";
import Footer from "components/Footer";
import ProFile from "components/Profile";
import PostList from "components/PostList";

export default function ProfilePage(){
    return (
        <>
            <Header />
            <div className="contents">
                <ProFile />
                <PostList hasNavigation={false} />
            </div>
            <Footer />
        </>
    )
}