import svg from "../assets/animate.svg"

function Hero (){
    return(
        <> 
        <div className="mt-32 mx-auto lg:w-[40%] ">
            <h1 className="text-2xl font-semibold text-center -mt-10">Cooming Soon...</h1>
            <img className="w-[100%]" src={svg} alt="" />
        </div>
       
        
        </>
    )
}

export default Hero