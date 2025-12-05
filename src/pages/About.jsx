import img from "../assets/about_image.png"
function About() {
  return (
    <div>
      <div className="aboutUs flex flex-col p-0">
        <h1 className="p-10 w-full text-3xl font-normal uppercase text-center">About <span className="font-semibold">Us</span></h1>
        <div className="w-full flex flex-col md:flex-row relative justify-between gap-5">
          <div className="img relative mb-5 lg:m-0 w-full lg:w-[687px] lg:h-[458px]">
            <img src={img} className="md:sticky top-0 left-0 h-[600px] lg:w-[438px] lg:h-[445px]" />
          </div>
          <div className="desc font-normal text-[1.125rem] leading-[180%] w-full text-wrap">
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            <br />
            <br />
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
            <br />
            <br />
            <span className="font-bold">Our Vision</span>
            <br />
            <br />
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </div>
        </div>
      </div>
      <div className="WhyUs"></div>
    </div>
  )
}

export default About;