import React from 'react'
import "./Dashboard.scss"
import image from "../../assets/photo.jpg"

const Dashboard = () => {
  return (
    <div className="home-section">
      <div className="section-one">
      <div className="left">
            <h1 className="headline">Avefiles Foundation</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab officia veritatis officiis vero aut, ex repudiandae assumenda cupiditate maiores quaerat quidem. Itaque, dignissimos assumenda dolorum dicta voluptatem sunt deserunt blanditiis?</p>

          <button className="donate">Donate Now</button>
        </div>
        <div className="right">
             <img 
             src={image}
             />  
        </div>
      </div>
      <div className="section-two">
        
      </div>
        


    </div>
  )
}

export default Dashboard