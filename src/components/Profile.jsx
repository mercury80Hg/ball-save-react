


function Profile ( { user, currentUser } ) {

  const locations = user.machines.filter(({ locationId }) => locationId === "Ground Kontrol")
    console.log('LOCATIONS: ', locations)
  const machines = user.machines.map((mach) => mach)
    console.log('MACHINES: ', machines)
  const score = machines.map(mach => mach.score.map(x => x.value))
    console.log('SCORE:', score)
 
  

  return (
    <div className="profile " >
      
      {/* sort the currentUser scoreObj array in most recent first and return the first three */}
      {/* { for(let i = 0; i < 3; i++) {
        <div score-card row>
          <img className="machineImg" src="" alt="" />
          <div className="score" >
            {score[1].map(x => x)}
          </div>
        </div>
        }
      } */}

      
     
      

        {/* map the sorted scores from highest to lowest */}

      

    </div>
  )
}

export default Profile