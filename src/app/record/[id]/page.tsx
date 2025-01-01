"use client";
import { recordGatheringFormValues } from "@/atoms/record";
import CreatingPostToRecord from "@/components/record/CreatingPostToRecord";
import { RecordValues } from "@/models/record";
import { useRecoilState } from "recoil";

export default function RecordPage() {
  const [recordValues, setRecordValues] = useRecoilState<RecordValues>(
    recordGatheringFormValues
  );

  //   const onSubmit = (recordValues: RecordValues) => {};

  //   useEffect(() => {
  //     if (step === 3) {
  //       onSubmit({
  //         ...recordValues,
  //         appliedAt: new Date(),
  //       } as RecordValues);
  //     } else {
  //       console.log("저장", recordValues);
  //     }
  //   }, [recordValues, onSubmit]);

  const handlePostInfoChange = (postInfoValues: {
    imageUrl: string[];
    recordContent: string;
  }) => {
    setRecordValues((prevValues) => ({
      ...prevValues,
      ...postInfoValues,
    }));
  };
  console.log(recordValues);

  return <CreatingPostToRecord onNext={handlePostInfoChange} />;
}
