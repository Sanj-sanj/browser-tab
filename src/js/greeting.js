
 export default function greeting(time) {
    const currHour = Number(time.split(":")[0]);
    const meridiem = time.split(" ")[1];
    let timeOfDay = "";
    switch (meridiem) {
      case "AM":
        if (currHour === 12 || currHour <= 5) {
          return (timeOfDay = "late night");
        }
        if (currHour >= 6 && currHour < 12) {
          timeOfDay = "morning";
        }
        break;
      case "PM":
        if (currHour === 12 || currHour <= 5) {
          timeOfDay = "afternoon";
        }
        if (currHour >= 6 && currHour < 12) {
          timeOfDay = "evening";
        }
        break;
      default:
        break;
    }
    return timeOfDay;
  }
