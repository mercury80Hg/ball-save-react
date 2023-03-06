import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

/* Currently 'History' page/component is acting as the splash 
 page.  Profile may be implemented as the login splash page once
 more features are developed.
*/

function Profile ( { user } ) {
  const navigate = useNavigate()
 

  useEffect(() => {
    if(!user.email) {
      navigate('/login')
    }
  }, [])
  

  return (
    <div className="profile " >
    Profile
    </div>
  )
}

export default Profile