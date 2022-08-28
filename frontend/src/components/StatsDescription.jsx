import React from 'react'
import { statsDescription } from '../config/statDescriptionConfig'

const StatsDescription = (props) => {
    console.log(props.statSelection)
    console.log(statsDescription)
  return (
    <div>
        {statsDescription[props.statSelection].map(item => {
            return <div>{item}</div>

        })}

    </div>
  )
}

export default StatsDescription