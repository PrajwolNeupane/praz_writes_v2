import { NextResponse, NextRequest } from "next/server";
import dbConfig from "@/config/dbConfig";
import Vistor from "@/modals/vistorModal";
import Blog from "@/modals/blogModal";

dbConfig();

export async function GET(req: NextRequest) {
  const time: string = req.nextUrl.searchParams.get("time") || "weekly";
  let startDate: Date,
    endDate: Date,
    formatTimeline: (date: Date) => string,
    groupByTimeInterval: any,
    blogGroupByTimeInterval;

  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  const minYear = new Date().getFullYear();
  const maxYear = new Date().getFullYear();

  // Define start and end dates based on the selected time interval
  switch (time) {
    case "weekly":
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 * 7);
      endDate = new Date(Date.now());
      formatTimeline = (date: Date) => weekdayNames[getUtcDayOfWeek(date)];
      groupByTimeInterval = { $dayOfWeek: "$createdAt" };
      blogGroupByTimeInterval = { $dayOfWeek: "$createdAt" };
      break;
    case "monthly":
      startDate = new Date(minYear, 0, 1);
      endDate = new Date(maxYear, 11, 31);
      formatTimeline = (date: Date) => monthNames[date.getUTCMonth()];
      groupByTimeInterval = { $month: "$createdAt" };
      blogGroupByTimeInterval = { $month: "$createdAt" };
      break;
    case "yearly":
      const years = await Vistor.aggregate([
        {
          $group: {
            _id: null,
            minYear: { $min: { $year: "$createdAt" } },
            maxYear: { $max: { $year: "$createdAt" } },
          },
        },
      ]);
      const {
        minYear: minYearFromDb = minYear,
        maxYear: maxYearFromDb = maxYear,
      } = years[0] || {};
      startDate = new Date(minYearFromDb, 0, 1);
      endDate = new Date(maxYearFromDb, 11, 31);
      formatTimeline = (date: Date) => `${date.getFullYear()}`;
      groupByTimeInterval = { $year: "$createdAt" };
      blogGroupByTimeInterval = { $year: "$createdAt" };
      break;
    default:
      startDate = new Date();
      endDate = new Date();
      formatTimeline = (date: Date) => weekdayNames[getUtcDayOfWeek(date)];
      groupByTimeInterval = { $dayOfWeek: "$createdAt" };
      blogGroupByTimeInterval = { $dayOfWeek: "$createdAt" };
      break;
  }

  const getUtcDayOfWeek = (date: Date): number => date.getUTCDay() || 7;

  const total_unique_visitors_time = await Vistor.countDocuments({
    createdAt: { $gte: startDate, $lte: endDate },
  });

  const total_visits_time = await Vistor.aggregate([
    { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
    {
      $group: { _id: null, total_visits: { $sum: { $toInt: "$visit_count" } } },
    },
  ]).then((result) => result[0]?.total_visits || 0);

  const timelineData = await Vistor.aggregate([
    { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
    { $group: { _id: groupByTimeInterval, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  const visitorTimelineData = await Vistor.aggregate([
    { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: groupByTimeInterval,
        total_visits: { $sum: { $toInt: "$visit_count" } },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const blogTimelineData = await Blog.aggregate([
    { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
    { $group: { _id: blogGroupByTimeInterval, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  const formattedTimeline =
    time === "weekly"
      ? weekdayNames.map((day) => ({
          date: day,
          total_unique_visits: 0,
          total_visits: 0,
        }))
      : time === "monthly"
      ? monthNames.map((month) => ({
          date: month,
          total_unique_visits: 0,
          total_visits: 0,
        }))
      : Array.from({ length: maxYear - minYear + 1 }, (_, i) => ({
          date: `${minYear + i}`,
          total_unique_visits: 0,
          total_visits: 0,
        }));

  timelineData.forEach((item: any) => {
    const index = item._id;
    if (time === "weekly")
      formattedTimeline[index - 1].total_unique_visits = item.count;
    else if (time === "monthly")
      formattedTimeline[index - 1].total_unique_visits = item.count;
    else formattedTimeline[index - minYear].total_unique_visits = item.count;
  });

  const formattedVisitorTimeline = formattedTimeline.map((item) => ({
    ...item,
  }));

  visitorTimelineData.forEach((item: any) => {
    const index = item._id;
    if (time === "weekly")
      formattedVisitorTimeline[index - 1].total_visits = item.total_visits;
    else if (time === "monthly")
      formattedVisitorTimeline[index - 1].total_visits = item.total_visits;
    else
      formattedVisitorTimeline[index - minYear].total_visits =
        item.total_visits;
  });

  const formattedBlogTimeline = formattedTimeline.map((item) => ({
    date: item.date,
    blog_added: 0,
  }));

  blogTimelineData.forEach((item: any) => {
    const index = item._id;
    if (time === "weekly")
      formattedBlogTimeline[index - 1].blog_added = item.count;
    else if (time === "monthly")
      formattedBlogTimeline[index - 1].blog_added = item.count;
    else formattedBlogTimeline[index - minYear].blog_added = item.count;
  });
  const total_unique_visitors = await Vistor.countDocuments();
  const total_visitors = (await Vistor.find()).reduce(
    (sum, curr) => sum + parseInt(curr.visit_count, 10),
    0
  );
  const blogs = await Blog.find();
  const average_read =
    blogs.reduce((sum, curr) => sum + curr.read, 0) / blogs.length;

  const deviceVisitors = await Vistor.aggregate([
    { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: "$device",
        count: { $sum: { $toInt: "$visit_count" } },
      },
    },
    { $match: { count: { $gt: 0 } } }, // Filter out devices with zero visitors
  ]);

  // Populate the device_visitors object with counts
  const device_visitors: { [key: string]: number } = {};
  deviceVisitors.forEach((item) => {
    const device = item._id;
    const count = item.count;
    device_visitors[device] = count;
  });

  const blogCategories = await Blog.aggregate([
    { $match: { createdAt: { $gte: startDate, $lte: endDate } } }, // Time filter
    { $unwind: "$tags" }, // Unwind the tags array
    { $group: { _id: "$tags", count: { $sum: 1 } } }, // Group by tag and count
    { $sort: { count: -1 } }, // Sort by count in descending order
  ]);

  const formattedBlogCategories = blogCategories.map(({ _id, count }) => ({
    category: _id,
    count,
  }));

  return NextResponse.json({
    message: "Hello",
    data: {
      card: {
        blog_count: blogs.length,
        total_unique_visitors,
        total_visitors,
        average_read: `${average_read} minutes`,
      },
      visitors_timline: formattedVisitorTimeline,
      blogs_timline: formattedBlogTimeline,
      device_visitors,
      blog_categories: formattedBlogCategories,
    },
  });
}
