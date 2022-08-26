import React from "react";

// Icons
import { ImStatsDots } from "react-icons/im";

const Title = () => {
  return (
    <div className="flex ml-4">
      <div className="text-2xl">Hoop Stats</div>
      <ImStatsDots className="text-1xl self-end ml-2 text-[#F88158]"></ImStatsDots>
    </div>
  );
};

export default Title;
