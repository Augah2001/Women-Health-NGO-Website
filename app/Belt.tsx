import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import Logo1 from '../public/ARASA-LOGO-2.jpg'; 
import Logo2 from '../public/Logo-Love-Alliance_RGB_masterbrand-1024x453.png'; 
import Logo3 from '../public/usaid.png'; 
import Logo5 from '../public/pepfar.png'; 
import logo6 from '../public/IMG-20210621-WA0012.jpg';
import Logo7 from '../public/csm_idpc_45054bdbbf.jpg';
import Logo8 from '../public/psh.png';
import logo9 from '../public/ministry.png';

import Logo4 from '../public/IMG-20210621-WA0012.jpg'; 

const ScrollingLogoCarousel = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Marquee component with desired properties */}
      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        <div className="flex space-x-8">
          <Image src={Logo1} alt="Partner 1" width={100} height={100} />
          <Image src={Logo2} alt="Partner 2" width={100} height={100} />
          <Image src={Logo3} alt="Partner 3" width={100} height={100} />
          <Image src={Logo4} alt="Partner 4" width={130} height={100} />
          <Image src={Logo5} alt="Partner 5" width={130} height={100} />
          <Image src={logo6} alt="Partner 6" width={130} height={100} />
          <Image src={Logo7} alt="Partner 7" width={100} height={100} />
          <Image src={Logo8} alt="Partner 8" width={100} height={100} />
          <Image src={logo9} alt="Partner 8" width={100} height={100} />
          

          
     
          {/* Repeat logos to create continuous effect */}
          <Image src={Logo1} alt="Partner 1" width={100} height={100} />
          <Image src={Logo2} alt="Partner 2" width={100} height={100} />
          <Image src={Logo3} alt="Partner 3" width={100} height={100} />
          <Image src={Logo4} alt="Partner 4" width={130} height={100} />
          <Image src={Logo5} alt="Partner 5" width={130} height={100} />
          <Image src={logo6} alt="Partner 6" width={130} height={100} />
          <Image src={Logo7} alt="Partner 7" width={100} height={100} />
          <Image src={Logo8} alt="Partner 8" width={100} height={100} />
          <Image src={logo9} alt="Partner 8" width={100} height={100} />
          {/* Repeat logos to create continuous effect */}
          <Image src={Logo1} alt="Partner 1" width={100} height={100} />
          <Image src={Logo2} alt="Partner 2" width={100} height={100} />
          <Image src={Logo3} alt="Partner 3" width={100} height={100} />
          <Image src={Logo4} alt="Partner 4" width={130} height={100} />
          <Image src={Logo5} alt="Partner 5" width={130} height={100} />
          <Image src={logo6} alt="Partner 6" width={130} height={100} />
          <Image src={Logo7} alt="Partner 7" width={100} height={100} />
          <Image src={Logo8} alt="Partner 8" width={100} height={100} />
          <Image src={logo9} alt="Partner 8" width={100} height={100} />
          {/* Repeat logos to create continuous effect */}
          <Image src={Logo1} alt="Partner 1" width={100} height={100} />
          <Image src={Logo2} alt="Partner 2" width={100} height={100} />
          <Image src={Logo3} alt="Partner 3" width={100} height={100} />
          <Image src={Logo4} alt="Partner 4" width={130} height={100} />
          <Image src={Logo5} alt="Partner 5" width={130} height={100} />
          <Image src={logo6} alt="Partner 6" width={130} height={100} />
          <Image src={Logo7} alt="Partner 7" width={100} height={100} />
          <Image src={Logo8} alt="Partner 8" width={100} height={100} />
          <Image src={logo9} alt="Partner 8" width={100} height={100} />
     
        </div>
      </Marquee>
    </div>
  );
};

export default ScrollingLogoCarousel;
