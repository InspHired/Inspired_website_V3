import "./HeroStats.css";
import {
  FaUsers,
  FaBuilding,
  FaShieldAlt,
} from "react-icons/fa";

import { MdPublic } from "react-icons/md";

const stats = [
  {
    icon: <FaUsers />,
    value: "25K+",
    title: "Candidates",
    subtitle: "Qualified talent",
    color: "#509b9e",
    bg: "#edf8f8",
  },
  {
    icon: <FaBuilding />,
    value: "500+",
    title: "Employers",
    subtitle: "Trusted partners",
    color: "#d96b43",
    bg: "#fff1eb",
  },
  {
    icon: <FaShieldAlt />,
    value: "98%",
    title: "Verified",
    subtitle: "Background screened",
    color: "#e4af51",
    bg: "#fff8e7",
  },
  {
    icon: <MdPublic />,
    value: "15+",
    title: "Countries",
    subtitle: "Across Africa",
    color: "#1f3540",
    bg: "#eef2f4",
  },
];

export default function HeroStats() {
  return (
    <div className="heroStatsWrapper">
      {stats.map((stat, index) => (
        <div className="heroStatCard" key={index}>
          <div
            className="heroStatIcon"
            style={{
              background: stat.bg,
              color: stat.color,
            }}
          >
            {stat.icon}
          </div>

          <div className="heroStatContent">
            <h3>{stat.value}</h3>

            <h4>{stat.title}</h4>

            <p>{stat.subtitle}</p>
          </div>

          <span
            className="heroStatGlow"
            style={{
              background: stat.color,
            }}
          ></span>
        </div>
      ))}
    </div>
  );
}