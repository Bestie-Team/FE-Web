// import { GatheringInfo } from "@/models/gathering";
// import { useState } from "react";
// // import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
// import DaumPostcodeEmbed from "react-daum-postcode";
// import { SetterOrUpdater } from "recoil";
// import BottomSheetWrapper from "./bottomSheet/BottomSheetWrapper";

// // interface AddressProps {
// //   setValue: UseFormSetValue<string>;
// //   register: UseFormRegister<string>;
// //   errors: FieldErrors<string>;
// // }

// export default function AddressSearch({
//   register,
//   errors,
//   setValue,
// }: {
//   setValue: SetterOrUpdater<GatheringInfo>;
//   register: string;
//   errors: string;
// }) {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const handleComplete = (data: any) => {
//     let fullAddress = data.address;
//     let extraAddress = "";

//     if (data.addressType === "R") {
//       if (data.bname !== "") {
//         extraAddress += data.bname;
//       }
//       if (data.buildingName !== "") {
//         extraAddress +=
//           extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
//       }
//       fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
//     }
//     setValue((prev) => ({ ...prev, address: fullAddress }));
//     setIsOpen(false);
//   };
//   return (
//     <>
//       <div className="col-span-full">
//         <label
//           htmlFor="address"
//           className="block text-sm font-medium leading-6 text-gray-900"
//         >
//           주소
//         </label>
//         <div className="mt-2">
//           <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
//             <input
//               readOnly
//               placeholder="주소를 검색해 주세요"
//               //   {...register("address", { required: true })}
//               className="col-span-2 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             />
//             <button
//               type="button"
//               onClick={() => {
//                 setIsOpen((val) => !val);
//               }}
//               className="bg-blue-700 hover:bg-blue-600 py-1.5 px-2 text-white text-sm rounded"
//             >
//               주소 검색
//             </button>
//           </div>

//           {/* {errors?.address?.type === "required" && (
//             <div className="pt-2 text-xs text-red-600">
//               필수 입력 사항입니다
//             </div>
//           )} */}
//         </div>
//       </div>
//       {isOpen && (
//         <BottomSheetWrapper
//           onClose={() => {
//             setIsOpen(false);
//           }}
//         >
//           <DaumPostcodeEmbed onComplete={handleComplete} />
//         </BottomSheetWrapper>
//       )}
//     </>
//   );
// }
