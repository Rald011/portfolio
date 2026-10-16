"use client";

import { useEffect, useState } from "react";

export default function Clock({ timeZone, city }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone,
      }).format(now)
    : "\u00a0";

  return (
    <p className="clock" aria-live="off">
      <span className="clock-time">{time}</span>
      <span className="clock-city">in {city} right now</span>
    </p>
  );
}
