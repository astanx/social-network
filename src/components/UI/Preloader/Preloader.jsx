import React from 'react'
import preloader from './../Images/bouncing-circles.svg'
import classes from './Preloader.module.css'

const Preloader = () => {
  return (
    <div className={classes.content}>
        <img className={classes.preloader} src={preloader} />
    </div>
    
  )
}

export default Preloader
