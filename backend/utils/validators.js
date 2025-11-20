function validateSignup(body){
  if(!body.name) return { error: { details:[{ message: 'Name is required' }] } }
  if(!body.email) return { error: { details:[{ message: 'Email is required' }] } }
  if(!body.password || body.password.length < 6) return { error: { details:[{ message: 'Password must be at least 6 chars' }] } }
  return { }
}

function validateLogin(body){
  if(!body.email) return { error: { details:[{ message: 'Email is required' }] } }
  if(!body.password) return { error: { details:[{ message: 'Password is required' }] } }
  return { }
}

module.exports = { validateSignup, validateLogin }
