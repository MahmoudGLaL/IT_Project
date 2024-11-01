import {
    AUTH_GET_PERMISSIONS ,
    AUTH_LOGIN ,
    AUTH_LOGOUT ,
    AUTH_ERROR ,
    AUTH_CHECK
    
}  from 'react-admin'

export default (type , params , prop) => {
    if(type === AUTH_LOGIN)
        {
            const {username , password} = params ;
            if(username === 'user' && password === 'password')
                {
                    localStorage.setItem('role','user');
                    localStorage.removeItem("not_authinticated");
                    return Promise.resolve();
                }
                if(username === 'admin' && password === 'password')
                    {
                        localStorage.setItem('role','admin');
                        localStorage.removeItem("not_authinticated");
                        return Promise.resolve();
                    }
                    localStorage.setItem('not_authinticated',true);
                    return Promise.reject();    
        }
}