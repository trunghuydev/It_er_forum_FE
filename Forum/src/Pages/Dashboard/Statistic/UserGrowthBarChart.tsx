import React, { useState, useEffect, useRef } from "react";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import io, { Socket } from 'socket.io-client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UserGrowthData {
  day: string;
  userCount: number;
}

interface SocketData {
  data: {
    time_stamp: string;
    growth_percentage: number;
  };
}

const UserGrowthBarChart: React.FC = () => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userGrowthData, setUserGrowthData] = useState<UserGrowthData[]>(() => {
    try {
      const savedData = localStorage.getItem('userGrowthData');
      return savedData ? JSON.parse(savedData) : [
        { day: "Monday", userCount: 0 },
        { day: "Tuesday", userCount: 0 },
        { day: "Wednesday", userCount: 0 },
        { day: "Thursday", userCount: 0 },
        { day: "Friday", userCount: 0 },
        { day: "Saturday", userCount: 0 },
        { day: "Sunday", userCount: 0 },
      ];
    } catch (error) {
      console.error('Error parsing userGrowthData from localStorage:', error);
      return [
        { day: "Monday", userCount: 0 },
        { day: "Tuesday", userCount: 0 },
        { day: "Wednesday", userCount: 0 },
        { day: "Thursday", userCount: 0 },
        { day: "Friday", userCount: 0 },
        { day: "Saturday", userCount: 0 },
        { day: "Sunday", userCount: 0 },
      ];
    }
  });

  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: userGrowthData.map(entry => entry.day),
    datasets: [
      {
        label: 'User Count',
        data: userGrowthData.map(entry => entry.userCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    try {
      localStorage.setItem('userGrowthData', JSON.stringify(userGrowthData));
      console.log('Saved userGrowthData to localStorage:', userGrowthData);
    } catch (error) {
      console.error('Error saving userGrowthData to localStorage:', error);
    }
  }, [userGrowthData]);

  useEffect(() => {
    setChartData({
      labels: userGrowthData.map(entry => entry.day),
      datasets: [
        {
          label: 'User Count',
          data: userGrowthData.map(entry => entry.userCount),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [userGrowthData]);

  useEffect(() => {
    socketRef.current = io('http://localhost:3000', { transports: ['websocket'] });

    socketRef.current.on('connect', () => {
      console.log('Socket.IO connected to http://localhost:3000');
      setIsConnected(true);
      socketRef.current?.emit('subscribe', 'api/v1/subscribe-tag/user-growth');
    });

    socketRef.current.on('userGrowth', (socketData: SocketData) => {
      console.log('Received userGrowth event:', socketData);

      try {
        if (!socketData || !socketData.data || !socketData.data.time_stamp || socketData.data.growth_percentage === undefined) {
          console.error('Invalid userGrowth data received:', socketData);
          return;
        }

        const { time_stamp, growth_percentage } = socketData.data;
        const date = new Date(time_stamp);
        if (isNaN(date.getTime())) {
          console.error('Invalid time_stamp:', time_stamp);
          return;
        }

        const dayOfWeek = date.getDay();
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = daysOfWeek[dayOfWeek];

        const baseUserCount = 100;
        const userCount = Math.round(baseUserCount * growth_percentage);

        setUserGrowthData(prev => {
          const updatedData = [...prev];
          const dayIndex = updatedData.findIndex(entry => entry.day === dayName);
          if (dayIndex !== -1) {
            updatedData[dayIndex] = { ...updatedData[dayIndex], userCount };
          }
          console.log('Updated userGrowthData:', updatedData);
          return updatedData;
        });
      } catch (error) {
        console.error('Error processing userGrowth data:', error, 'Received data:', socketData);
      }
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
      setIsConnected(false);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket.IO disconnected');
      setIsConnected(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off('userGrowth');
        socketRef.current.disconnect();
        console.log('Cleanup: Socket.IO disconnected');
      }
    };
  }, []);

  const options: ChartOptions<"bar"> = {
    responsive: true, // Xóa indexAxis hoặc đặt thành 'x' (mặc định)
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Growth by Day of Week',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day of Week', // Trục X giờ là các ngày
        },
      },
      y: {
        title: {
          display: true,
          text: 'User Count', 
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <div>Socket Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default UserGrowthBarChart;