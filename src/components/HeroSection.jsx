export default function HeroSection({ month }) {
  return (
    <div className="hero">
      <img
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        alt="calendar"
      />

      <div className="overlay"></div>

      <div className="month-text">
        <p>2026</p>
        <h1>{month}</h1>
      </div>
    </div>
  );
}