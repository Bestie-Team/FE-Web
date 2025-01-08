"use client";
import { recordGatheringFormValues } from "@/atoms/record";
import CreatingPostToRecord from "@/components/record/CreatingPostToRecord";
import { RecordValues } from "@/models/record";
import { useRecoilState } from "recoil";

export default function RecordPage() {
  const [recordValues, setRecordValues] = useRecoilState<RecordValues>(
    recordGatheringFormValues
  );

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

  return (
    <div>
      <CreatingPostToRecord onNext={handlePostInfoChange} />
    </div>
  );
}
