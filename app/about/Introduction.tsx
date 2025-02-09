'use client';
import { motion } from 'framer-motion';

const ViewAbout = () => {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-[#222222]pz text-white px-6">
      {/* Header */}
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-yellow-400">Introduction & Background</h1>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="max-w-3xl mx-auto space-y-6 text-[#fff7df]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="leading-relaxed">
          Zimbabwe is witnessing an upsurge of drug and substance use, especially among young people. 
          Drug use and injection have become key public health concerns, with more than 60% of admissions 
          in the country’s mental health institutions linked to drug and substance use.
        </p>
        
        <p className="leading-relaxed">
          Despite the urgency of this crisis, data on the prevalence of drug use remains limited. 
          Zimbabwe’s legal framework, particularly the Dangerous Drugs Act and the Criminal Law Act, 
          has further complicated the issue by criminalizing drug use. This has forced many young 
          people into hidden, unsafe spaces, making it harder to seek healthcare and support.
        </p>
        
        <p className="leading-relaxed">
          Stigma and discrimination within healthcare facilities and communities have further 
          exacerbated the situation. This has led to poor health-seeking behaviors among individuals 
          struggling with substance use. Without targeted interventions and policy reform, this 
          crisis will continue to endanger lives and strain the public health system.
        </p>
      </motion.div>
    </div>
  );
};

export default ViewAbout;