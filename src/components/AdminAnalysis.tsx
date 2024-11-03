import React, { useState } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface MonthlyChecks {
  [year: string]: {
    [month: string]: number;
  };
}

interface YearlyChecks {
  [year: string]: number;
}

interface Comparisons {
  yesterday_vs_today: { yesterday: number; today: number; increase: number };
  last_week_vs_this_week: { last_week: number; this_week: number; increase: number };
  last_month_vs_this_month: { last_month: number; this_month: number; increase: number };
  last_year_vs_this_year: { last_year: number; this_year: number; increase: number };
}

interface FaultyValidMeters {
  total_faulty_meters: { [key: string]: number };
  total_valid_meters: { [key: string]: number };
}

interface WorkerPerformance {
  name: string;
  meters_checked: { today: number; this_week: number; this_month: number };
  average_time_per_meter: string;
}

interface SummaryCards {
  total_meters_checked_today: number;
  total_faulty_meters_today: number;
  total_valid_meters_today: number;
  top_performing_worker_today: string;
  top_performing_worker_meters_checked: number;
}

interface DataType {
  meter_checks: {
    monthly_checks: MonthlyChecks;
    yearly_checks: YearlyChecks;
  };
  comparisons: Comparisons;
  faulty_valid_meters: FaultyValidMeters;
  worker_performance: {
    workers: WorkerPerformance[];
  };
  summary_cards: SummaryCards;
}

const AdminAnalysis: React.FC = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>('today');

  const data: DataType = {
    meter_checks: {
      monthly_checks: {
        2022: { January: 1500, February: 1700, March: 2000, April: 2200, May: 2300, June: 2500, July: 2700, August: 2800, September: 3000, October: 3200, November: 3500, December: 4000 },
        2023: { January: 1600, February: 1800, March: 2100, April: 2400, May: 2500, June: 2700, July: 2900, August: 3100, September: 3300, October: 3500, November: 3800, December: 4200 },
        2024: { January: 1700, February: 1900, March: 2200, April: 2500, May: 2600, June: 2800, July: 3000, August: 3200, September: 3400, October: 3600 },
      },
      yearly_checks: { 2022: 30000, 2023: 34000, 2024: 36000 },
    },
    comparisons: {
      yesterday_vs_today: { yesterday: 120, today: 110, increase: 10 },
      last_week_vs_this_week: { last_week: 600, this_week: 630, increase: 30 },
      last_month_vs_this_month: { last_month: 3500, this_month: 3600, increase: 100 },
      last_year_vs_this_year: { last_year: 34000, this_year: 36000, increase: 2000 },
    },
    faulty_valid_meters: {
      total_faulty_meters: { today: 5, this_week: 25, this_month: 110, this_year: 1200 },
      total_valid_meters: { today: 125, this_week: 605, this_month: 3490, this_year: 34800 },
    },
    worker_performance: {
      workers: [
        { name: "Worker A", meters_checked: { today: 70, this_week: 310, this_month: 1300 }, average_time_per_meter: "14 minutes" },
        { name: "Worker B", meters_checked: { today: 60, this_week: 290, this_month: 1150 }, average_time_per_meter: "13 minutes" },
        { name: "Worker C", meters_checked: { today: 15, this_week: 25, this_month: 210 }, average_time_per_meter: "18 minutes" },
      ],
    },
    summary_cards: {
      total_meters_checked_today: 130,
      total_faulty_meters_today: 5,
      total_valid_meters_today: 125,
      top_performing_worker_today: "Worker A",
      top_performing_worker_meters_checked: 70,
    },
  };

  const overallGrowthData = Object.entries(data.meter_checks.monthly_checks['2024']).map(([month, checked]) => ({ month, checked }));
  const comparisonData = [
    { name: 'Yesterday', value: data.comparisons.yesterday_vs_today.yesterday },
    { name: 'Today', value: data.comparisons.yesterday_vs_today.today },
  ];
  const faultyData = [
    { name: 'Faulty', value: data.faulty_valid_meters.total_faulty_meters.today },
    { name: 'Valid', value: data.faulty_valid_meters.total_valid_meters.today },
  ];
  const workerPerformanceData = data.worker_performance.workers.map(worker => ({
    name: worker.name,
    checked: worker.meters_checked.today,
  }));

  const handleTimeFrameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeFrame(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-5">Admin Analysis</h1>

      {/* Time Frame Selector */}
      <div className="mb-4">
        <label className="block mb-2" htmlFor="timeFrameSelector">Select Time Frame:</label>
        <select
          id="timeFrameSelector"
          className="p-2 border rounded"
          onChange={handleTimeFrameChange}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Meter Check Statistics */}
      <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-2">Meter Check Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={overallGrowthData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="checked" stroke="#8884d8" />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Comparison Metrics */}
      <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-2">Comparison Metrics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Faulty vs. Valid Meters */}
      <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-2">Faulty vs. Valid Meters</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={faultyData} cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label>
              {faultyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#ff4d4d" : "#4daf4a"} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Worker Performance */}
      <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-2">Worker Performance Today</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={workerPerformanceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="checked" fill="#8884d8">
              {workerPerformanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.name === data.summary_cards.top_performing_worker_today ? "#ffc658" : "#8884d8"} />
              ))}
            </Bar>
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalysis;
