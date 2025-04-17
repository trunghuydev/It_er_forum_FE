import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import io, { Socket } from 'socket.io-client'
import UserGrowthBarChart from "./UserGrowthBarChart"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatisticProps { }

interface TimeTagData {
  day: string;
  hour: number;
  tags: { [tagName: string]: number };
}

const Statistic: React.FC<StatisticProps> = () => {
  const navigate = useNavigate();
  const socketRef = useRef<Socket | null>(null);


  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: Array.from({ length: 24 }, (_, i) => i.toString()),
    datasets: [],
  });

  const [isConnected, setIsConnected] = useState(false);


  const [combinedData, setCombinedData] = useState<TimeTagData[]>(() => {
    try {
      const savedData = localStorage.getItem('combinedData');
      return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
      console.error('Error parsing combinedData from localStorage:', error);
      return [];
    }
  });


  const [currentHour, setCurrentHour] = useState<number>(() => {
    try {
      const savedData = localStorage.getItem('combinedData');
      if (savedData) {
        const parsedData: TimeTagData[] = JSON.parse(savedData);
        const lastEntry = parsedData[parsedData.length - 1];
        return lastEntry ? (lastEntry.hour + 1) % 24 : 0;
      }
      return 0;
    } catch (error) {
      console.error('Error calculating currentHour from localStorage:', error);
      return 0;
    }
  });




  useEffect(() => {
    try {
      localStorage.setItem('combinedData', JSON.stringify(combinedData));
      console.log('Saved combinedData to localStorage:', combinedData);
    } catch (error) {
      console.error('Error saving combinedData to localStorage:', error);
    }
  }, [combinedData]);


  useEffect(() => {
    try {
      const savedData = localStorage.getItem('combinedData');
      const initialData: TimeTagData[] = savedData ? JSON.parse(savedData) : [];

      if (initialData.length > 0) {
        console.log('Drawing chart from localStorage data:', initialData);
        const newDatasets: any[] = [];
        const allTagNames = new Set<string>();


        initialData.forEach(entry => {
          if (entry.tags && typeof entry.tags === 'object') {
            Object.keys(entry.tags).forEach(tagName => allTagNames.add(tagName));
          }
        });


        allTagNames.forEach((tagName, index) => {
          const data = Array(24).fill(0);


          initialData.forEach(entry => {
            if (entry.tags && entry.tags[tagName] !== undefined) {
              data[entry.hour] = entry.tags[tagName];
            }
          });

          newDatasets.push({
            label: tagName,
            data: data,
            borderColor: getColor(index),
            tension: 0.1,
            fill: false,
          });
        });

        setChartData({
          labels: chartData.labels,
          datasets: newDatasets,
        });
      } else {
        console.log('No data in localStorage, initializing empty chart');
        setChartData({
          labels: chartData.labels,
          datasets: [],
        });
      }
    } catch (error) {
      console.error('Error drawing chart from localStorage:', error);
      setChartData({
        labels: chartData.labels,
        datasets: [],
      });
    }
  }, []);


  const clearLocalStorage = () => {
    try {
      localStorage.removeItem('combinedData');
      localStorage.removeItem('userGrowthData');
      setCombinedData([]);
      setChartData({ labels: chartData.labels, datasets: [] });
      setCurrentHour(0);
      console.log('Cleared localStorage and reset state');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  // Fake data
  const simulateHourIncrease = () => {
    const tagData: { [key: string]: number } = {
      "Programming language": 7.5,
      "Intern": 7.5,
      "Quiz": 3,
      "Ask me anything": 1.5,
      "Game": 1.5,
      "Mobile developer": 1.5
    };

    const now = new Date();
    const currentDay = now.toISOString().split('T')[0];

    // Cập nhật mảng gộp
    setCombinedData(prev => {
      const updatedData = [...prev];

      const existingEntryIndex = updatedData.findIndex(
        entry => entry.day === currentDay && entry.hour === currentHour
      );

      if (existingEntryIndex !== -1) {
        const updatedEntry = { ...updatedData[existingEntryIndex] };
        Object.entries(tagData).forEach(([tagName, growth]) => {
          updatedEntry.tags[tagName] = growth;
        });
        updatedData[existingEntryIndex] = updatedEntry;
        console.log('Updated existing entry at hour', currentHour, ':', updatedEntry);
      } else {
        updatedData.push({
          day: currentDay,
          hour: currentHour,
          tags: tagData,
        });
        console.log('Added new entry at hour', currentHour, ':', { day: currentDay, hour: currentHour, tags: tagData });
      }

      return updatedData;
    });


    setChartData(prevData => {
      const newDatasets = Object.keys(tagData).map((tagName, index) => {
        const existingDataset = prevData.datasets.find(ds => ds.label === tagName);

        const newData = existingDataset
          ? [...existingDataset.data]
          : Array(24).fill(0);


        if (currentHour >= 0 && currentHour < newData.length) {
          newData[currentHour] = tagData[tagName];
        } else {
          console.error('Invalid currentHour:', currentHour);
        }

        return {
          label: tagName,
          data: newData,
          borderColor: getColor(index),
          tension: 0.1,
          fill: false,
        };
      });

      const updatedChartData = {
        labels: prevData.labels,
        datasets: newDatasets,
      };
      console.log('Updated chartData:', updatedChartData);
      return updatedChartData;
    });

    // Tăng giờ lên 1
    setCurrentHour(prevHour => {
      const newHour = (prevHour + 1) % 24;
      console.log('Increased currentHour to:', newHour);
      return newHour;
    });
  };

  useEffect(() => {
    socketRef.current = io('http://localhost:3000', { transports: ['websocket'] });

    socketRef.current.on('connect', () => {
      console.log('Socket.IO connected to http://localhost:3000');

    });

    socketRef.current.on('message', (data) => {
      console.log('Raw message from server:', data);
    });

    socketRef.current.on('tagGrowth', (tagData: { [tagName: string]: number }) => {
      console.log('Received tagGrowth event:', tagData);

      if (!tagData || typeof tagData !== 'object') {
        console.error('Invalid tagData received:', tagData);
        return;
      }

      const now = new Date();
      const currentDay = now.toISOString().split('T')[0];

      setCombinedData(prev => {
        const updatedData = [...prev];

        const existingEntryIndex = updatedData.findIndex(
          entry => entry.day === currentDay && entry.hour === currentHour
        );

        if (existingEntryIndex !== -1) {
          const updatedEntry = { ...updatedData[existingEntryIndex] };
          Object.entries(tagData).forEach(([tagName, growth]) => {
            updatedEntry.tags[tagName] = growth;
          });
          updatedData[existingEntryIndex] = updatedEntry;
          console.log('Updated existing entry at hour', currentHour, ':', updatedEntry);
        } else {
          updatedData.push({
            day: currentDay,
            hour: currentHour,
            tags: tagData,
          });
          console.log('Added new entry at hour', currentHour, ':', { day: currentDay, hour: currentHour, tags: tagData });
        }

        return updatedData;
      });

      setChartData(prevData => {
        const newDatasets = Object.keys(tagData).map((tagName, index) => {
          const existingDataset = prevData.datasets.find(ds => ds.label === tagName);

          const newData = existingDataset
            ? [...existingDataset.data]
            : Array(24).fill(0);

          // Chỉ cập nhật dữ liệu tại currentHour
          if (currentHour >= 0 && currentHour < newData.length) {
            newData[currentHour] = tagData[tagName];
          } else {
            console.error('Invalid currentHour:', currentHour);
          }

          return {
            label: tagName,
            data: newData,
            borderColor: getColor(index),
            tension: 0.1,
            fill: false,
          };
        });

        const updatedChartData = {
          labels: prevData.labels,
          datasets: newDatasets,
        };
        console.log('Updated chartData:', updatedChartData);
        return updatedChartData;
      });

      setCurrentHour(prevHour => {
        const newHour = (prevHour + 1) % 24;
        console.log('Increased currentHour to:', newHour);
        return newHour;
      });
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
        socketRef.current.off('tagGrowth');
        socketRef.current.off('message');
        socketRef.current.disconnect();
        console.log('Cleanup: Socket.IO disconnected');
      }
    };
  }, []);

  const getColor = (index: number): string => {
    const colors = [
      'rgb(75, 192, 192)',
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 206, 86)',
      'rgb(153, 102, 255)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)',
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
    ];
    return colors[index % colors.length];
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Tag Growth Statistics' },
    },
    scales: {
      x: {
        title: { display: true, text: 'Hours' },
        type: 'category',
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        title: { display: true, text: 'Growth (%)' },
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidebarMenu />
      <div style={{ flex: 1, padding: '20px', marginTop: '24rem', width: '80vw', marginLeft: '20rem' }}>
        <h1>WELCOME TO STATISTIC PAGE</h1>
        <div>Socket Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
        <button
          onClick={clearLocalStorage}
          style={{
            margin: '10px 0',
            padding: '10px 20px',
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Clear Data
        </button>
        <button
          onClick={simulateHourIncrease}
          style={{
            margin: '10px',
            padding: '10px 20px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Simulate Hour Increase
        </button>
        <div style={{
          maxWidth: '800px',
          margin: '20px auto',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}>
          <Line data={chartData} options={options} />
        </div>

        <UserGrowthBarChart />
      </div>
    </div>
  );
};

export default Statistic;