import { ChakraProvider, Show } from "@chakra-ui/react";
import View from "./ResearchView";
import SideBar from "./SideBar";
import Accordion from "./working-paper/Accordion";
import { ReactNode } from "react";


const ReseachLayout = ({ children }: { children: ReactNode }) => {
  return (
    
      <div className="flex">
      <ChakraProvider  >
        <Show above="sm">
          <div className="w-[25%] border-r-[1px] pe-2   border-[#88b58e] bg-[#aed9b6]">
            <SideBar />
          </div>
        </Show>
        </ChakraProvider>
        <div className="sm:w-[75%] xs:w-full">{children}</div>
      </div>
    
  );
};

export default ReseachLayout;
