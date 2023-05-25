export function displayDate(time) {
  const commentDate = new Date(time);
  const pageLoadTime = new Date(Date.now());
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const timePassed = pageLoadTime - time;
  if (timePassed <= 60000) return "минуту назад";
  if (timePassed <= 300000) return "5 минут назад";
  if (timePassed <= 600000) return "10 минут назад";
  if (timePassed <= 1800000) return "30 минут назад";
  if (commentDate.toDateString() === pageLoadTime.toDateString()) return `${commentDate.getHours()}:${commentDate.getMinutes()}`;
  if (commentDate.getFullYear() === pageLoadTime.getFullYear()) return `${commentDate.getDate()} ${monthNames[commentDate.getMonth()]}`;
  return `${commentDate.getDate()} ${monthNames[commentDate.getMonth()]} ${commentDate.getFullYear()}`;
};
