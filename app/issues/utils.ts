import { Issue, Status } from "@prisma/client";

export interface SearchParamProp {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}
