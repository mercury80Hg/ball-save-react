import AddButton from "./AddButton"
import NavDisplay from "./NavDisplay"


function DynamicBox ({data, user}) {
  
  return (
    <div className="dynamic-box">
      <div className='ball-save-title'>Ball Save</div>
      <NavDisplay initials={user.initials} email={user.email} />
      {data}
      <AddButton />
    </div>
  )
}

export default DynamicBox