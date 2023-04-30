import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
const TimeAgo = ({ timestamp }) => {
  const parseTime = parseISO(timestamp);
  const distanceToNow = formatDistanceToNow(parseTime);

  return <p>{distanceToNow} ago</p>;
};

export default TimeAgo;
