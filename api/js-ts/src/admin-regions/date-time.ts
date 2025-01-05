import { parseISO, format as formatDate, getYear, getMonth, getDate, getHours, getMinutes, getSeconds } from "date-fns";
import { toZonedTime, format as tzFormat } from "date-fns-tz";

type Date_Time_Precision_Category = "year" | "decade" | "century" | "month" | "day" | "hour" | "minute" | "second";

interface DateTimeConversionResult {
  formattedDatetime: string;
  dateTimeId: string;
  year: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  timezoneIndependent: boolean;
  timezone: string;
  dateTimePrecision: Date_Time_Precision_Category;
}

interface ConvertDatetimeOptions {
  dateTime: string;
  precision: Date_Time_Precision_Category;
  timezone: string;
  timezoneIndependent: boolean;
}

function parseTimestamp(timestamp: string): Date {
  const parsedDate = parseISO(timestamp);
  if (isNaN(parsedDate.getTime())) {
    throw new RangeError("Invalid time value");
  }
  return parsedDate;
}

function determineStartingYear(dt: Date, precision: Date_Time_Precision_Category): number {
  const year = getYear(dt);
  if (precision === "decade") {
    return Math.floor(year / 10) * 10;
  } else if (precision === "century") {
    return Math.floor(year / 100) * 100;
  }
  return year;
}

function formatDatetime(dt: Date, precision: Date_Time_Precision_Category): string {
  switch (precision) {
    case "year":
      return formatDate(dt, "yyyy");
    case "month":
      return formatDate(dt, "yyyy-MM");
    case "day":
      return formatDate(dt, "yyyy-MM-dd");
    case "hour":
      return formatDate(dt, "yyyy-MM-dd'T'HH");
    case "minute":
      return formatDate(dt, "yyyy-MM-dd'T'HH:mm");
    case "second":
      return formatDate(dt, "yyyy-MM-dd'T'HH:mm:ss");
    case "decade":
    case "century":
      return formatDate(dt, "yyyy");
    default:
      throw new Error("Invalid precision");
  }
}

function generateDateTimeId(
  dt: Date,
  precision: Date_Time_Precision_Category,
  timezone: string,
  timezoneIndependent: boolean
): string {
  const year = determineStartingYear(dt, precision);
  const month = String(getMonth(dt) + 1).padStart(2, "0");
  const day = String(getDate(dt)).padStart(2, "0");
  const hour = String(getHours(dt)).padStart(2, "0");
  const minute = String(getMinutes(dt)).padStart(2, "0");
  const second = String(getSeconds(dt)).padStart(2, "0");
  const tzIndicator = timezoneIndependent ? "tzi" : "tzd";

  switch (precision) {
    case "year":
      return `${year}-${precision}-tz${timezone}-${tzIndicator}`;
    case "month":
      return `${year}-${month}-${precision}-tz${timezone}-${tzIndicator}`;
    case "day":
      return `${year}-${month}-${day}-${precision}-tz${timezone}-${tzIndicator}`;
    case "hour":
      return `${year}-${month}-${day}-T-${hour}-${precision}-tz${timezone}-${tzIndicator}`;
    case "minute":
      return `${year}-${month}-${day}-T-${hour}:${minute}-${precision}-tz${timezone}-${tzIndicator}`;
    case "second":
      return `${year}-${month}-${day}-T-${hour}:${minute}:${second}-${precision}-tz${timezone}-${tzIndicator}`;
    case "decade":
      return `${year}-${precision}-tz${timezone}-${tzIndicator}`;
    case "century":
      return `${year}-${precision}-tz${timezone}-${tzIndicator}`;
    default:
      throw new Error("Invalid precision");
  }
}

export function convertDatetime(options: ConvertDatetimeOptions): DateTimeConversionResult {
  const { dateTime, precision, timezone, timezoneIndependent } = options;

  let timestamp = new Date(dateTime).toISOString();
  let dt = parseTimestamp(timestamp);

  if (!timezoneIndependent) {
    dt = toZonedTime(dt, timezone);
  }

  const formattedDatetime = formatDatetime(dt, precision);
  const dateTimeId = generateDateTimeId(dt, precision, timezone, timezoneIndependent);

  const result: DateTimeConversionResult = {
    formattedDatetime,
    dateTimeId,
    year: getYear(dt),
    timezoneIndependent,
    timezone,
    dateTimePrecision: precision,
  };

  if (
    precision === "month" ||
    precision === "day" ||
    precision === "hour" ||
    precision === "minute" ||
    precision === "second"
  ) {
    result.month = getMonth(dt) + 1;
  }
  if (precision === "day" || precision === "hour" || precision === "minute" || precision === "second") {
    result.day = getDate(dt);
  }
  if (precision === "hour" || precision === "minute" || precision === "second") {
    result.hour = getHours(dt);
  }
  if (precision === "minute" || precision === "second") {
    result.minute = getMinutes(dt);
  }
  if (precision === "second") {
    result.second = getSeconds(dt);
  }

  return result;
}

// const options: ConvertDatetimeOptions = {
//   dateTime: "4 April 2022",
//   precision: "day",
//   timezone: "+05:30",
//   timezoneIndependent: true,
// };

// const result = convertDatetime(options);
// console.log(result);

// Output will be an object suitable for insertion into Dgraph with the provided schema.
