// 웹페이지 요소 생성
const title = document.createElement('h1');
title.textContent = '음악 로그 작성';
document.body.appendChild(title);

const currentSongContainer = document.createElement('div');
const currentSongTitle = document.createElement('h2');
currentSongTitle.textContent = '현재 재생중인 노래';
const albumCover = document.createElement('img');
albumCover.id = 'album-cover';
const songInfo = document.createElement('p');
songInfo.id = 'song-info';
currentSongContainer.appendChild(currentSongTitle);
currentSongContainer.appendChild(albumCover);
currentSongContainer.appendChild(songInfo);
document.body.appendChild(currentSongContainer);

const locationContainer = document.createElement('div');
const locationTitle = document.createElement('h2');
locationTitle.textContent = '지금 어디에 계시나요?';
const addressInput = document.createElement('input');
addressInput.type = 'text';
addressInput.id = 'address-input';
addressInput.placeholder = '주소를 입력하세요';
locationContainer.appendChild(locationTitle);
locationContainer.appendChild(addressInput);
document.body.appendChild(locationContainer);

const timeContainer = document.createElement('div');
const timeTitle = document.createElement('h2');
timeTitle.textContent = '시간';
const currentTime = document.createElement('p');
currentTime.id = 'current-time';
timeContainer.appendChild(timeTitle);
timeContainer.appendChild(currentTime);
document.body.appendChild(timeContainer);

const memoContainer = document.createElement('div');
const memoTitle = document.createElement('h2');
memoTitle.textContent = '지금 뭐하고 계시나요? 간단한 메모를 남겨주세요.';
const memoTextarea = document.createElement('textarea');
memoTextarea.id = 'memo-textarea';
memoTextarea.rows = 4;
memoTextarea.cols = 50;
memoContainer.appendChild(memoTitle);
memoContainer.appendChild(memoTextarea);
document.body.appendChild(memoContainer);

const saveButton = document.createElement('button');
saveButton.id = 'save-button';
saveButton.textContent = '저장하기';
document.body.appendChild(saveButton);

// 외부 API에서 현재 재생중인 노래 정보 가져오는 함수
function getCurrentSong() {
  // API 호출하여 현재 재생중인 노래 정보 가져오기
  // 예시로 노래 정보를 설정해두었습니다.
  const songData = {
    albumCover: 'https://example.com/album-cover.jpg',
    title: '노래 제목',
    artist: '가수 이름'
  };

  // 가져온 노래 정보를 웹페이지에 표시
  const albumCoverElement = document.getElementById('album-cover');
  albumCoverElement.src = songData.albumCover;

  const songInfoElement = document.getElementById('song-info');
  songInfoElement.textContent = `${songData.title} - ${songData.artist}`;
}

// 현재 시간을 표시하는 함수
function displayCurrentTime() {
  const currentTimeElement = document.getElementById('current-time');
  const now = new Date();
  const currentTime = now.toLocaleTimeString();
  currentTimeElement.textContent = currentTime;
}

// 저장하기 버튼 클릭 시 데이터 저장하는 함수
function saveData() {
  const albumCover = document.getElementById('album-cover').src;
  const songInfo = document.getElementById('song-info').textContent;
  const address = document.getElementById('address-input').value;
  const currentTime = document.getElementById('current-time').textContent;
  const memo = document.getElementById('memo-textarea').value;

  // 여기서 데이터를 데이터베이스에 저장하는 로직을 추가-firebase?
  // 데이터베이스에 저장되는 데이터는 albumCover, songInfo, address, currentTime, memo 입니다.

  // 저장이 완료되면 사용자에게 알림 등의 피드백을 제공할 수 있습니다.
  alert('데이터가 저장되었습니다.');
}

// 저장하기 버튼에 이벤트 리스너 추가
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', saveData);

// 페이지가 로드되면 초기 데이터를 가져오고 시간을 표시합니다.
window.addEventListener('load', () => {
  getCurrentSong();
  displayCurrentTime();
});
