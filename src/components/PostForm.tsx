
interface PostFormBtnProps {
    btnName? : string;
}

export default function PostForm({btnName = "제출"} : PostFormBtnProps){
    return (
        <>
            <form action="/post" method="POST" className="form">
                <div className="form__block">
                    <label htmlFor="category">카테고리</label>
                    <select name="category" id="category">
                        <option value="" defaultValue="" >카테고리를 선택해주세요</option>
                        <option value="Frontend" >Frontend</option>
                        <option value="Backend" >Backend</option>
                        <option value="Web" >Web</option>
                        <option value="Native" >Native</option>
                    </select>
                </div>
                <div className="form__block">
                    <label htmlFor="title">제목</label>
                    <input type="text" name="title" id="title" required />
                </div>
                <div className="form__block">
                    <label htmlFor="summary">요약</label>
                    <input type="text" name="summary" id="summary" required />
                </div>
                <div className="form__block">
                    <label htmlFor="content">내용</label>
                    <textarea name="content" id="content" required ></textarea>
                </div>
                <div className="form__block">
                    <input type="submit" value={btnName} className="form__btn--submit" />
                </div>
                {/*<button type="submit" className="form__btn--submit" >글 올리기</button>*/}
            </form>
        </>
    )
}