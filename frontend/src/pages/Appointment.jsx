import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Appointment = () => {

  const {docId} = useParams
  const {doctors} = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo)
  }

  useEffect(()=>{
    fetchDocInfo()
  },[doctors, docId])


  return (
    <div>
      {/* ------ Doctor Details ------ */}
      <div>
        <div>
          <img src={docInfo.image} alt="" />
        </div>

        <div>
          {/* ------ Doc Info: name, degree, experience */}
          <p></p>
        </div>
      </div>
        
    </div>
  )
}

export default Appointment