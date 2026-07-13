import "./AvatarLayer.css";

const avatars = [
  {
    id: 1,
    src:"https://raw.githubusercontent.com/InspHired/Inspired_website_V3/main/Avatars/Business_women.png",
    alt: "Construction Worker",
    x: "10%",
    y: "40%",
    delay: "0s",
  },
  {
    id: 2,
    src: "https://raw.githubusercontent.com/InspHired/Inspired_website_V3/main/Avatars/Const_worker.png",
    alt: "Business Woman",
    x: "22%",
    y: "14%",
    delay: ".7s",
  },
  {
    id: 3,
    src: "https://raw.githubusercontent.com/InspHired/Inspired_website_V3/main/Avatars/Engineer.png",
    alt: "Engineer",
    x: "47%",
    y: "30%",
    delay: "1.4s",
  },
  {
    id: 4,
    src: "https://raw.githubusercontent.com/InspHired/Inspired_website_V3/main/Avatars/Doctor.png",
    alt: "Doctor",
    x: "66%",
    y: "55%",
    delay: ".5s",
  },
  {
    id: 5,
    src: "https://raw.githubusercontent.com/InspHired/Inspired_website_V3/main/Avatars/IT_guy.png",
    alt: "Developer",
    x: "72%",
    y: "10%",
    delay: "1s",
  },
  {
    id: 6,
    src: "https://raw.githubusercontent.com/InspHired/Inspired_website_V3/main/Avatars/Teacher.png",
    alt: "Teacher",
    x: "82%",
    y: "45%",
    delay: "2s",
  },
];

export default function AvatarLayer() {
  return (
    <div className="avatar-layer">
      {avatars.map((avatar) => (
        <div
          key={avatar.id}
          className="avatar-node"
          style={{
            left: avatar.x,
            top: avatar.y,
            animationDelay: avatar.delay,
          }}
        >
          <img src={avatar.src} alt={avatar.alt} />
        </div>
      ))}
    </div>
  );
}