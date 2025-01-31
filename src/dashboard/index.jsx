// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react';
import GlobalApi from '../../service/GlobalApi';
import { useState } from 'react';
import ResumeCardItem from './components/ResumeCardItem';
function Dashboard() {


  const { user } = useUser();

  // eslint-disable-next-line no-unused-vars
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && GetResumesList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
 

  /* 
  Used to Get Users Resume List
  */
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {

        setResumeList(resp.data.data);
      }
      )
  };
  return (

    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start creating AI resume for your next job role</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5 '>
        <AddResume/> 
        {resumeList.length>0 && resumeList.map((resume, index) => (
           <ResumeCardItem resume={resume} key={index}/>
        ))
      }
      </div>
    </div>

  )
}

export default Dashboard