import React from 'react';
import { format, subMinutes, subHours, subDays, subMonths, subYears } from 'date-fns';

const TimeComponent = ({ timeAgo }) => {
  // Extract the number and the unit from the string
  const matches = timeAgo.match(/(\d+)\s(\w+)/);
  const value = parseInt(matches[1], 10);
  const unit = matches[2];

  // Calculate the date based on the unit
  let dateFromAgo;
  switch (unit) {
    case 'minute':
    case 'minutes':
      dateFromAgo = subMinutes(new Date(), value);
      break;
    case 'hour':
    case 'hours':
      dateFromAgo = subHours(new Date(), value);
      break;
    case 'day':
    case 'days':
      dateFromAgo = subDays(new Date(), value);
      break;
    case 'week':
    case 'weeks':
      dateFromAgo = subDays(new Date(), value * 7);
      break;
    case 'month':
    case 'months':
      dateFromAgo = subMonths(new Date(), value);
      break;
    case 'year':
    case 'years':
      dateFromAgo = subYears(new Date(), value);
      break;
    default:
      dateFromAgo = new Date();
  }

  // Format the date
  const formattedDate = format(dateFromAgo, 'd MMM yyyy');

  return <span>{formattedDate}</span>;
};

export default TimeComponent;
