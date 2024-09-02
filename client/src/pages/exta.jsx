import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const exta = () => {

    const ids = [1,2,3,4,5,6,7,8,9,10];

  return (
    <div className='text-white px-4'>
        Click to login with any of the following ids of the student:
        {
            ids.map(
                (id) => (
                    <Link to={`/${id}`} key={id} className='text-white' style={{margin: '10px 0px'}}>
                        <h6>{id}</h6>
                    </Link>
                )
            )
        }
    </div>
  )
}

export default exta