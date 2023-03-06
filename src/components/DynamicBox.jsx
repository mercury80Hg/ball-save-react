import AddButton from "./AddButton"
import NavDisplay from "./NavDisplay"

/*
Dynamic Box was conceived as anfocused re-rendering field, but
It may actually be a redundancy and be removed.
 */

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