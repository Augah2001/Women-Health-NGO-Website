'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface OperationCardProps {
    heading: string;
    description: string[];
}

const OperationsCard = ({ heading, description }: OperationCardProps) => {

    

    const itemVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };
  return (
    <div className=' h-full'>
        <motion.div
          className="py-5 px-5 bg-[#bde5c5] h-full"
          initial="hidden"
          whileInView="visible"
          variants={itemVariants}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl mt-4  font-bold  text-[#0c3012] ">
              {heading}
            </h2>
            
              <div className=" mt-3 ">
                  
                  <ul className="list-disc pl-6">
                  {description.map((item, index) => (
                      <li key={index} className="text-[#0c3012] xs:text-xs md:text-md">{item}</li>
                  ))}
                  </ul>
              </div>
        </motion.div>
      
    </div>
  )
}

export default OperationsCard
