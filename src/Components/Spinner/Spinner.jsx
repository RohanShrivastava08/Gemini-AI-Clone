import React from 'react'
import { motion } from 'framer-motion'

function Spinner() {
  return (
    <motion.div 
       animate={{rotate:360}}
       transition={{repeat:Infinity,duration:1,ease:'linear'}}
       style={{
        width:'50px',
        height:'50px',
        border:'5px solid #ccc',
        borderTop:'5px solid #3498db',
        borderRadius:'5px solid #3498db',
        borderRadius:'50%',
        margin:'20px auto'
       }}
    />
  )
}

export default Spinner
