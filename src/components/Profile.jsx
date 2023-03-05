import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



function Profile ( { user, currentUser } ) {
  const navigate = useNavigate()

  const locations = user.machines.filter(({ locationId }) => locationId === "Ground Kontrol")
    console.log('LOCATIONS: ', locations)
  const machines = user.machines.map((mach) => mach)
    console.log('MACHINES: ', machines)
  const score = machines.map(mach => mach.score.map(x => x.value))
    console.log('SCORE:', score)
 

  useEffect(() => {
    if(!user.email) {
      navigate('/login')
    }
  }, [])
  

  return (
    <div className="profile " >
      
      {/* TODO: refactor into one loop */}
      {/* map the sorted scores from highest to lowest */}

      <div className="score-card-box-col " >
        <div className="score-card row">
          <img className="machineImg" src="" alt="" />
          <div className="score-box " >
            {score[0].map((x, i) => (
            <div className="row">
              <div key={i} className="score-num" >{x} </div>
              <div>{machines[0].score[i].date}</div>
            </div>
            )
            )}
          </div>
        </div>

        <div className="score-card row">
          <img className="machineImg" src="" alt="" />
          <div className="score-box " >
            {score[1].map((x, i) => (
            <div className="row">  
              <div key={i} className="score-num" >{x}</div>
              <div>{machines[1].score[i].date}</div>
            </div>
            ) 
            )}
          </div>
        </div>

        <div className="score-card row">
          <img className="machineImg" src="" alt="" />
          <div className="score-box " >
            {score[2].map((x, i) => (
            <div className="row">  
              <div key={i} className="score-num" >{x}</div>
              <div>{machines[2].score[i].date}</div>
            </div>
            ) 
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile