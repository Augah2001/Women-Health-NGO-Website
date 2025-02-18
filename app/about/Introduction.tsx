'use client';
import { motion } from 'framer-motion';

const ViewAbout = () => {
  return (
    <div className="pt-28 pb-2 min-h-screen bg-[#222222]pz text-white px-6">
      {/* Header */}
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-yellow-400">Introduction</h1>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="max-w-3xl mx-auto space-y-5 text-[#fff7df]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="leading-relaxed">
        Women Health Issues Trust Zimbabwe Observatory on Sexual and
  Reproductive Health and Rights, is an initiative in partnership with Zimbabwe
  Civil Liberties and Drug Network sponsored by Aids Fonds. We are proudly
  collaborating with a coalition of Zimbabwean SRHR and drug policy reform
  organizations committed to the well-being of our country in order to secure
  data and insights that are critical to shaping SRHR and the need for drug
  policy reform in Zimbabwe and Southern Africa.
        </p>
        <h1 className='text-2xl text-yellow-400 font-bold flex justify-center'>Empowering Change</h1>
        
        <p className="leading-relaxed">
       
Alongside our partners, The Observatory is poised to be the catalyst for
transformative change. It will unite a wealth of evidence-based data that will
encompass the multi-county landscape that is Zimbabwean sexual and
reproductive health and rights. This singular repository will serve as the
bedrock of informed decisions, driving effective action and impactful change.
        </p>
        <h1 className='text-2xl text-yellow-400 font-bold flex justify-center'> A Unified Vision</h1>

        <p className="leading-relaxed">
       
       
In our united pursuit of a future where fundamental rights are not just
recognized but upheld, the WHIZ Trust SRHR Observatory will stand as a

beacon of hope. We envision a Zimbabwe where everyone, irrespective of
their background or circumstance, receives the care, respect, and dignity
they inherently deserve.
        </p>
        <h1 className='text-2xl text-yellow-400 font-bold flex justify-center'> Your Invitation</h1>

        <p className="leading-relaxed">
       
       
        
We extend a warm invitation to each one of you, irrespective of your role or
background, to embark on this transformative journey with us. As we
collectively navigate toward a brighter, healthier Zimbabwe for all, your
presence, support, and active engagement are vital to our shared success.
        </p>
        <h1 className='text-2xl text-yellow-400 font-bold flex justify-center'> Join Us</h1>

<p className="leading-relaxed">



Visit us on our website, where a wealth of knowledge, resources, and
opportunities for collaboration await. Together, let&#39;s ignite a positive shift,
driving lasting change and fostering a future that honors the rights and well-
being of every individual across our Zimbabwean community.
</p>
        
        
      </motion.div>
    </div>
  );
};

export default ViewAbout;