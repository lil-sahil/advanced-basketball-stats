import React from "react";

// Icons
import { ImStatsDots } from "react-icons/im";

const Title = () => {
  return (
    <div className="flex mb-16 px-8 border-b-2">
      <div className="text-8xl">Hoop Stats</div>
      <ImStatsDots className="text-4xl self-end ml-6 mb-2 text-[#F88158]"></ImStatsDots>
    </div>
  );
};

export default Title;
