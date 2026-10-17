"use client";
import { DepartmentObject } from "@/types";

import { Check } from "lucide-react";

type Props = {
  department: DepartmentObject;
};

const DepartmentPage = ({ department }: Props) => {
  // Destructure department object
  const { text } = department;
  const sentences = text
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-2">
      {/* Text */}
      <div className="flex flex-col gap-4 px-4 md:px-8 pt-4">
        <ul className="flex flex-col gap-2">
          {sentences.map((s, i) => (
            <li key={i} className="flex flex-row gap-2">
              <Check className="mt-1 text-growth shrink-0" size={16} />
              <span>
                {s}.
                <br />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DepartmentPage;
