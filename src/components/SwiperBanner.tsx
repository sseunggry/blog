import {useState} from "react";

export default function SwiperBanner(){
    const url = '../../public/resource/images/content/';
    const imgList = ['banner_01.jpg', 'banner_02.jpg', 'banner_03.jpg'];
    
    const [activeSwiper, setActiveSwiper] = useState(0);
    
    const onClickPrev = () => {
        if(activeSwiper > 0) {
            setActiveSwiper((prevNum) => prevNum-1);
        }
    }
    const onClickNext = () => {
        if(activeSwiper < imgList.length -1){
            setActiveSwiper((prevNum) => prevNum+1);
        }
    }
    
    const onClickDot = (e:any, idx:number) => {
        setActiveSwiper(idx);
    }
    
    return (
        <>
            <section className="swiper">
                <div className="swiper__wrapper" style={{transform: `translate(${activeSwiper * -100}%, 0)`}}>
                    {imgList.map((el, idx) => (
                        <div className="swiper__slide" key={idx}>
                            <p>{idx}</p>
                            <img src={`${url}${el}`} alt=""/>
                        </div>
                    ))}
                </div>
                <div className="swiper__controls">
                    <button type="button" className="swiper__controls-prev" onClick={onClickPrev}></button>
                    <button type="button" className="swiper__controls-next" onClick={onClickNext}></button>
                </div>
                <div className="swiper__dots">
                    {imgList.map((el, idx) => (
                        <div className={(activeSwiper == idx) ? 'swiper__dot active' : 'swiper__dot'} key={idx} onClick={e => onClickDot(e, idx)}></div>
                    ))}
                </div>
            </section>
        </>
    )
}