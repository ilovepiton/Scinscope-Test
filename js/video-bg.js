function setupSmoothVideoBackground() {
  const videos = document.querySelectorAll(".video-wallpaper video, .account-video-wallpaper video");

  videos.forEach(function (video) {
    const wrapper = video.closest(".video-wallpaper, .account-video-wallpaper");

    if (!wrapper) return;

    wrapper.classList.remove("video-ready");

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = "auto";

    function showVideo() {
      wrapper.classList.add("video-ready");

      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
          video.muted = true;
          video.play().catch(function () {});
        });
      }
    }

    if (video.readyState >= 3) {
      showVideo();
    } else {
      video.addEventListener("canplay", showVideo, { once: true });
      video.addEventListener("loadeddata", showVideo, { once: true });
    }

    video.load();
  });
}

document.addEventListener("DOMContentLoaded", setupSmoothVideoBackground);
