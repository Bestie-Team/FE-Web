const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Lighty 공유기능 테스트중",
        url: "https://lighty-git-eunjae-eunjaes-projects-ceae8709.vercel.app/",
      });
      alert("Shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    alert("Sharing is not supported on this browser.");
  }
};

export default handleShare;
