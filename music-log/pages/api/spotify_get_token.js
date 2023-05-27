//스포티파이에서 제공하는 PKCE autorization 코드를 복사한 파일
//PKCE가 웹 앱에 적합하다고 하여 선택한 인증 방식.


//사용자 인증에 필요한 code verifier을 만들어서 return하는 함수.
//입력으로 정수 length를 받아 그 길이만큼의 문자열을 return함.
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


//digest를 다시 변환하는 함수
async function generateCodeChallenge(codeVerifier) {
  //스포티파이에서 제공한 코드에서 사용된 btoa 함수가 더 이상 사용되지 않음.
  //chat gpt를 통해 동일한 작동을 하는 코드로 대체
  // TODO: 확인 필요
  function base64encode(string) {
    const buffer = Buffer.from(string, 'binary');
    const base64 = buffer.toString('base64');
    const encoded = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return encoded;
  }
  
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  
  return base64encode(digest);
}


//TODO 참고해서 process.env.로 환경변수 불러옴
const clientId = process.env.SPOTIFY_CLIENT_ID;
// TODO: redirect url 8080에서 3000으로 수정
const redirectUri = 'http://localhost:3000';

let codeVerifier = generateRandomString(128);

generateCodeChallenge(codeVerifier).then(codeChallenge => {
  let state = generateRandomString(16);
  let scope = 'user-read-private user-read-email';

  localStorage.setItem('code_verifier', codeVerifier);

  let args = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  });

  window.location = 'https://accounts.spotify.com/authorize?' + args;
});



// TODO: Request User Authorization
//스포티파이 문서에 구현되어 있는 사용자 인증 (스포티파이 로그인 기능)
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

// TODO: codeVerifier 변수의 재사용으로 수정해줌
let code_Verifier = localStorage.getItem('code_verifier');

// TODO: 파라미터 수정 필요
let body = new URLSearchParams({
  grant_type: 'authorization_code',
  code: code,
  redirect_uri: redirectUri,
  client_id: clientId,
  //변수 재사용으로 인한 수정에 맞춰서 수정
  code_verifier: code_Verifier
});


const response = fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: body
})
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    localStorage.setItem('access_token', data.access_token);
  })
  .catch(error => {
    console.error('Error:', error);
  });



  