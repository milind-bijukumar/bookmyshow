import { Carousel } from 'antd';
// import bannerImg from 'https://i.pinimg.com/736x/8f/37/93/8f3793e09199287ce99afb219cd3ae79.jpg'
const MovieCarousel = () =>{
    
    const bannerImgs= [
        'https://images.filmibeat.com/ph-big/2024/11/top-hindi-movies-releasing-in-20251730788588_0.jpg',
        'https://img.goodfon.com/original/7680x4320/6/3f/karate-kid-legends-2025-movies-black-background-movies.jpg',
        'https://images.hdqwalls.com/wallpapers/captain-america-brave-new-world-chinese-poster-2025-wv.jpg'
    ]
    return (
        <div className='carousel-cont'>
            <Carousel
                arrows
                autoplay={{
                dotDuration: true,
                }}
                autoplaySpeed={3000}
                style={{
                    height:"21rem",
                    backgroundColor:"#c9c9c9"
                }}  
            >
                {
                    bannerImgs.map((img)=>{
                        return (
                        <div>
                            <h3 className="contentStyle" style={{backgroundImage:`url(${img})`}}></h3>
                        </div>
                        )
                    })
                }
            </Carousel>
            
        </div>
    
    )
}
export default MovieCarousel