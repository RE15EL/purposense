import { DirectOutCome } from "../../types/index";

export const directOutComesMock: DirectOutCome[] = [
  {
    id: "1",
    title: "Increased literacy rates",
    subOutcomes: [
      { id: "s1", text: "Children can read at grade level" },
      { id: "s2", text: "Adult literacy programs reach 500+ participants" },
    ],
  },
  {
    id: "2",
    title: "Improved health outcomes",
    subOutcomes: [{ id: "s3", text: "Reduction in preventable diseases" }],
  },
  { id: "3", title: "Economic empowerment", subOutcomes: [] },
  { id: "4", title: "Community engagement", subOutcomes: [] },
];
