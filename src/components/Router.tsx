import { Route, Routes, Navigate } from "react-router-dom";
import Home from "pages/home";
import PostPages from "pages/posts";
import PostPage from "pages/posts/detail";
import PostNew from "pages/posts/new";
import PostEdit from "pages/posts/edit";
import ProfilePage from "pages/profile";
import LoginPage from "pages/login";
import SignupPage from "pages/signup";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />}  />
            <Route path="/posts" element={<PostPages />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/new" element={<PostNew /> } />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route path="*" element={<Navigate  replace to="/" />} />
        </Routes>
    );
}

export default Router;