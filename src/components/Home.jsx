import image from "../assets/travel.jpg"

const Home = () => {
  return (
    <div  className="relative overflow-hidden">
      <img src={image} alt="travel" className="absolute object-cover w-full h-full"/> 
      <section className="relative  top-3 left-2 flex justify-center min-h-screen"> 
      <h2 className="text-2xl"> Hi~我是Kevin</h2>
      </section>
      </div>
  )
}

export default Home