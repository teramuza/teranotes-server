'use strict'

const User = use('App/Models/User');


class AuthController {

    async register({request, auth}){
    	const {email, password, first_name} = request.all();

    	if(email === null || password === null){
    		return response.json({message: 'Sorry, You detected spamming'})
    	}else{
	        
	        let user = await User.findBy('email', email)
	     	if(user){
	     		const output = {message: 'This email has been registered, please try logging in.', status : 'already'}
	        	return output
	     	}else{
	     		await User.create(request.all())	     		
	     	
		    	try {
		        	let check = await auth
		            .authenticator('jwt')
		            .withRefreshToken()
		            .attempt(email,password)

		        	if (check) {
		        		let user = await User.findBy('email', email)

		        		const newData = {
					        user,
					        token : check.token,
					        refToken : check.refreshToken,
					        status : 'success'
		    			}

		            	return newData
		        	}

		        }
		        catch (e) {
		        	console.log(e)
		        	const output = {message: 'Something is wrong, this is not your fault. Please try logging in later.', status : 'error'}
		        	return output
		        }
	    	}
    	}
    }
    async login({request, auth, response}) {

        let {email, password} = request.all();

        try {
          let check = await auth
            .authenticator('jwt')
            .withRefreshToken()
            .attempt(email,password)

          if (check) {
            let user = await User.findBy('email', email)

            const newData = {
              user,
              token : check.token,
              refToken : check.refreshToken,
            }

            return newData
          }


        }
        catch (e) {
          console.log(e)
          return response.json({message: 'Email / password incorrect or not registered'})
        }
    }

    async revokeUserToken ({ request, auth }) {
        const user = auth.current.user
        const { refreshToken } = request.all()

        await auth
          .authenticator('jwt')
          .revokeTokens([refreshToken])

        const output = {message: "Your session has expired", status : "expired"}
        return output
    }
}

module.exports = AuthController

//status : endpoint passed