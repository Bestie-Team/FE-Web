import Select, { StylesConfig } from "react-select";
import { SelectOptionType } from "../FilterBar";
import { Dispatch, SetStateAction } from "react";
import useNoKeyboardUp from "@/hooks/useNoKeyboardUp";

interface SelectProps {
  options: SelectOptionType[];
  selected: SelectOptionType | null;
  setSelected: Dispatch<SetStateAction<SelectOptionType | null>>;
  placeholder: string;
  borderColor?: string;
  width?: string;
}
export default function LightySelect({
  options,
  selected,
  setSelected,
  borderColor,
  width,
}: SelectProps) {
  const styles: StylesConfig = {
    menu: (baseStyles) => ({
      ...baseStyles,

      animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      zIndex: 24.616,
      padding: "4px 16px",
      borderRadius: "12px",
      borderColor: "#F4F4F4",
      borderWidth: "1px",
      boxShadow: "0px 0px 16px 0px #0000001F",
      width: "fit-content",
      fontWeight: 500,
      color: "#0A0A0A",
      fontSize: "13px",
      lineHeight: "20px",
      letterSpacing: "-0.39px",
      "& > div": {
        padding: 0,
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        "& > div:last-child": {
          borderColor: "white",
          flex: "none",
        },
        "& > div": {
          width: width ?? "99px",
          fontWeight: 500,
          color: "#0A0A0A",
          padding: 0,
          paddingTop: "12px",
          paddingBottom: "12px",
          borderBottomWidth: "1px",
          borderBottomColor: "#F4F4F4",
          flex: "none",
          "&:hover": {
            backgroundColor: "white",
            cursor: "pointer",
          },
          "&.react-select__option--is-selected": {
            backgroundColor: "white",
          },
          "&.react-select__option--is-focused": {
            backgroundColor: "white",
          },
        },
      },
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      width: "fit-content",
      paddingTop: "10px",
      paddingBottom: "10px",
      paddingLeft: "12px",
      paddingRight: "12px",
      borderRadius: "12px",
      borderWidth: "1.4px",
      borderColor: state.isFocused ? borderColor : borderColor || "#E9E9E9",
      boxShadow: state.isFocused ? "none" : "none", // react-select는 boxShadow로 outline을 표현
      "&:hover": {
        borderColor: state.isFocused ? borderColor : borderColor || "#E9E9E9",
        cursor: "pointer",
      },
      "& > div:first-child": {
        padding: 0,
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "18.2px",
        letterSpacing: "-3%",
        marginRight: "8px",
        "& > div:last-child": {
          padding: 0,
          margin: 0,
          "& > input": {
            caretColor: "transparent",
          },
        },
      },
      "& > div:last-child": {
        "& > div": {
          padding: 0,
          "&>svg": {
            fill: "#686868",
            width: "16px",
            height: "16px",
          },
        },
      },
    }),
  };
  useNoKeyboardUp();
  return (
    <Select
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder="년도"
      defaultValue={selected}
      onChange={(newValue) => setSelected(newValue as SelectOptionType)}
      options={options}
      styles={styles}
    />
  );
}
