// waits for browser to finish rendering all elements within the HTML.
$(function () {
  // attaches event listener to handle button click on the event-scheduler div and delegate to the buttons
  $(".event-scheduler").on("click", ".btn", function (e) {
    const target = e.target;
    const $parent = $(target).parent();

    // checks if the parent of the target is the button itself
    const isBtnClicked = $parent.hasClass("btn");

    // sets local storage key based on button click and the corresponding text area value
    const $closestDiv = $(target).closest("div");
    const key = isBtnClicked ? $closestDiv.attr("id") : $parent.attr("id");
    const value = isBtnClicked
      ? $parent.siblings("textarea").val()
      : $(target).siblings("textarea").val();
    localStorage.setItem(key, value);
  });

  // adds color coding to the box depending on present, past, or future hour
  $(".event-scheduler > div").each(function () {
    const hour = Number($(this).attr("id"));
    const currentHour = dayjs().format("H");

    if (hour > currentHour) {
      $(this).addClass("future");
    } else if (hour < currentHour) {
      $(this).addClass("past");
    } else {
      $(this).addClass("present");
    }
  });

  // checks local storage for each section and display the corresponding value
  $(".event-scheduler textarea").each(function () {
    const $parent = $(this).parent();
    const key = $parent.attr("id");
    const value = localStorage.getItem(key);

    if (value) {
      $(this).val(value);
    }
  });

  // updates every second and displays current time and day on the header portion
  setInterval(function () {
    const currentTime = dayjs().format("h:mm:ss A MMMM D, YYYY");
    $("#currentDay").text(`The current date and time is ${currentTime}`);
  }, 1000);
});
