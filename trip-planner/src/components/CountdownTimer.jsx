import PropTypes from 'prop-types';
import './CountdownTimer.css';
import { useState, useEffect, useCallback } from 'react';

/**
 * CountdownTimer Component
 * Displays a live countdown to the trip start date
 */
export default function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      passed: false
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (timeLeft.passed) {
    return <div className="countdown-passed">🎉 Adventure time! Have an amazing trip! 🎉</div>;
  }

  return (
    <div className="countdown">
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.days}</span>
        <span className="countdown-label">days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.hours}</span>
        <span className="countdown-label">hours</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.minutes}</span>
        <span className="countdown-label">mins</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.seconds}</span>
        <span className="countdown-label">secs</span>
      </div>
    </div>
  );
}

CountdownTimer.propTypes = {
  targetDate: PropTypes.string.isRequired
};
