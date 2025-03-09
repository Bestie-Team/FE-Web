export default function downloadURI(uri: string) {
  // 새 창에서 이미지 열기 (iOS에서 효과적)
  const newTab = window.open();
  if (newTab) {
    newTab.document.write(`<img src="${uri}" style="width:100%;">`);
  } else {
    alert("팝업 차단을 해제하고 다시 시도해주세요.");
  }
}
