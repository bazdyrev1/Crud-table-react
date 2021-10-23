import React, { useState } from 'react';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustonButton';
import './App.css';
import CustomTable from '../Customtable/CustomTable';


const initialValues = {
  userName: '',
  userSurname: '',
  userSalary: '',
}

function App() {
  const [userData, setUserData] = useState(initialValues)
  const [users, setUsers] = useState([]);
  const [editableUserData, setEditableUsersData] = useState({
    isEdit: false,
    userIndex: null,
  });


  const isFelledFields = userData.userName && userData.userSurname && userData.userSalary;

  const handleRemoveClick = ({ index }) => {
    setUsers(users.filter((user, userIndex) => userIndex !== index));
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (isFelledFields) {
      if (editableUserData.isEdit) {
        const editedDate = users;
        editedDate.splice(editableUserData.userIndex, 1, userData)
        setUsers(editedDate);
        setEditableUsersData({
          isEdit: false,
          userIndex: null,
        })
      } else {
        setUsers((prevState) => [...prevState, userData]);

      }
      setUserData(initialValues)
    }
  }

  const handleCleanClick = () => setUserData(initialValues)

  const handleEditClick = ({ user, index }) => {
    setUserData(user)
    setEditableUsersData({
      isEdit: true,
      userIndex: index,
    })
  }

  const handleInputChange = (e, userName) => setUserData((prevState) => ({
    ...prevState,
    [userName]: e.target.value
  }))

  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <div className='table-data'>

          <CustomTable
            users={users}
            handleEditClick={handleEditClick}
            handleRemoveClick={handleRemoveClick}
          />
        </div>

        <div className='formData'>
          <form onSubmit={handleSubmitUser} onReset={handleCleanClick}>
            <CustomInput
              placeholder='Write you name'
              handleChange={handleInputChange}
              value={userData.userName}
              fieldName='userName'
            />
            <CustomInput
              placeholder='Write you surname'
              handleChange={handleInputChange}
              value={userData.userSurname}
              fieldName='userSurname'
            />
            <CustomInput
              placeholder='Write you salary'
              handleChange={handleInputChange}
              value={userData.userSalary}
              fieldName='userSalary'
            />


            <div className='buttons-wrapper'>
              <CustomButton
                label="Clear"
                classNames=''
                handleClick={() => { }}
                data={null}
                type='reset'
              />
              <CustomButton
                label={editableUserData.isEdit ? 'Edit' : 'Add'}
                classNames=''
                handleClick={() => { }}
                data={null}
                type='submit'
              />
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default App;
