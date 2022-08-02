import React from 'react'
import { useEffect, useState } from 'react'

const SideBarLeaders = (props) => {
    let [players, setPlayers] = useState([])


    const sortObject = (arr) => {
        return arr.sort((a,b) => (b[props.statSelection] - a[props.statSelection])).slice(0,10)
    }

    const breakObject = (arr) => {
        let finalArray = []
        arr.map(item => {
            item.map(insideItem => {
                finalArray.push(insideItem)
            })
        })

        return finalArray
    }
    
    const getTopPlayers = () => {

        if (props.yearSelection === "All"){
            let topPlayers = []
            let year = 1980
            for (let yearData of props.yearData){
                console.log(props.yearData)
                topPlayers.push(sortObject(yearData).map(item => {
                    item["year"] = year
                    return item
                }))
                year += 1
            }

            return sortObject(breakObject(topPlayers))
            
        }else {
            return sortObject(props.yearData)
        }
    }


    useEffect(() => {
        setPlayers(getTopPlayers())
    }, [props.yearData, props.statSelection])


  return (
    <div className="order-first flex-shrink-0 w-96 mx-2 my-2 py-6 px-4 border-2 rounded-2xl flex flex-col items-center justify-between text-center">

        {players.map(item => {
            return props.yearSelection === "All" ? 
            <div>{`${item.year} ${item.player} ${item[props.statSelection]}`}</div> : 
            <div>{`${item.player} ${item[props.statSelection]}`}</div> 
        })}

    </div>
  )
}

export default SideBarLeaders