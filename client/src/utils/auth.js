const tokenName = 'quiz-token'

export function setToken(token){
  localStorage.setItem(tokenName, token)
}

export function getToken(){
  return localStorage.getItem(tokenName)
}

export function removeToken(){
  return localStorage.removeItem(tokenName)
}

// need some authentication 