import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import * as lighty from "lighty-type";
import { Gathering } from "@/models/gathering";
import useGroup from "@/components/groups/hooks/useGroups";
import useGatherings from "@/components/gathering/hooks/useGatherings";

interface UserContextType {
  groups: lighty.Group[];
  gatherings: Gathering[];
  refetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const dateCursor = new Date().toISOString();
  const minDate = new Date("2025-01-01").toISOString();
  const maxDate = new Date("2025-12-31").toISOString();

  console.log("dateCursor", dateCursor);
  const [groupCursor, setGroupCursor] = useState<string | null>(dateCursor);
  const [gatheringCursor, setGatheringCursor] = useState<string | null>(
    minDate
  );
  const [groups, setGroups] = useState<lighty.Group[]>([]);
  const [gatherings, setGatherings] = useState<Gathering[]>([]);

  const { data: group_data, refetch: refetchGroups } = useGroup({
    cursor: groupCursor,
    limit: 50,
  });
  const { data: gathering_data, refetch: refetchGatherings } = useGatherings({
    cursor: gatheringCursor,
    limit: 50,
    minDate: minDate,
    maxDate: maxDate,
  });

  // refetch 함수 정의
  const refetch = useCallback(() => {
    console.log("Refetching data...");
    setGroupCursor(dateCursor);
    setGatheringCursor(minDate);
    refetchGroups();
    refetchGatherings();
  }, [dateCursor, minDate, refetchGroups, refetchGatherings]);

  useEffect(() => {
    if (group_data) {
      console.log(group_data);
    }
    if (!group_data?.groups) return;
    setGroups((prevGroups) => [
      ...prevGroups,
      ...group_data.groups.filter(
        (newGroup) => !prevGroups.some((group) => group.id === newGroup.id)
      ),
    ]);
    if (group_data.nextCursor != null) {
      setGroupCursor(group_data?.nextCursor);
    }
  }, [group_data?.groups]);

  useEffect(() => {
    if (gathering_data) {
      console.log(gathering_data);
    }
    if (!gathering_data?.gatherings) return;
    setGatherings((prevGatherings) => [
      ...prevGatherings,
      ...gathering_data.gatherings.filter(
        (newGathering) =>
          !prevGatherings.some((gathering) => gathering.id === newGathering.id)
      ),
    ]);
    if (gathering_data.nextCursor != null) {
      setGatheringCursor(gathering_data?.nextCursor);
    }
  }, [gathering_data?.gatherings]);

  return (
    <UserContext.Provider value={{ groups, gatherings, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
