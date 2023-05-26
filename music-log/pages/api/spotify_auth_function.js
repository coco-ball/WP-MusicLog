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

//code verifier을 해싱(암호화?)
const digest = await window.crypto.subtle.digest('SHA-256', data);

//digest를 다시 변환하는 함수
async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    //스포티파이에서 제공한 코드에서 사용된 btoa 함수가 더 이상 사용되지 않음.
    //chat gpt를 통해 동일한 작동을 하는 코드로 대체
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



  