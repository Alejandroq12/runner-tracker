import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { format } from 'date-fns';

function RunTracker({ userId }) {
  const [runs, setRuns] = useState([]);
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3003/run-data/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (Array.isArray(data)) {
          setRuns(data);
        } else {
          console.error('Data is not an array:', data);
        }
      });
  }, [userId]);

  const handleAddRun = () => {
    fetch('http://localhost:3003/add-run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        date: new Date().toISOString().slice(0, 10),
        distance_km: distance,
        time_minutes: time,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(runs)) {
          setRuns((prevRuns) => [...prevRuns, data]);
        }
      });
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Distance (km)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          style={{
            width: '200px',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <input
          type="text"
          placeholder="Time (minutes)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{
            width: '200px',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <button
          onClick={handleAddRun}
          style={{
            border: 'none',
            color: 'black',
          }}
          onMouseOver={(e) =>
            (e.target.style = {
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid #008CBA',
            })
          }
          onMouseOut={(e) =>
            (e.target.style = {
              backgroundColor: '#008CBA',
              border: 'none',
              color: 'white',
              padding: '15px 32px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
              margin: '4px 2px',
              transitionDuration: '0.4s',
              cursor: 'pointer',
              borderRadius: '5px',
            })
          }
        >
          Add Run
        </button>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {Array.isArray(runs) && runs.length > 0 && (
              <LineChart
                width={500}
                height={300}
                data={runs}
                style={{
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  marginBottom: '20px',
                }}
              >
                <Line type="monotone" dataKey="distance_km" stroke="#8884d8" />
                <Line type="monotone" dataKey="time_minutes" stroke="#82ca9d" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart>
            )}
            <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
              {runs.map((run) => (
                <li
                  key={run.id}
                  style={{
                    backgroundColor: '#f9f9f9',
                    marginBottom: '10px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#eee')}
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = '#f9f9f9')
                  }
                >
                  {format(new Date(run.date), 'MMM dd, yyyy')}:{' '}
                  {parseFloat(run.distance_km).toFixed(1)} km in{' '}
                  {Math.floor(run.time_minutes / 60)}:
                  {String(run.time_minutes % 60).padStart(2, '0')} hours
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default RunTracker;
