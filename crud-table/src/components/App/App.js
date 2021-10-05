import React, {useState} from 'react';
import './App.css';

const initialValues ={
  userName: '',
  userSurname: '',
  userSalary: '',
}

function App() {
  const [userData, setUserData  ] = useState(initialValues)
  const [users, setUsers] = useState([]);
  const [editableUserData, setEditableYsersData] = useState({
    isEdit: false,
    userIndex: null,
  })
  const isFelledField = userData.userName && userData.userSurname && userData.userSalary;
  
  const handleRemoveClick = (index) => {
    setUsers(users.filter((user,userIndex)=> userIndex !==index))
  }

  const handleSubmitUser =(e) =>{
    e.preventDefault();
    if(isFelledField){
      if(editableUserData.isEdit){
        const editedDate = users;
        editedDate.splice(editableUserData.userIndex, 1, userData)
        setUsers(editedDate);
      } else {
      setUsers((prevState)=> [...prevState, userData]);
      setEditableYsersData({
        isEdit: false,
        userIndex: null,
      })
      }
      setUserData(initialValues)
    }
  }

  const handleCleanClick = () => setUserData(initialValues)

  const handleEditClick = (data, index) =>{
    setUserData(data)
    setEditableYsersData({
      isEdit: true,
      userIndex: index,
    })
  }

console.log('users:', users)
  return (
    <div className="wrapper"> 
     <div className="wrapper-content">
      <div className='table-data'>
        <table>
          <th>#</th> 
          <th>User Name</th>
          <th>User Surname</th>
          <th>User Salary</th>
          <th>Actions</th>

          <tbody>
            {users.map((user, index)=>(
             <tr>
               <td>{index +1}</td>
               <td>{user.userName}</td>
               <td>{user.userSurname }</td>
               <td>{user.userSalary}</td>
               <td>
                 <div>
                   <button className="edit-action" onClick={()=>handleEditClick(user, index)} >edit</button>
                   <button className='remove-action' onClick={()=>handleRemoveClick(index)}>remove</button>
                 </div>
               </td>
             </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='formData'>
        <form onSubmit={handleSubmitUser} onReset={handleCleanClick}>
         <input  placeholder="Write you name" onChange={(e)=> setUserData((prevState)=> ({
           ...prevState,
           userName: e.target.value
         }))} 
         value={userData.userName}
         />  
         <input  placeholder="Write you surname" onChange={(e)=> setUserData((prevState)=>({
           ...prevState,
           userSurname: e.target.value
         }))}
         value={userData.userSurname}
         />  
         <input  placeholder="Write you salary" onChange={(e)=> setUserData((prevState)=>({
           ...prevState,
           userSalary: e.target.value
         }))} 
         value={userData.userSalary}
         />  

         <div className='buttons-wrapper'>
           <button type='reset'>Clear</button>
           <button disabled={!isFelledField} type='submit'>{editableUserData.isEdit ? 'Edit': 'Add'}</button>
         </div>
        </form>
        </div>
     </div> 
       
    </div>
  );
}

export default App;
