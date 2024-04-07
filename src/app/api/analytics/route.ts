import { NextResponse, NextRequest } from "next/server";
import dbConfig from "@/config/dbConfig";
import Vistor from "@/modals/vistorModal";
dbConfig();

export async function GET(req: NextRequest) {
  const time: string = req.nextUrl.searchParams.get("time") || "weekly";
  let startDate: Date = new Date();
  let endDate: Date = new Date();
  let formatTimeline: (date: Date) => string;
  let groupByTimeInterval: any;

  // Define an array of weekday names
  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Define an array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let minYear: number = new Date().getFullYear();
  let maxYear: number = new Date().getFullYear();

  // Define start and end dates based on the selected time interval
  switch (time) {
    case "weekly":
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 * 7); // 7 days ago
      endDate = new Date(Date.now());
      formatTimeline = (date: Date) => weekdayNames[getUtcDayOfWeek(date)]; // Use the UTC day of the week
      groupByTimeInterval = { $dayOfWeek: "$createdAt" };
      break;
    case "monthly":
      startDate = new Date(minYear, 0, 1); // First day of the minimum year
      endDate = new Date(maxYear, 11, 31); // Last day of the maximum year
      formatTimeline = (date: Date) => monthNames[date.getUTCMonth()]; // Use the UTC month
      groupByTimeInterval = { $month: "$createdAt" };
      break;
    case "yearly":
      // Find the minimum and maximum years from the data
      const years = await Vistor.aggregate([
        {
          $group: {
            _id: null,
            minYear: { $min: { $year: "$createdAt" } },
            maxYear: { $max: { $year: "$createdAt" } },
          },
        },
      ]);

      const { minYear: minYearFromDb, maxYear: maxYearFromDb } = years[0] || {
        minYear: new Date().getFullYear(),
        maxYear: new Date().getFullYear(),
      };
      minYear = minYearFromDb;
      maxYear = maxYearFromDb;
      startDate = new Date(minYear, 0, 1); // First day of the minimum year
      endDate = new Date(maxYear, 11, 31); // Last day of the maximum year
      formatTimeline = (date: Date) => `${date.getFullYear()}`; // Use the year
      groupByTimeInterval = { $year: "$createdAt" };
      break;
    default:
      startDate = new Date();
      endDate = new Date();
      formatTimeline = (date: Date) => weekdayNames[getUtcDayOfWeek(date)]; // Use the UTC day of the week
      groupByTimeInterval = { $dayOfWeek: "$createdAt" };
      break;
  }

  // Helper function to get the UTC day of the week (0 for Sunday, 1 for Monday,..., 6 for Saturday)
  const getUtcDayOfWeek = (date: Date): number => {
    const utcDay = date.getUTCDay();
    return utcDay === 0 ? 7 : utcDay; // Adjust for JavaScript's convention (0 for Sunday)
  };

  // Query the database to get the count of visitors within the specified time interval
  const total_unique_visitors_time = await Vistor.countDocuments({
    createdAt: { $gte: startDate, $lte: endDate },
  });
  const total_unique_visitors = await Vistor.countDocuments();

  // Generate the timeline array with visitor counts
  const timelineData = await Vistor.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: groupByTimeInterval,
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Create an array of objects with default count of 0
  const formattedTimeline =
    time === "weekly"
      ? weekdayNames.map((day) => ({ date: day, count: 0 }))
      : time === "monthly"
      ? monthNames.map((month) => ({ date: month, count: 0 }))
      : Array.from({ length: maxYear - minYear + 1 }, (_, i) => ({
          date: `${minYear + i}`,
          count: 0,
        }));

  // Update the counts based on the data from the database
  timelineData.forEach((item: any) => {
    const index = item._id;
    if (time === "weekly") {
      formattedTimeline[index - 1].count = item.count; // Adjust for MongoDB's convention (1 for Sunday)
    } else if (time === "monthly") {
      formattedTimeline[index - 1].count = item.count; // Adjust for MongoDB's convention (1 for January)
    } else if (time === "yearly") {
      formattedTimeline[index - minYear].count = item.count; // Adjust for the minimum year
    }
  });

  return NextResponse.json({
    message: "Hello",
    data: {
      unique_visitors: {
        total_unique_visitors,
        total_unique_visitors_time,
        timeline: formattedTimeline,
      },
    },
  });
}
