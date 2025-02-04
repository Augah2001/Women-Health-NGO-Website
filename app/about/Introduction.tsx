// 'use client';
// import React, { useEffect, useRef, useState } from "react";

// const ViewAbout: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const currentRef = containerRef.current;

//     if (currentRef) {
//       currentRef.style.opacity = "0"; 
      
//       const timeoutId = setTimeout(() => {
//         setIsVisible(true);
//       }, 100); 

//       return () => {
//         clearTimeout(timeoutId); 
//       };
//     }
//   }, []);

  

//   return (
//     <div 
//       ref={containerRef} 
//       className="pt-32 bg-[#87b791] pb-14 transition-opacity duration-1000"
//       style={{ opacity: isVisible ? 1 : 0 }} 
//     >
//       <h1 className="text-4xl text-center flex justify-center  font-normal text-[#0c3012]">
//         Introduction and Background
//       </h1>
//       <div className="space-y-5 mt-5 xs:px-3 sm:px-10 ">
//         <p className="text-md text-center flex justify-even font-normal text-[#0c3012]">
//           Zimbabwe is witnessing an upsurge of drug and substance use especially
//           among young people. Drug use and injection have become the topical
//           issues in the public health discourse with more than 60% of admission
//           in the country’s mental health institutions linked to drug and
//           substance use. People who use and inject drugs are also accounting for
//           more new HIV infections and other bloodborne diseases such as
//           Hepatitis B & C. Heavily burdened with this challenge, the Zimbabwe
//           National AIDS Strategic Plan (ZNASP iv) acknowledged that people who
//           use and inject drugs are key and vulnerable populations at high risk
//           of contracting HIV but currently there is no programming for this
//           sub-population.
//         </p>
//         <p className="text-md text-center flex  font-normal text-[#0c3012]">
//           Furthermore, data on the prevalence of drug use is sketchy because the
//           country haven’t done an official population size estimate for people
//           who use and inject drugs. Although data on drug use is limited, the
//           anecdotal evidence on the ground indicates that drug use has become a
//           public health concern. Criminalization of drug use through the
//           Dangerous Drugs Act (Chapter 15:02) and the Criminal Law (codification
//           and reform) Act (Chapter 9:23) has been a stumbling block, hindering
//           health interventions tailored and differentiated to meet treatment,
//           rehabilitation and harm reduction needs of people who use and inject
//           drugs. The prohibitionist approach has also forced young people to go
//           in hidden and risky spaces and shun seeking healthcare and support
//           systems. Stigma and discrimination in healthcare facility and
//           communities have also exacerbated the situation resulting in people
//           who use and inject drugs having poor health seeking behaviour.
//         </p>
//         <p className="text-md text-center flex justify-even font-normal text-[#0c3012]">
//           Zimbabwe is witnessing an upsurge of drug and substance use especially
//           among young people. Drug use and injection have become the topical
//           issues in the public health discourse with more than 60% of admission
//           in the country’s mental health institutions linked to drug and
//           substance use. People who use and inject drugs are also accounting for
//           more new HIV infections and other bloodborne diseases such as
//           Hepatitis B & C. Heavily burdened with this challenge, the Zimbabwe
//           National AIDS Strategic Plan (ZNASP iv) acknowledged that people who
//           use and inject drugs are key and vulnerable populations at high risk
//           of contracting HIV but currently there is no programming for this
//           sub-population.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ViewAbout;