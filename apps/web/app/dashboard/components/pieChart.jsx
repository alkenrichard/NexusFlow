"use client";

import { motion } from "motion/react";
import { useState } from "react";

const PROJECT_PROGRESS = [
  { label: "Completed", value: 45, color: "#5743F6" },
  { label: "In Progress", value: 30, color: "#CFC2FD" },
  { label: "Not Started", value: 25, color: "#B7A2DB" },
];

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: ({ length }) => {
    return {
      pathLength: length,
      opacity: 1,
      transition: {
        pathLength: {
          delay: 0,
          type: "spring",
          duration: 1.5,
          bounce: 0,
        },
        opacity: { delay: 0, duration: 0.01 },
      },
    };
  },
};

const getStrokeWidth = () => {
  const width = window.innerWidth;

  if (width < 640) return 70; // mobile
  if (width < 1024) return 80; // tablet
  return 90; // desktop
};

export default function PieChart({ data = PROJECT_PROGRESS }) {
  const [dataHover, setDataHover] = useState(null);

  const totalData = data.reduce((acc, item) => acc + item.value, 0);

  let currentRotation = -90;

  const pieSlices = PROJECT_PROGRESS.map((item) => {
    const degree = (item.value / totalData) * 360;

    const slice = {
      ...item,
      rotate: currentRotation,
      degree,
    };

    currentRotation += degree;

    return slice;
  });

  return (
    <div className="max-w-fit">
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 300 300"
        initial="hidden"
        animate="visible"
      >
        {pieSlices.map((item) => (
          <motion.circle
            key={item.label}
            cx="150"
            cy="150"
            r="70"
            stroke={item.color}
            variants={draw}
            onMouseEnter={() => setDataHover(item)}
            onMouseLeave={() => setDataHover(null)}
            whileHover={{ scale: 1.1 }}
            custom={{ length: item.value / totalData }}
            style={{
              ...shape,
              rotate: `${item.rotate}deg`,
            }}
          />
        ))}

        <circle cx="150" cy="150" r="70" className="fill-background" />

        <motion.text
          x="150"
          y="150"
          animate={{ scale: dataHover ? 1 : 0 }}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-bold text-primary"
        >
          {dataHover ? `${(dataHover.value / totalData) * 100}%` : ""}
        </motion.text>
      </motion.svg>
    </div>
  );
}

const shape = {
  strokeWidth: getStrokeWidth(),
  fill: "transparent",
};
