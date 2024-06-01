import Header from "components/Header";
import Footer from "components/Footer";
import PostList from "components/PostList";
import SwiperBanner from "../../components/SwiperBanner";

export default function Home(){
    return (
        <div>
            <Header />
            <div className="contents">
                <SwiperBanner />
                <PostList />
            </div>
            <Footer />
        </div>
    )
}