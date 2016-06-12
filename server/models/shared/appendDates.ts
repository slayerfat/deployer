export default function appendDates(next) {
  // get the current date
  var currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.control.dates.created_at)
    this.control.dates.created_at = currentDate;

  // change the updated_at field to current date
  this.control.dates.updated_at = currentDate;

  next();
}
