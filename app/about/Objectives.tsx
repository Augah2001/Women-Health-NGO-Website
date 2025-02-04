import { ChakraProvider, Show } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import img_1 from "../../public/386651126_738787231624635_1270710599597749514_n copy.jpg";

const Objectives = () => {
  return (
    <ChakraProvider>
      <div className="flex">
        <Show above="lg">
          <div className="w-1/2">
            <Image
              className="w-[100%]"
              src={img_1}
              width={6000}
              height={1000}
              alt="research"
            />
          </div>
        </Show>
        <div className="xs:w-full lg:w-1/2 flex  justify-center bg-[#bde5c5] ">
          <div className="mt-8 xs:w[100%] xs:px-4 sm:w-[70%] ">
            <h2 className="text-3xl  font-bold  text-[#0c3012] ">
              Objectives
            </h2>
            
              <div className=" mt-3 ">
                  <p className="text-lg mb-2 ">The National Drug Observatory has the following objectives:</p>
                  <ul className="list-disc pl-6">
                    <li className="text-[13px]">
                      Collect and analyze data on drug use patterns, trends,
                      interventions, drug policy, and related information in
                      Zimbabwe.
                    </li>
                    <li className="text-[14px]">
                      Monitor and evaluate the effectiveness of drug policies,
                      interventions, and related programs.
                    </li>
                    <li className="text-[13px]">
                      Provide evidence-based recommendations for the improvement of
                      drug-related policies and interventions.
                    </li>
                    <li className="text-[13px]">
                      Promote knowledge sharing and collaboration through
                      information reporting and dissemination among stakeholders
                      working in the field of drug and substance use, drug policy,
                      and public health.
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
