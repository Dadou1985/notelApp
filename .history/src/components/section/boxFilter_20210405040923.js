import React, {useContext} from 'react'
import { FirebaseContext } from '../../Firebase'
import Filter from './form/filter'


const BoxFilter = () => {

    const {firebase} = useContext(FirebaseContext)

    return (
      <>
        <Filter firebase={firebase} />
      </>
    )
}

export default BoxFilter