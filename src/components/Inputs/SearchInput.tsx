import React, { Ref } from "react";
import classnames from "classnames";
import { SearchIcon } from "@/icons";
import { useSearchStore } from "@/store";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  outerClassName?: string;
  disableInput?: boolean;
  lastChild?: any;
}

export default function SearchInput({
  outerClassName,
  disableInput,
  lastChild,
  ...props
}: PropsType) {
  const defaultClasses =
    "px-4 py-2 flex items-center gap-3 rounded-xl transition-all delay-100 ease-in-out";

  const { isOpen } = useSearchStore();
  const ref = React.useRef<HTMLInputElement>(null); // Specify type as HTMLInputElement

  React.useEffect(() => {
    if (isOpen) {
      // Focus the input when the search model is opened
      if (ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen]);

  if (disableInput) {
    return (
      <div
        className={classnames(
          outerClassName,
          defaultClasses,
          "box-glow bg-secondary-main cursor-pointer border border-transparent hover:border-orange-400 "
        )}
        onClick={props.onClick}
      >
        <SearchIcon width="20" height="20" color="white" />
        <p className="text-2xs font-rg w-full text-gray-300">
          {props.placeholder}
        </p>
        {lastChild}
      </div>
    );
  } else {
    return (
      <div
        className={classnames(
          outerClassName,
          defaultClasses,
          "box-glow bg-secondary-main"
        )}
        onClick={props.onClick}
      >
        <SearchIcon width="20" height="20" color="white" />
        <input
          ref={ref}
          {...props}
          className={classnames(
            props.className,
            "outline-none text-2xs font-rg w-full bg-transparent text-gray-200 placeholder:text-gray-300"
          )}
        />
        {lastChild}
      </div>
    );
  }
}
