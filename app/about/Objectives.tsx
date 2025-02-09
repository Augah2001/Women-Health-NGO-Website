import { ChakraProvider, Show } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import img_1 from "../../public/386651126_738787231624635_1270710599597749514_n copy.jpg";

const Objectives = () => {
  return (
    <ChakraProvider>
      <div className="flex min-h-screen bg-gray-900 text-white">
        {/* Image Section */}
        <Show above="lg">
          <div className="w-1/2">
            <Image
              className="w-full h-full object-cover"
              src={img_1}
              width={6000}
              height={1000}
              alt="research"
            />
          </div>
        </Show>

        {/* Text Section */}
        <div className="xs:w-full lg:w-1/2 flex justify-center items-center bg-gray-800 p-8">
          <div className="w-full max-w-2xl">
            <h2 className="text-3xl font-bold text-yellow-400">Objectives</h2>

            <div className="mt-4">
              <p className="text-lg mb-4 text-[#f6eed9]">
                The National Drug Observatory has the following objectives:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-[#f6eed9]">
                  Collect and analyze data on drug use patterns, trends, interventions, 
                  drug policy, and related information in Zimbabwe.
                </li>
                <li className="text-[#f6eed9]">
                  Monitor and evaluate the effectiveness of drug policies, interventions, 
                  and related programs.
                </li>
                <li className="text-[#f6eed9]">
                  Provide evidence-based recommendations for the improvement of 
                  drug-related policies and interventions.
                </li>
                <li className="text-[#f6eed9]">
                  Promote knowledge sharing and collaboration through 
                  information reporting and dissemination among stakeholders working in 
                  the field of drug and substance use, drug policy, and public health.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Objectives;
