import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

export default function ToggleSwitch(props) {
  const [searchPlayer, setSearchPlayer] = useState(true);

  useEffect(() => {
    if (searchPlayer === true) {
      props.setSearchOption("Player");
    } else {
      props.setSearchOption("Year");
    }

    console.log(searchPlayer);
  }, [searchPlayer]);

  return (
    <div>
      <Switch
        checked={searchPlayer}
        onChange={setSearchPlayer}
        className={`${searchPlayer ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${searchPlayer ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
