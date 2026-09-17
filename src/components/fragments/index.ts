import type { ComponentType } from "react";
import { CareerMatch } from "./CareerMatch";
import { CasePipeline } from "./CasePipeline";
import { DirectoryAnalytics } from "./DirectoryAnalytics";
import { LegalSearch } from "./LegalSearch";
import { LoadBoard } from "./LoadBoard";
import { MigrationLog } from "./MigrationLog";
import { SoapNote } from "./SoapNote";

/** Illustrative product fragments, keyed by case study id. */
export const fragments: Record<string, ComponentType> = {
  "001": LoadBoard,
  "002": CareerMatch,
  "003": SoapNote,
  "004": LegalSearch,
  "005": MigrationLog,
  "006": DirectoryAnalytics,
  "007": CasePipeline,
};
