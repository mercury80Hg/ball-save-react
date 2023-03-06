import { Link, useNavigate } from "react-router-dom"

/* Big metallic ball/button that is a persistent quick button to
 navigate to the add-score screen */

function AddButton () {
 
  
  return (
    <div>
      <Link to='/add' className="pinBall add-btn">
        <img className="pinBall" src="/images/black-pinball-trans.png" alt="metallic silver pinball button" />
      </Link>
    </div>
  )
}

export default AddButton