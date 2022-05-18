const contentContainer = document.querySelectorAll(".content_container");
contentContainer.forEach((container) => {
  if (!container.classList.contains("tab_content1"))
    container.classList.add("invisible");
});

// click on button it get s chosen
