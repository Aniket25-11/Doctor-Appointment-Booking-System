import React from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
  return (
    <form>
      <p>Add Doctor</p>
      <div>
        <div>
          <label htmlFor="doc-img">
            <img src={assets.upload_area} alt="" />
          </label>
            <input type="file" name='' id="doc-img" hidden/>
            <p>Upload Doctor <br /> picture</p>
        </div>

        <div>
          <div>
            <div>
              <p>Your Name</p>
              <input type="text" />
            </div>
          </div>
        </div>

      </div>
        
    </form>
  )
}

export default AddDoctor